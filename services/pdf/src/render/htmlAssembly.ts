import type { AllegatoFormData, ResolvedDocument } from "@allegato-a1/shared";
import { indexCoverPremessaModuloRegionale } from "./content/normativePreamble.js";
import { escapeHtml } from "./escape.js";
import { sectionBody } from "./boilerplate.js";

function formatDateIt(iso?: string): string {
  if (!iso) return new Date().toLocaleDateString("it-IT");
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? new Date().toLocaleDateString("it-IT") : d.toLocaleDateString("it-IT");
}

export function buildAllegatoHtml(docs: ResolvedDocument[], data: AllegatoFormData): string {
  const structure = escapeHtml(data.studio.structureName);
  const address = escapeHtml(data.studio.addressLine);
  const owner = escapeHtml(data.studio.ownerDisplayName);
  const revision = escapeHtml(data.meta.revisionLabel);
  const dateStr = formatDateIt(data.meta.generatedAt);

  const indexRows = docs
    .map(
      (d) => `
      <tr>
        <td style="padding:0.35rem 0.5rem;border:1px solid #333;text-align:left;">${d.order}. ${escapeHtml(d.title)}</td>
        <td style="padding:0.35rem 0.5rem;border:1px solid #333;white-space:nowrap;vertical-align:top;">${escapeHtml(d.code)}</td>
      </tr>`
    )
    .join("");

  const sections = docs
    .map((doc) => {
      const docLine = `DOCUMENTO N. ${doc.order}: ${doc.title}`;
      return `
      <section class="doc-section page-break">
        <header class="doc-header">
          <div class="h-name">${structure}</div>
          <div class="h-address">${address}</div>
          <div class="h-docline">
            <span>${escapeHtml(docLine)}</span>
            <span class="h-code">Cod. Requisito ${escapeHtml(doc.code)}</span>
          </div>
        </header>
        <article class="doc-body">
          ${sectionBody(doc, data)}
        </article>
        <footer class="doc-footer-local">
          <p><strong>Firma del Titolare</strong> _________________________________</p>
          <p class="muted">${revision} — ${escapeHtml(dateStr)}</p>
        </footer>
      </section>`;
    })
    .join("\n");

  return `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="utf-8" />
  <style>
    /* Allineato ai margini page.pdf in index.ts: fascia utile più stretta → più pagine. */
    @page { size: A4; margin: 20mm 28mm 24mm 28mm; }
    * { box-sizing: border-box; }
    body {
      font-family: "Times New Roman", Times, serif;
      font-size: 11pt;
      line-height: 1.48;
      color: #111;
    }
    .cover { text-align: center; margin-top: 2.2cm; padding: 0 6mm; }
    .cover h1 { font-size: 16pt; margin-bottom: 0.65rem; }
    .cover p { margin: 0.35rem 0; }
    .cover-premessa { text-align: justify; font-size: 10.5pt; margin: 0.85rem 0 1rem; padding: 0 2mm; }
    .cover-premessa p { margin: 0 0 0.55rem; }
    table.index { width: 100%; border-collapse: collapse; margin-top: 1.25rem; font-size: 10pt; }
    table.index th,
    table.index td { padding: 0.5rem 0.65rem !important; }
    .page-break { break-before: page; page-break-before: always; }
    .doc-header { margin-bottom: 1.15rem; padding: 0 4mm; }
    .h-name { text-align: center; font-weight: 700; font-size: 12pt; margin-bottom: 0.35rem; }
    .h-address { text-align: center; font-size: 11pt; margin-bottom: 0.75rem; }
    .h-docline {
      border: 1px solid #000;
      padding: 0.55rem 0.85rem;
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      word-wrap: break-word;
      overflow-wrap: anywhere;
    }
    .h-code { font-weight: 600; }
    /* Rientri aggiuntivi sul corpo: restringono ulteriormente la colonna di testo. */
    .doc-body {
      margin: 1rem 0 1.5rem;
      padding: 0 11mm;
      text-align: justify;
    }
    .doc-body h2 { font-size: 11.5pt; margin: 1.15rem 0 0.55rem; font-weight: 700; }
    .doc-body h3 { font-size: 10.8pt; margin: 0.9rem 0 0.45rem; font-weight: 700; }
    .doc-body p { margin: 0 0 0.82rem; text-align: justify; }
    .doc-body ul,
    .doc-body ol { margin: 0.55rem 0 0.55rem 1.55rem; padding-right: 4mm; }
    .doc-body li { margin-bottom: 0.35rem; }
    .doc-body dl { margin: 0.6rem 0 0.6rem 5mm; }
    .doc-body dt { margin-top: 0.45rem; }
    .doc-body dd { margin: 0.2rem 0 0.55rem 6mm; }
    table.data-table { margin: 1rem 0 !important; text-align: left; }
    table.data-table th,
    table.data-table td { padding: 0.45rem 0.6rem !important; }
    .doc-footer-local { margin-top: 2rem; padding: 0 4mm; font-size: 10pt; }
    .doc-footer-local p { margin: 0 0 0.55rem; }
    .muted { color: #444; }
  </style>
</head>
<body>
  <section class="cover">
    <h1>Allegato A1 — Indice della documentazione</h1>
    <div class="cover-premessa">${indexCoverPremessaModuloRegionale()}</div>
    <p><strong>${structure}</strong></p>
    <p>${address}</p>
    <p class="muted">Generazione: ${escapeHtml(dateStr)} — ${revision}</p>
    <table class="index" aria-label="Indice documenti">
      <thead>
        <tr>
          <th style="text-align:left;border:1px solid #333;padding:0.35rem;width:82%;">Documento</th>
          <th style="text-align:left;border:1px solid #333;padding:0.35rem;">Cod. Requisito</th>
        </tr>
      </thead>
      <tbody>${indexRows}</tbody>
    </table>
  </section>
  ${sections}
</body>
</html>`;
}
