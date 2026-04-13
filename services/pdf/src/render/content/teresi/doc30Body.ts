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
<li><strong>Zona 3 — Medio rischio:</strong> sale operative.</li>
<li><strong>Zona 4 — Servizi igienici:</strong> pulizia con sequenza e prodotti dedicati.</li>
</ul>

<h2>Attività per area (sintesi operativa)</h2>
<p><strong>Locali comuni (Zona 1):</strong> sostituzione sacchi, pulizia superfici e maniglie con panno umido; trattamento disinfettante su punti di contatto frequente; pavimenti a doppio secchio (detersione e risciacquo); attività mensili su vetrate, armadi, tastiere ove presenti.</p>
<p><strong>Sale odontoiatriche e sterilizzazione:</strong> durante l’attività, disinfezione straordinaria in caso di contaminazione accidentale; a fine giornata o tra un paziente e l’altro: superfici di lavoro, lettini, comandi, aspirazione, circuiti idrici del riunito secondo protocollo interno e indicazioni del fabbricante; aerazione; rifiuti; attività settimanale su vasche ultrasuoni e camera sterilizzazione autoclave; mensile su componenti tecnici indicati nel piano.</p>
<p><strong>Servizi igienici:</strong> controllo periodico in orario di apertura; lavaggio con detergente, risciacquo, disinfezione (derivati clorati ove idonei); ordine di intervento: coperture WC, vasi, pavimenti; carta e asciugamani.</p>

<h2>Scelta degli agenti sanificanti</h2>
<p>I disinfettanti per superfici devono avere <strong>ampio spettro antibatterico</strong>, buona attività in presenza di sporco organico limitato, persistenza ragionevole e compatibilità con la sicurezza degli operatori. Esempi di principi attivi utilizzabili (sempre secondo scheda di sicurezza e istruzioni del produttore): <strong>benzalconio cloruro</strong>, <strong>ipoclorito di sodio</strong> in concentrazioni previste, formulazioni a base di ammonio quaternario in spray per superfici e ambienti.</p>
<p>I prodotti sono sostituiti periodicamente o quando ne venga meno l’efficacia documentata. La disinfezione di maniglie, interruttori e superfici promiscue può avvalersi anche di spray registrati per l’uso sanitario.</p>

<h2>Sanificazione straordinaria</h2>
<p>In caso di riscontro di pazienti con patologie trasmissibili rilevanti (es. virus respiratori emergenti) si attivano protocolli di sanificazione rafforzati, in coordinamento con il documento su isolamento e precauzioni (1A.02.02.03).</p>

<h2>Registrazione</h2>
<p>Al termine delle operazioni programmate il responsabile annota l’attività su apposite schede o registro di sanificazione conservato in sede.</p>

<h2>Igiene del personale</h2>
<p>Vietato fumare nei locali. Camici puliti e custoditi in spogliatoio; unghie corte, senza smalto in area clinica; mani lavate secondo i momenti indicati nelle precauzioni standard; uso di prodotti per lavaggio mani con pH e tensioattivi idonei.</p>

<h2>Dati strutturali dal modulo</h2>
${c.premisesSectionHtml}
`;
}
