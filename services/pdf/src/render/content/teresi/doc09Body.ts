import type { BodyContext } from "../contextBuilder.js";

/** Documento 9 — Incarico responsabile manutenzione (1A.03.01.01), modello Teresi. */
export function teresiDoc09MainHtml(c: BodyContext): string {
  return `
<h2>Documento formale di incarico del responsabile della manutenzione</h2>
<p>Il sottoscritto <strong>${c.ownerName}</strong>, in qualità di titolare della struttura <strong>${c.studioName}</strong>, sita in <strong>${c.address}</strong>, al fine di garantire efficienza, sicurezza e conformità normativa di attrezzature, impianti e locali, provvede alla seguente:</p>

<h2>Nomina</h2>
<p>Designa <strong>${c.ownerName}</strong> quale <strong>Responsabile della manutenzione ordinaria e straordinaria</strong> della struttura (ovvero la figura indicata in atto separato se diversa dal titolare, da allegare in copia).</p>

<h2>Compiti e responsabilità</h2>
<ol style="margin-left:1.1rem;">
<li>Garantire efficienza e sicurezza di strumenti odontoiatrici, apparecchiature elettromedicali, dispositivi ausiliari e impianti tecnici (elettrico, idrico, aspirazione, compressore, ecc.).</li>
<li>Garantire efficienza degli strumenti di radiologia, con contratti o rapporti con esperti qualificati ove previsto.</li>
<li>Pianificare e monitorare interventi di manutenzione ordinaria e straordinaria secondo indicazioni dei produttori e normativa vigente.</li>
<li>Tenere aggiornato il registro delle manutenzioni e archiviare rapporti d’intervento.</li>
<li>Segnalare tempestivamente anomalie, guasti o rischi.</li>
<li>Verificare la regolarità di tarature e verifiche di sicurezza elettrica delle apparecchiature mediche ove applicabile.</li>
<li>Coordinare fornitori o tecnici esterni per interventi specialistici.</li>
</ol>
<p><em>Spazio firma titolare e data:</em> _________________________ &nbsp;&nbsp; Data: __________</p>
<p>Riferimento revisione documentale: <strong>${c.revision}</strong>.</p>
`;
}
