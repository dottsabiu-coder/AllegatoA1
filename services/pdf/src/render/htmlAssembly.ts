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
    /*
     * Margini e spaziatura generosi: colonna di testo più stretta, interlinea ampia → più a capo
     * e più pagine totali (obiettivo fascicolo esteso, confrontabile con moduli A1 lunghi ~100+ pag.).
     * Valori allineati a page.pdf() in index.ts.
     */
    @page { size: A4; margin: 24mm 36mm 28mm 36mm; }
    * { box-sizing: border-box; }
    body {
      font-family: "Times New Roman", Times, serif;
      font-size: 11.5pt;
      line-height: 1.66;
      color: #111;
    }
    .cover { text-align: center; margin-top: 2.6cm; padding: 0 10mm; }
    .cover h1 { font-size: 16pt; margin-bottom: 0.85rem; line-height: 1.35; }
    .cover p { margin: 0.5rem 0; line-height: 1.55; }
    .cover-premessa {
      text-align: justify;
      font-size: 10.8pt;
      margin: 1rem 0 1.15rem;
      padding: 0 4mm;
      line-height: 1.62;
    }
    .cover-premessa p { margin: 0 0 0.7rem; }
    table.index { width: 100%; border-collapse: collapse; margin-top: 1.55rem; font-size: 10.5pt; }
    table.index th,
    table.index td { padding: 0.58rem 0.72rem !important; line-height: 1.45; }
    .page-break { break-before: page; page-break-before: always; }
    .doc-section { padding-bottom: 14mm; }
    .doc-header { margin-bottom: 1.45rem; padding: 0 5mm; }
    .h-name { text-align: center; font-weight: 700; font-size: 12.5pt; margin-bottom: 0.45rem; line-height: 1.3; }
    .h-address { text-align: center; font-size: 11.5pt; margin-bottom: 0.9rem; line-height: 1.45; }
    .h-docline {
      border: 1px solid #000;
      padding: 0.65rem 0.95rem;
      display: flex;
      flex-direction: column;
      gap: 0.45rem;
      word-wrap: break-word;
      overflow-wrap: anywhere;
      line-height: 1.45;
    }
    .h-code { font-weight: 600; }
    .doc-body {
      margin: 1.15rem 0 1.75rem;
      padding: 0 15mm;
      text-align: justify;
    }
    .doc-body h2 { font-size: 12pt; margin: 1.45rem 0 0.65rem; font-weight: 700; line-height: 1.35; }
    .doc-body h3 { font-size: 11.2pt; margin: 1.05rem 0 0.5rem; font-weight: 700; line-height: 1.35; }
    .doc-body p { margin: 0 0 1.05rem; text-align: justify; }
    .doc-body ul,
    .doc-body ol { margin: 0.65rem 0 0.75rem 1.65rem; padding-right: 5mm; }
    .doc-body li { margin-bottom: 0.45rem; }
    .doc-body dl { margin: 0.75rem 0 0.75rem 6mm; }
    .doc-body dt { margin-top: 0.55rem; }
    .doc-body dd { margin: 0.25rem 0 0.65rem 7mm; }
    table.data-table { margin: 1.15rem 0 !important; text-align: left; }
    table.data-table th,
    table.data-table td { padding: 0.52rem 0.68rem !important; line-height: 1.45; }
    .doc-footer-local { margin-top: 2.85rem; padding: 0 5mm; font-size: 10.5pt; line-height: 1.45; }
    .doc-footer-local p { margin: 0 0 0.65rem; }
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
