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

<h2>Norme su aghi, bisturi e taglienti</h2>
<p>Non ricappare gli aghi; utilizzare dispositivi di sicurezza ove disponibili; smaltire in <strong>contenitori rigidi</strong> a perdere; non lasciare strumenti su piani di lavoro non sorvegliati.</p>

<h2>DPI e barriere</h2>
<p>Guanti monouso idonei, mascherine chirurgiche o FFP ove indicato, visiere / occhiali per schizzi, camici. DPI sostituiti se danneggiati o contaminati.</p>

<h2>Smaltimento</h2>
<p>Rifiuti speciali e perforanti secondo contratto con il gestore autorizzato (riferimento dati fornitori nel fascicolo).</p>

<h2>Passi in caso di esposizione percutanea o schizzo</h2>
<ol>
<li>Interrompere in sicurezza l’attività; non espellere il sangue con pressioni dannose sulla ferita.</li>
<li>Lavaggio abbondante con acqua e sapone; mucose con soluzione fisiologica o acqua.</li>
<li>Segnalazione immediata al titolare; consultazione <strong>medico competente</strong> o PS secondo gravità.</li>
<li>Registrazione dell’evento e analisi delle cause.</li>
</ol>

<h2>Schede di sicurezza e sostanze chimiche</h2>
<p>Per disinfettanti, monomeri e altre sostanze pericolose si consultano le <strong>SDS</strong>; stoccaggio etichettato, compatibilità, formazione. Riferimenti ai fornitori e consulenze dichiarate:</p>
${c.externalSectionHtml}

<h2>Sorveglianza sanitaria e vaccinazioni</h2>
<p>Secondo parere del medico competente e valutazione del rischio biologico documentata nel DVR.</p>

<h2>Riesame</h2>
<p>Aggiornamento dopo infortuni, nuove sostanze o modifiche organizzative. Revisione documentale: <strong>${c.revision}</strong>.</p>
`;
}
