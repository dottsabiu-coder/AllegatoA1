import type { BodyContext } from "../contextBuilder.js";

/** Documento 32 — Near miss, eventi avversi, eventi sentinella (1A.06.02.04), modello Teresi. */
export function teresiDoc32MainHtml(c: BodyContext): string {
  return `
<h2>Finalità e contesto</h2>
<p>I <strong>near miss</strong> evidenziano criticità organizzative, tecniche o comportamentali prima che si verifichi un danno. La segnalazione e l’analisi degli eventi — anche non dannosi — servono a migliorare la sicurezza di <strong>${c.studioName}</strong> (sede <strong>${c.address}</strong>) e si integrano con il piano rischi (<strong>documento n. 29</strong>, 1A.06.02.01), i reclami (<strong>documento n. 4</strong>, 1A.01.06.01) e il report su criticità e soddisfazione (<strong>documento n. 28</strong>, 1A.05.03.05).</p>

<h2>Obiettivi</h2>
<ul>
<li>identificare, raccogliere e analizzare eventi che riguardano personale o utenti;</li>
<li>valutare non conformità e criticità procedurali;</li>
<li>definire misure correttive e preventive;</li>
<li>garantire comunicazione chiara sullo stato di trattazione della segnalazione fino all’esito.</li>
</ul>

<h2>Figure coinvolte (modello organizzativo)</h2>
<ul>
<li><strong>Segnalante:</strong> lavoratore, collaboratore o altro soggetto che rileva l’evento o il quasi-evento.</li>
<li><strong>Gruppo di ricezione, trasmissione e valutazione (GRTVI):</strong> riceve la segnalazione, ne valuta la rilevanza e avvia le azioni; in microstruttura può coincidere con titolare, RSPP o incaricato nominato.</li>
<li><strong>Gruppo risoluzione incidenti (GRI):</strong> interviene quando la soluzione non è gestibile solo a livello operativo locale.</li>
<li><strong>Datore di lavoro / titolare:</strong> <strong>${c.ownerName}</strong> — chiusura dell’evento, verifica efficacia delle misure e aggiornamento documentale.</li>
</ul>

<h2>Definizioni operative</h2>
<dl style="font-size:10.5pt;">
<dt><strong>Near miss</strong></dt>
<dd>Situazione che avrebbe potuto causare danno a persone o interruzione grave del servizio, ma è stata intercettata in tempo (es. strumento che cade verso il campo sterile ma viene fermato).</dd>
<dt><strong>Evento avverso</strong></dt>
<dd>Evento che ha causato danno o disagio significativo al paziente o agli operatori, da lieve a grave, inclusi errori di processo recuperabili o meno.</dd>
<dt><strong>Evento sentinella</strong></dt>
<dd>Evento raro o particolarmente grave che indica possibile fallimento sistemico e richiede analisi approfondita e report al titolare.</dd>
</dl>

<h2>Flusso in cinque fasi</h2>
<ol style="margin-left:1.1rem;">
<li><strong>Registrazione e archiviazione</strong> della segnalazione (data, descrizione sintetica, luogo, persone coinvolte).</li>
<li><strong>Coinvolgimento</strong> delle figure competenti e tutela della riservatezza.</li>
<li><strong>Verifica</strong> e classificazione (near miss / avverso / sentinella) con analisi delle cause.</li>
<li><strong>Approvazione</strong> delle azioni correttive o preventive e assegnazione responsabili e scadenze.</li>
<li><strong>Attuazione e monitoraggio</strong> dell’efficacia; feedback al segnalante ove opportuno.</li>
</ol>

<h2>Comunicazione interna</h2>
<p>Il segnalante riceve conferma di avvenuta ricezione. Se la segnalazione non è presa in carico, viene fornita motivazione scritta. Le soluzioni adottate sono documentate e comunicate ai soggetti interessati nel rispetto della privacy e del segreto professionale.</p>

<h2>Registro eventi (modello)</h2>
<table class="data-table" style="width:100%;border-collapse:collapse;font-size:9pt;margin:0.55rem 0;">
<thead><tr>
<th style="border:1px solid #333;padding:0.22rem;">Data</th>
<th style="border:1px solid #333;padding:0.22rem;">Descrizione sintetica</th>
<th style="border:1px solid #333;padding:0.22rem;">Classe</th>
<th style="border:1px solid #333;padding:0.22rem;">Azioni</th>
<th style="border:1px solid #333;padding:0.22rem;">Stato</th>
</tr></thead>
<tbody>
<tr><td style="border:1px solid #333;padding:0.28rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.28rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.28rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.28rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.28rem;">&nbsp;</td></tr>
<tr><td style="border:1px solid #333;padding:0.28rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.28rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.28rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.28rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.28rem;">&nbsp;</td></tr>
</tbody>
</table>
`;
}
