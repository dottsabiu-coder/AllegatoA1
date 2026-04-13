import type { BodyContext } from "../contextBuilder.js";

/** Documento 31 — Esposizione materiale biologico / sostanze pericolose (1A.06.02.03), modello Teresi. */
export function teresiDoc31MainHtml(c: BodyContext): string {
  return `
<h2>Finalità e ambito</h2>
<p>Gli operatori di <strong>${c.studioName}</strong> (sede <strong>${c.address}</strong>) possono essere esposti a <strong>materiale biologico</strong>, liquidi irritanti, anestetici, disinfettanti e, durante alcune procedure, a <strong>radiazioni ottiche artificiali non coerenti</strong> (lampade fotopolimerizzatrici). Il titolare <strong>${c.ownerName}</strong> assicura formazione, DPI e procedure coerenti con il D.Lgs. 81/2008.</p>

<h2>Tipologie di incidente (esempi)</h2>
<ul>
<li>contatto accidentale con sangue o fluidi del paziente;</li>
<li>schizzi verso mucose o cute lesa;</li>
<li>ferite da taglio o puntura con aghi o strumenti appuntiti;</li>
<li>esposizione a sostanze chimiche per uso clinico o pulizia.</li>
</ul>

<h2>DPI e comportamento in seduta</h2>
<p>Durante le prestazioni con i pazienti sono obbligatori, secondo il rischio: <strong>visiera</strong> paraschizzi, <strong>guanti</strong> monouso, <strong>camice</strong> o TNT, <strong>cuffia</strong>, <strong>mascherina</strong>, <strong>occhiali</strong> protettivi durante le polimerizzazioni ove necessario. I materiali monouso e i DPI contaminati sono conferiti nei <strong>rifiuti speciali</strong> secondo la procedura di smaltimento.</p>

<h2>Norme per l’uso di aghi e taglienti</h2>
<ol style="margin-left:1.1rem;">
<li>Utilizzare aghi e taglienti solo se indispensabili; non passarli «di mano in mano» senza supporto neutro.</li>
<li>Non reincappucciare gli aghi; non piegare o spezzare aghi usati.</li>
<li>Smaltire in <strong>contenitori rigidi antiperforazione</strong> a portata di mano; non riempire oltre i limiti indicati.</li>
<li>Non manipolare aghi usati con due mani; non rivolgere la punta verso il corpo.</li>
<li>Preferire dispositivi con sistema di protezione ove disponibili.</li>
</ol>

<h2>Smaltimento</h2>
<p>Rifiuti taglienti in contenitori gialli dedicati; chiusura ermetica e conferimento nel flusso dei rifiuti sanitari a rischio infettivo secondo D.Lgs. 81/2008 e D.P.R. 254/2003.</p>

<h2>In caso di puntura, taglio o esposizione cutanea/mucosa</h2>
<ol style="margin-left:1.1rem;">
<li>Non favorire il sanguinamento in modo forzato.</li>
<li>Lavare immediatamente con <strong>acqua e sapone</strong>; per mucose sciacquo abbondante.</li>
<li>Disinfettare con antisettico indicato (es. clorexidina o iodopovidone) salvo controindicazioni.</li>
<li>Segnalare subito al titolare e consultare il <strong>medico competente</strong> o il pronto soccorso secondo gravità e protocollo aziendale.</li>
<li>Registrare l’evento per analisi delle cause e azioni correttive.</li>
</ol>

<h2>Sostanze chimiche</h2>
<p>Per disinfettanti e monomeri sono disponibili le <strong>schede di sicurezza (SDS)</strong>; stoccaggio, diluizioni e DPI secondo scheda. È vietato consumare cibi o bevande durante l’uso di sostanze chimiche.</p>

<h2>Riferimenti organizzativi</h2>
${c.externalSectionHtml}
`;
}
