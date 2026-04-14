import type { BodyContext } from "../contextBuilder.js";

/** Documento 30 — Pulizia e sanificazione ambienti (1A.06.02.02), modello Teresi. */
export function teresiDoc30MainHtml(c: BodyContext): string {
  return `
<h2>Generalità</h2>
<p>Per garantire l’igiene degli ambienti di <strong>${c.studioName}</strong> (sede <strong>${c.address}</strong>) si effettuano distinte operazioni:</p>
<ol>
<li>eliminazione dei rifiuti speciali (contenitori chiusi, zone dedicate, ritiro da parte del gestore autorizzato);</li>
<li>eliminazione dei rifiuti assimilati agli urbani secondo le disposizioni comunali;</li>
<li><strong>detersione</strong> (rimozione meccanica e chimica dello sporco);</li>
<li><strong>disinfezione</strong> (riduzione della carica microbica su superfici).</li>
</ol>
<p>Il titolare o il <strong>Responsabile qualità</strong> verifica che le operazioni avvengano con le frequenze e le modalità definite; sino all’assunzione di personale dedicato le attività possono essere svolte dal titolare come da organigramma della monopresidio.</p>

<h2>Scopo e campo di applicazione</h2>
<p>La procedura si applica a tutte le aree operative e di supporto: sala d’attesa, segreteria, sala personale, sale operative, sterilizzazione, servizi igienici, ingresso/corridoio, zona tecnica.</p>

<h2>Identificazione delle aree e classificazione igienica</h2>
<p>In base alla destinazione d’uso e al rischio di contaminazione si distinguono:</p>
<ul>
<li><strong>Zona 1 — Ambienti a rischio generico:</strong> attesa, corridoi, ufficio amministrativo, spogliatoio.</li>
<li><strong>Zona 2 — Basso rischio:</strong> servizi igienici di supporto.</li>
<li><strong>Zona 3 — Medio rischio:</strong> sale trattamento, sterilizzazione, magazzino materiali.</li>
<li><strong>Zona 4 — Alto rischio:</strong> superfici a contatto stretto con paziente / campo operatorio; frequenza e agenti coerenti con protocollo di biosicurezza.</li>
</ul>

<h2>Attività per area (sintesi)</h2>
<p>Per ciascuna zona sono definite <strong>frequenza</strong>, <strong>sequenza</strong> (sempre da «pulito» a «sporco» ove applicabile), <strong>prodotto</strong> (detergente / disinfettante ammesso), <strong>DPI</strong> e <strong>responsabile</strong> (interno o ditta esterna). Le schede operative dettagliate restano in copia in sterilizzazione o ufficio qualità.</p>

<h2>Sanificazione straordinaria</h2>
<p>Dopo eventi contaminanti, lavori edili, assenza prolungata o circolari regionali, si attiva <strong>sanificazione potenziata</strong> con prodotti e tempi di contatto registrati; ove necessario si coinvolge ditta specializzata.</p>

<h2>Registrazione e tracciabilità</h2>
<p>Ove richiesto da policy interna o contratti, si tengono <strong>registri</strong> o checklist firmate (data, area, operatore, prodotto). I fogli sicurezza dei prodotti chimici sono accessibili al personale.</p>

<h2>Igiene personale del personale</h2>
<p>Il personale applica <strong>igiene delle mani</strong> secondo OMS / protocollo interno, utilizza DPI per la pulizia e non incorcia flussi tra zone a rischio diverso senza cambio di camice / guanti.</p>

<h2>Sintesi locali dichiarati (gestionale)</h2>
${c.premisesSectionHtml}
`;
}
