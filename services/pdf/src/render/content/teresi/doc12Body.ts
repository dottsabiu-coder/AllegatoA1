import type { BodyContext } from "../contextBuilder.js";

/** Documento 12 — Documentazione tecnica attrezzature (1A.03.02.03), modello Teresi. */
export function teresiDoc12MainHtml(c: BodyContext): string {
  return `
<h2>Documentazione tecnica delle attrezzature e apparecchiature</h2>

<h2>1. Obiettivo</h2>
<p>Garantire la disponibilità della documentazione tecnica relativa a tutte le attrezzature e apparecchiature utilizzate in <strong>${c.studioName}</strong>, sita in <strong>${c.address}</strong>, al fine di assicurare utilizzo corretto e sicuro, facilitare la manutenzione e rispettare i requisiti di sicurezza e conformità.</p>

<h2>2. Modalità di gestione</h2>
<p>La documentazione è conservata in <strong>formato cartaceo</strong> (faldoni / raccoglitori) e/o <strong>digitale</strong> in archivio dedicato («Manuali tecnici e schede apparecchiature»), con accesso riservato al personale autorizzato e al Responsabile della manutenzione. Deve essere consultabile dagli operatori sanitari che utilizzano le apparecchiature e dai tecnici incaricati degli interventi.</p>

<h2>3. Contenuti minimi per apparecchiatura</h2>
<ul>
<li>Manuale d’uso e manutenzione;</li>
<li>Scheda tecnica;</li>
<li>Certificato di conformità / dichiarazione CE ove applicabile;</li>
<li>Registro manutenzioni e rapporti di intervento;</li>
<li>Schede di sicurezza dei materiali ove rilevanti;</li>
<li>Check-list di controllo periodico ove adottate;</li>
<li>Garanzie e contratti di assistenza.</li>
</ul>

<h2>4. Aggiornamento e controllo</h2>
<p>La documentazione è revisionata almeno <strong>annualmente</strong> o ad ogni sostituzione di apparecchiatura. Il titolare o il Responsabile della manutenzione verifica la completezza dei fascicoli. Ogni nuova apparecchiatura è registrata prima della messa in servizio (coerenza con documento n. 10).</p>

<h2>5. Consultazione</h2>
<p>Gli operatori possono consultare la documentazione tramite terminale informatico o raccoglitore in sede. Gli addetti alla manutenzione dispongono di accesso ai fascicoli tecnici.</p>
<p>Riferimento revisione documentale: <strong>${c.revision}</strong>.</p>
`;
}
