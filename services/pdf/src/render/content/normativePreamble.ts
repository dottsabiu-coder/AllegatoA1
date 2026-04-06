import { escapeHtml } from "../escape.js";

/**
 * Parte generale (come nell’A1 di riferimento): prima il quadro normativo e gli scopi del requisito,
 * poi il caso specifico della struttura. Testo orientativo — verificare con consulenza legale.
 */
export function quadroGeneraleAllegatoA1Monopresidio(): string {
  return `
<h2>Quadro normativo e finalità del requisito (Allegato A1 — D.A. 9 gennaio 2024, n. 20)</h2>
<p>Il decreto assessoriale 9 gennaio 2024, n. 20, pubblicato in G.U.R.S. 26 gennaio 2024, n. 5, S.O. n. 4, individua i <strong>requisiti organizzativi, strutturali e tecnologici generali</strong> per l’autorizzazione all’esercizio delle attività sanitarie delle <strong>strutture non residenziali semplici monopresidio</strong>, ai sensi degli articoli 8-quater e 12-septies del decreto del Presidente della Repubblica 9 maggio 2019, n. 75, e successive modifiche. Per una corretta applicazione occorre fare riferimento ai <strong>subcodici</strong> riportati nell’Allegato A1 e, ove richiesto, al Manuale OTA e alla normativa di settore.</p>
<p>La struttura monopresidio, pur nella ridotta complessità organizzativa rispetto alle poli-presidio, deve dimostrare di possedere <strong>documentazione coerente, aggiornata e operativa</strong>, idonea a consentire al Gruppo di Valutazione (GdV) di verificare il possesso dei requisiti prima della visita. I documenti non devono essere meri elenchi nominativi: devono illustrare <strong>finalità, ambito, ruoli, collegamenti tra processi</strong> e le misure adottate per prevenire disservizi, garantire la qualità e la sicurezza delle cure e il rispetto della privacy.</p>
<p>Il presente capitolo introduce il requisito specifico richiamato dal codice in intestazione; le sezioni successive descrivono <strong>l’applicazione alla singola struttura</strong> sulla base dei dati dichiarati nel gestionale. Eventuali integrazioni cartacee (moduli, verbali, certificazioni) restano acquisite nel fascicolo fisico della struttura.</p>
`;
}

export function intestazioneRequisitoSpecifico(code: string, titleShort: string): string {
  return `<p><strong>Requisito in oggetto:</strong> <span>${escapeHtml(code)}</span> — <em>${escapeHtml(titleShort)}</em>.</p>`;
}
