import type { AllegatoFormData, ResolvedDocument } from "@allegato-a1/shared";
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
        <td style="padding:0.35rem 0.5rem;border:1px solid #333;">${d.order}</td>
        <td style="padding:0.35rem 0.5rem;border:1px solid #333;">${escapeHtml(d.code)}</td>
        <td style="padding:0.35rem 0.5rem;border:1px solid #333;">${escapeHtml(d.title)}</td>
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
          <p class="muted">${owner} — ${dateStr} — ${revision}</p>
        </footer>
      </section>`;
    })
    .join("\n");

  return `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="utf-8" />
  <style>
    @page { size: A4; margin: 18mm 16mm 22mm 16mm; }
    * { box-sizing: border-box; }
    body {
      font-family: "Times New Roman", Times, serif;
      font-size: 11pt;
      line-height: 1.35;
      color: #111;
    }
    .cover { text-align: center; margin-top: 2cm; }
    .cover h1 { font-size: 16pt; margin-bottom: 0.5rem; }
    .cover p { margin: 0.2rem 0; }
    table.index { width: 100%; border-collapse: collapse; margin-top: 1rem; font-size: 10pt; }
    .page-break { break-before: page; page-break-before: always; }
    .doc-header { margin-bottom: 1rem; }
    .h-name { text-align: center; font-weight: 700; font-size: 12pt; margin-bottom: 0.25rem; }
    .h-address { text-align: center; font-size: 11pt; margin-bottom: 0.6rem; }
    .h-docline {
      border: 1px solid #000;
      padding: 0.45rem 0.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }
    .h-code { font-weight: 600; }
    .doc-body { margin: 0.8rem 0 1.2rem; }
    .doc-body p { margin: 0 0 0.55rem; text-align: justify; }
    .doc-body ul { margin: 0.4rem 0 0 1.1rem; }
    .doc-footer-local { margin-top: 1.5rem; font-size: 10pt; }
    .muted { color: #444; }
  </style>
</head>
<body>
  <section class="cover">
    <h1>Allegato A1 — Indice documentazione</h1>
    <p><strong>${structure}</strong></p>
    <p>${address}</p>
    <p class="muted">Generazione: ${escapeHtml(dateStr)} — ${revision}</p>
    <table class="index" aria-label="Indice documenti">
      <thead>
        <tr>
          <th style="text-align:left;border:1px solid #333;padding:0.35rem;">N.</th>
          <th style="text-align:left;border:1px solid #333;padding:0.35rem;">Codice</th>
          <th style="text-align:left;border:1px solid #333;padding:0.35rem;">Titolo</th>
        </tr>
      </thead>
      <tbody>${indexRows}</tbody>
    </table>
  </section>
  ${sections}
</body>
</html>`;
}
