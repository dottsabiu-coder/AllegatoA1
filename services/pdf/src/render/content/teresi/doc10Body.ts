import type { BodyContext } from "../contextBuilder.js";

/** Parte testuale documento 10 prima dell’elenco attrezzature da modulo. */
export function teresiDoc10PreambleHtml(c: BodyContext): string {
  return `
<h2>Inventario delle attrezzature e procedura di identificazione</h2>
<p>Il titolare <strong>${c.ownerName}</strong> della struttura <strong>${c.studioName}</strong>, con sede in <strong>${c.address}</strong>, dichiara che l’elenco delle attrezzature presenti nello studio è quello riportato nella tabella seguente, desunto dai dati inseriti nel gestionale alla data di generazione del presente documento.</p>
<p>I <strong>manuali d’uso e manutenzione</strong> sono conservati in sede in formato digitale e/o cartaceo. L’inventario è verificato almeno <strong>annualmente</strong> (o con frequenza maggiore se imposta da norma o contratto); ogni modifica (acquisto, dismissione, spostamento) è registrata entro tempi congrui.</p>

<h2>Procedura per l’identificazione delle attrezzature</h2>
<p>La procedura definisce modalità di identificazione, classificazione e tracciabilità delle attrezzature e apparecchiature, incluse poltrone e unità operative, compressori, autoclavi, apparecchiature radiologiche, dispositivi elettromedicali, strumentazione diagnostica e attrezzature informatiche collegate alla gestione clinica.</p>
<p><strong>Identificazione:</strong> ogni bene è contrassegnato ove possibile con etichetta o codice univoco; è associato a scheda con descrizione, marca, modello, numero di serie, data di acquisto o installazione, ubicazione, fornitore, scadenze di manutenzione.</p>
<p><strong>Registro:</strong> tutte le attrezzature sono inserite in registro cartaceo o digitale tenuto aggiornato dal Responsabile della manutenzione. Le apparecchiature fuori servizio sono contrassegnate chiaramente.</p>
<p><strong>Conservazione documentazione:</strong> manuali, rapportini e certificazioni sono conservati per almeno dieci anni dalla dismissione o secondo normativa applicabile.</p>

<h2>Elenco attrezzature (dati modulo)</h2>
`;
}
