import type { AllegatoFormData, ResolvedDocument } from "@allegato-a1/shared";
import { escapeHtml } from "./escape.js";

/** Testi placeholder: sostituire con redazioni legali approvate e allineare al modulo ufficiale. */
export function sectionBody(doc: ResolvedDocument, data: AllegatoFormData): string {
  const studio = escapeHtml(data.studio.structureName);
  const titolare = escapeHtml(data.studio.ownerDisplayName);

  if (doc.variant === "ionizing_absence" && doc.order === 18) {
    return `
      <p>La struttura <strong>${studio}</strong>, con titolare <strong>${titolare}</strong>, dichiara di <strong>non essere dotata
      di apparecchiature emittenti radiazioni ionizzanti</strong> e che il presente documento è prodotto ai fini dell'adempimento
      formale del requisito <strong>${escapeHtml(doc.code)}</strong>.</p>
      <p>Eventuali aggiornamenti saranno comunicati secondo la normativa vigente.</p>
    `;
  }

  if (doc.variant === "gas_not_applicable" && doc.order === 22) {
    return `
      <p>La struttura <strong>${studio}</strong> dichiara che <strong>non sono presenti impianti di distribuzione di gas medicali</strong>
      o che gli stessi non risultano applicabili alla tipologia di attività svolta. Il requisito <strong>${escapeHtml(doc.code)}</strong>
      si intende soddisfatto con la presente dichiarazione di non applicabilità.</p>
    `;
  }

  if (doc.variant === "interns_not_applicable" && doc.order === 27) {
    return `
      <p>La struttura <strong>${studio}</strong> dichiara che <strong>non ospita tirocinanti</strong> al momento della compilazione.
      Le modalità di identificazione di cui al requisito <strong>${escapeHtml(doc.code)}</strong> si intendono documentate per estensione
      futura qualora la condizione muti.</p>
    `;
  }

  return `
    <p>Il presente documento — <em>${escapeHtml(doc.title)}</em> — è redatto per la struttura <strong>${studio}</strong>,
    con titolare <strong>${titolare}</strong>, in adempimento al requisito <strong>${escapeHtml(doc.code)}</strong>.</p>
    <p>I dati strutturali, organizzativi e tecnici inseriti nel gestionale costituiscono allegato descrittivo integrativo.
    <strong>Il testo va sostituito con la versione legale definitiva</strong> (revisione del professionista / consulente di fiducia)
    prima dell'invio agli enti competenti.</p>
    <ul>
      <li>Indirizzo: ${escapeHtml(data.studio.addressLine)}</li>
      <li>P.IVA / C.F.: ${escapeHtml(data.studio.vatOrFiscalCode)}</li>
      ${
        data.studio.openingOrAuthDate
          ? `<li>Data apertura / autorizzazione: ${escapeHtml(data.studio.openingOrAuthDate)}</li>`
          : ""
      }
    </ul>
  `;
}
