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

<h2>Ruoli</h2>
<p>Il <strong>titolare</strong> coordina il sistema; il personale segnala tempestivamente; eventuali figure di riferimento per qualità o sicurezza supportano analisi e follow-up.</p>

<h2>Definizioni</h2>
<dl style="font-size:10.5pt;">
<dt><strong>Near miss</strong></dt><dd>Evento che avrebbe potuto causare danno ma è stato intercettato prima dell’esito lesivo.</dd>
<dt><strong>Evento avverso</strong></dt><dd>Compromissione non intenzionale della sicurezza del paziente durante l’assistenza.</dd>
<dt><strong>Evento sentinella</strong></dt><dd>Evento grave o raro che indica possibile fallimento sistemico e richiede analisi approfondita.</dd>
</dl>

<h2>Flusso operativo (5 fasi)</h2>
<ol>
<li><strong>Segnalazione</strong> — canale riservato e non punitivo (verbale, modulo, casella dedicata).</li>
<li><strong>Registrazione</strong> — data, descrizione sintetica, classificazione preliminare.</li>
<li><strong>Analisi</strong> — cause contributive (umane, organizzative, tecnologiche).</li>
<li><strong>Azioni</strong> — correttive / preventive con responsabile e scadenza.</li>
<li><strong>Verifica</strong> — efficacia delle misure e chiusura o riapertura del ciclo.</li>
</ol>

<h2>Comunicazione e riservatezza</h2>
<p>Le segnalazioni sono trattate nel rispetto della <strong>privacy</strong> e del <strong>segreto professionale</strong>; diffondono solo le informazioni necessarie al miglioramento, evitando identificazioni non pertinenti.</p>

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
<tr><td style="border:1px solid #333;padding:0.28rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.28rem;"><em>es. strumento scivolato — intercettato</em></td><td style="border:1px solid #333;padding:0.28rem;">Near miss</td><td style="border:1px solid #333;padding:0.28rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.28rem;">&nbsp;</td></tr>
<tr><td style="border:1px solid #333;padding:0.28rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.28rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.28rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.28rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.28rem;">&nbsp;</td></tr>
</tbody>
</table>
`;
}
