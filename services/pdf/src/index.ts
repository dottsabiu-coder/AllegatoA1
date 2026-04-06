import Fastify from "fastify";
import cors from "@fastify/cors";
import { chromium } from "playwright";
import { allegatoFormSchema, resolveDocuments } from "@allegato-a1/shared";
import { buildAllegatoHtml } from "./render/htmlAssembly.js";

const PORT = Number(process.env.PORT) || 8787;
const CORS_ORIGIN = process.env.CORS_ORIGIN?.split(",").map((s) => s.trim()).filter(Boolean) ?? true;

const app = Fastify({ logger: true });

await app.register(cors, {
  origin: CORS_ORIGIN,
  methods: ["GET", "POST", "OPTIONS"],
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
        <div style="width:100%;font-size:9px;padding:0 12mm;color:#333;font-family:Times New Roman,serif;display:flex;justify-content:space-between;">
          <span>${escapeAttr(data.studio.ownerDisplayName)}</span>
          <span>Pag. <span class="pageNumber"></span> di <span class="totalPages"></span></span>
          <span>${escapeAttr(data.meta.revisionLabel)}</span>
        </div>`,
      margin: { top: "16mm", bottom: "18mm", left: "16mm", right: "16mm" },
    });

    return reply
      .header("Content-Type", "application/pdf")
      .header("Content-Disposition", 'attachment; filename="Allegato-A1.pdf"')
      .send(pdfBuffer);
  } finally {
    await browser.close();
  }
});

function escapeAttr(s: string): string {
  return s.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
}

try {
  await app.listen({ port: PORT, host: "0.0.0.0" });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
