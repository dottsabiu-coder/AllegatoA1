import type { AllegatoFormData, ResolvedDocument } from "@allegato-a1/shared";
import { indexCoverPremessaModuloRegionale } from "./content/normativePreamble.js";
import { escapeHtml } from "./escape.js";
import { sectionBody } from "./boilerplate.js";
import { TERESI_LAYOUT, teresiPageMarginCss } from "./teresiLayout.js";

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
      const docLine = `DOCUMENTO ${doc.order}: ${doc.title}`;
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

  const L = TERESI_LAYOUT;
  return `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="utf-8" />
  <style>
    /*
     * Impaginazione allineata al modulo **12_Mod. ALL. A1** (Teresi): margini A4 tipo Word,
     * TNR 11 pt, interlinea compatta → reflow e salti pagina più confrontabili in sovrapposizione
     * con il PDF Teresi. I contenuti variabili restano quelli inseriti dall’utente nel wizard.
     * @page e page.pdf() in index.ts devono usare gli stessi valori (teresiLayout.ts).
     */
    @page { size: A4; margin: ${teresiPageMarginCss()}; }
    * { box-sizing: border-box; }
    body {
      font-family: "Times New Roman", Times, serif;
      font-size: ${L.bodyFontSize};
      line-height: ${L.bodyLineHeight};
      color: #111;
    }
    .cover { text-align: center; margin-top: ${L.coverMarginTop}; padding: 0 2mm; }
    .cover h1 { font-size: 16pt; margin-bottom: 0.65rem; line-height: 1.25; }
    .cover p { margin: 0.4rem 0; line-height: ${L.bodyLineHeight}; }
    .cover-premessa {
      text-align: justify;
      font-size: 10.5pt;
      margin: 0.75rem 0 0.9rem;
      padding: 0 1mm;
      line-height: 1.35;
    }
    .cover-premessa p { margin: 0 0 0.55rem; }
    table.index { width: 100%; border-collapse: collapse; margin-top: 1rem; font-size: 10pt; }
    table.index th,
    table.index td { padding: 0.4rem 0.5rem !important; line-height: 1.3; }
    .page-break { break-before: page; page-break-before: always; }
    .doc-section { padding-bottom: ${L.docSectionPaddingBottom}; }
    .doc-header { margin-bottom: 1rem; padding: 0; }
    .h-name { text-align: center; font-weight: 700; font-size: 12pt; margin-bottom: 0.35rem; line-height: 1.25; }
    .h-address { text-align: center; font-size: ${L.bodyFontSize}; margin-bottom: 0.65rem; line-height: ${L.bodyLineHeight}; }
    .h-docline {
      border: 1px solid #000;
      padding: 0.5rem 0.75rem;
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      word-wrap: break-word;
      overflow-wrap: anywhere;
      line-height: 1.3;
    }
    .h-code { font-weight: 600; }
    .doc-body {
      margin: ${L.docBodyVerticalMarginRem.top} 0 ${L.docBodyVerticalMarginRem.bottom};
      padding: 0 ${L.docBodyHorizontalPadding};
      text-align: justify;
    }
    .doc-body h2 { font-size: 11.5pt; margin: 1rem 0 0.5rem; font-weight: 700; line-height: 1.25; }
    .doc-body h3 { font-size: 11pt; margin: 0.75rem 0 0.4rem; font-weight: 700; line-height: 1.25; }
    .doc-body p { margin: 0 0 0.75rem; text-align: justify; }
    .doc-body ul,
    .doc-body ol { margin: 0.45rem 0 0.55rem 1.35rem; padding-right: 0; }
    .doc-body li { margin-bottom: 0.3rem; }
    .doc-body dl { margin: 0.5rem 0 0.5rem 5mm; }
    .doc-body dt { margin-top: 0.4rem; }
    .doc-body dd { margin: 0.15rem 0 0.45rem 6mm; }
    table.data-table { margin: 0.65rem 0 !important; text-align: left; }
    table.data-table th,
    table.data-table td { padding: 0.35rem 0.45rem !important; line-height: 1.3; }
    .doc-footer-local { margin-top: 1.75rem; padding: 0; font-size: 10pt; line-height: 1.3; }
    .doc-footer-local p { margin: 0 0 0.45rem; }
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
