import Fastify from "fastify";
import cors from "@fastify/cors";
import { chromium } from "playwright";
import { allegatoFormSchema, resolveDocuments } from "@allegato-a1/shared";
import { buildAllegatoHtml } from "./render/htmlAssembly.js";
import { TERESI_LAYOUT, playwrightPdfMargins } from "./render/teresiLayout.js";

const PORT = Number(process.env.PORT) || 8787;

/** Origini consentite: lista separata da virgola, senza slash finale. Se assente/vuota → riflette l'origine richiesta. */
function resolveCorsOrigin(): readonly string[] | true {
  const raw = process.env.CORS_ORIGIN?.trim();
  if (!raw) return true;
  const list = raw
    .split(",")
    .map((s) => s.trim().replace(/\/+$/, ""))
    .filter(Boolean);
  return list.length > 0 ? list : true;
}

/** Se true, non accettare automaticamente i domini *.vercel.app (solo la lista CORS_ORIGIN). */
const noVercelWildcard =
  process.env.CORS_NO_VERCEL_WILDCARD?.trim() === "1" ||
  process.env.CORS_NO_VERCEL_WILDCARD?.trim() === "true";

const app = Fastify({ logger: true });

const corsOriginConfig = resolveCorsOrigin();

await app.register(cors, {
  origin: (origin, cb) => {
    if (corsOriginConfig === true) {
      cb(null, true);
      return;
    }
    if (!origin) {
      cb(null, true);
      return;
    }
    if (Array.isArray(corsOriginConfig) && corsOriginConfig.includes(origin)) {
      cb(null, true);
      return;
    }
    /* Deploy preview Vercel: origine tipo *-git-*-*.vercel.app; non coincide col dominio "production". */
    if (!noVercelWildcard && isVercelPreviewOrigin(origin)) {
      cb(null, true);
      return;
    }
    app.log.warn({ origin }, "CORS: origine rifiutata");
    cb(null, false);
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Accept"],
});

app.get("/health", async () => ({ ok: true }));

app.get("/", async (_request, reply) =>
  reply.type("application/json").send({
    service: "allegato-a1-pdf",
    message: "API PDF: nessuna pagina web qui. Usa il frontend (es. http://localhost:5173 in sviluppo).",
    endpoints: { health: "GET /health", generatePdf: "POST /generate" },
  })
);

app.post("/generate", async (request, reply) => {
  const parsed = allegatoFormSchema.safeParse(request.body);
  if (!parsed.success) {
    return reply.status(400).send({ error: "Validation failed", details: parsed.error.flatten() });
  }

  const data = {
    ...parsed.data,
    meta: {
      ...parsed.data.meta,
      generatedAt: parsed.data.meta.generatedAt ?? new Date().toISOString(),
    },
  };

  const docs = resolveDocuments(data);
  const html = buildAllegatoHtml(docs, data);

  const browser = await chromium.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "load" });
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: "<div></div>",
      footerTemplate: `
        <div style="width:100%;font-size:9px;padding:0 ${TERESI_LAYOUT.footerPaddingHorizontal};color:#333;font-family:Times New Roman,serif;display:flex;justify-content:space-between;align-items:center;">
          <span>${escapeAttr(data.studio.structureName)}</span>
          <span>Pag. <span class="pageNumber"></span> di <span class="totalPages"></span></span>
          <span>${escapeAttr(data.meta.revisionLabel)}</span>
        </div>`,
      /* Allineato a @page in htmlAssembly / modulo Teresi (12_Mod. ALL. A1). */
      margin: playwrightPdfMargins(),
    });

    return reply
      .header("Content-Type", "application/pdf")
      .header("Content-Disposition", 'attachment; filename="Allegato-A1.pdf"')
      .send(pdfBuffer);
  } finally {
    await browser.close();
  }
});

function isVercelPreviewOrigin(origin: string): boolean {
  try {
    const u = new URL(origin);
    return u.protocol === "https:" && u.hostname.endsWith(".vercel.app");
  } catch {
    return false;
  }
}

function escapeAttr(s: string): string {
  return s.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
}

try {
  await app.listen({ port: PORT, host: "0.0.0.0" });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
