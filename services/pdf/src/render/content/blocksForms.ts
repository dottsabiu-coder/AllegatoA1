import { escapeHtml } from "../escape.js";
import type { BodyContext } from "./contextBuilder.js";

/** Modulo tipo per registrazione / valutazione reclamo (da completare a mano o in gestionale). */
export function complaintIntakeFormBlock(): string {
  return `
<h2>Modulo di registrazione e valutazione del reclamo</h2>
<p>Il reclamo può essere presentato verbalmente o per iscritto. Ogni segnalazione viene registrata con progressivo univoco. Le casistiche sono classificate per gravità e per area (organizzativa, clinica, economica, privacy).</p>
<table class="data-table" style="width:100%;border-collapse:collapse;font-size:10pt;margin:0.8rem 0;">
  <tbody>
    <tr><td style="border:1px solid #333;padding:0.35rem;width:32%;"><strong>Protocollo reclamo n.</strong></td><td style="border:1px solid #333;padding:0.35rem;">&nbsp;</td></tr>
    <tr><td style="border:1px solid #333;padding:0.35rem;"><strong>Data e ora ricezione</strong></td><td style="border:1px solid #333;padding:0.35rem;">&nbsp;</td></tr>
    <tr><td style="border:1px solid #333;padding:0.35rem;"><strong>Modalità di presentazione</strong></td><td style="border:1px solid #333;padding:0.35rem;">□ Verbale &nbsp; □ Scritto &nbsp; □ PEC / e-mail &nbsp; □ Altro: _________</td></tr>
    <tr><td style="border:1px solid #333;padding:0.35rem;"><strong>Sintesi del reclamo</strong></td><td style="border:1px solid #333;padding:0.35rem;min-height:3rem;">&nbsp;</td></tr>
    <tr><td style="border:1px solid #333;padding:0.35rem;"><strong>Area coinvolta</strong></td><td style="border:1px solid #333;padding:0.35rem;">□ Accoglienza □ Prestazione clinica □ Fatturazione □ Privacy □ Altro</td></tr>
    <tr><td style="border:1px solid #333;padding:0.35rem;"><strong>Analisi preliminare e responsabile istruttoria</strong></td><td style="border:1px solid #333;padding:0.35rem;">&nbsp;</td></tr>
    <tr><td style="border:1px solid #333;padding:0.35rem;"><strong>Misure correttive proposte / adottate</strong></td><td style="border:1px solid #333;padding:0.35rem;">&nbsp;</td></tr>
    <tr><td style="border:1px solid #333;padding:0.35rem;"><strong>Risposta all’utente (data / esito)</strong></td><td style="border:1px solid #333;padding:0.35rem;">&nbsp;</td></tr>
    <tr><td style="border:1px solid #333;padding:0.35rem;"><strong>Firma del titolare / incaricato</strong></td><td style="border:1px solid #333;padding:0.35rem;">&nbsp;</td></tr>
  </tbody>
</table>
<p><em>Le righe possono essere duplicate per ogni reclamo archiviato. Conservare copia in fascicolo qualità.</em></p>
`;
}

/** Tabella tipo “processi — fasi critiche — disservizi” (allineata alla logica del modello A1 esteso). */
export function disserviziProcessTableBlock(c: BodyContext): string {
  return `
<h2>Tabella riepilogativa dei processi, fasi critiche e possibili disservizi</h2>
<p>La tabella seguente costituisce uno schema operativo per <strong>${c.studioName}</strong>; va aggiornata in sede di revisione del sistema qualità. Le azioni preventive devono essere coerenti con i protocolli interni e con la formazione del personale.</p>
<table class="data-table" style="width:100%;border-collapse:collapse;font-size:9.5pt;margin:0.6rem 0;">
  <thead>
    <tr>
      <th style="border:1px solid #333;padding:0.3rem;">Processo</th>
      <th style="border:1px solid #333;padding:0.3rem;">Fase critica</th>
      <th style="border:1px solid #333;padding:0.3rem;">Possibili disservizi</th>
      <th style="border:1px solid #333;padding:0.3rem;">Azioni preventive / correttive</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Accoglienza e prenotazione</td>
      <td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Conferma appuntamenti, gestione liste d’attesa</td>
      <td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Sovraffollamento, doppie prenotazioni, attese eccessive</td>
      <td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Promemoria automatici, sovrapposizioni bloccate dal gestionale, politiche di priorità documentate</td>
    </tr>
    <tr>
      <td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Erogazione della prestazione</td>
      <td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Diagnosi, consenso informato, trattamento</td>
      <td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Incompletezza documentazione clinica, strumentazione non disponibile</td>
      <td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Check-list, manutenzione programmata, ECM, controllo scorte</td>
    </tr>
    <tr>
      <td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Sterilizzazione</td>
      <td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Pulizia, imbustamento, cicli autoclave</td>
      <td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Interruzioni di catena, tracciabilità incompleta</td>
      <td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Protocolli interni, registri, manutenzione certificata apparecchiature</td>
    </tr>
    <tr>
      <td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Gestione amministrativa</td>
      <td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Fatturazione, conservazione sostitutiva, privacy</td>
      <td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Errori documentali, perdita dati</td>
      <td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Backup, doppio controllo, formazione amministrativa, accessi profilati</td>
    </tr>
    <tr>
      <td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Comunicazione al paziente</td>
      <td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Informazioni pre e post trattamento</td>
      <td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Incompletezza informazioni, mancato follow-up</td>
      <td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Schede standard, materiali informativi, canali tracciati (SMS/e-mail ove usati)</td>
    </tr>
  </tbody>
</table>
`;
}

export function riferimentiNormativiErogazioneAssistenza(): string {
  return `
<h2>Riferimenti normativi (indicativi)</h2>
<ul>
<li>Codice deontologico della professione sanitaria di riferimento e normativa professionale specifica.</li>
<li>Regolamento (UE) 2016/679 e normativa nazionale in materia di protezione dei dati personali, ove applicabile al percorso assistenziale.</li>
<li>Decreto del Presidente della Repubblica 75/2019 e testo unico in materia di servizio sanitario nazionale, nei limiti pertinenti alle strutture private ambulatoriali.</li>
<li>Normativa regionale in materia di autorizzazione e accreditamento delle strutture sanitarie (Sicilia: D.A. 20/2024 e allegati).</li>
<li>Linee guida e manuali OTA / MAMB per la tipologia strutturale, ove richiamati dal programma regionale.</li>
</ul>
<p><em>Elenco non esaustivo: integrare con riferimenti aggiornati e con parere del consulente di fiducia.</em></p>
`;
}

export function pianoEmergenzeEstesoBlock(c: BodyContext): string {
  return `
<h2>Gestione delle emergenze intra-moenia</h2>
<p>La struttura <strong>${c.studioName}</strong> definisce comportamenti e responsabilità in caso di emergenze che si verificano durante l’orario di apertura, in assenza di continuità assistenziale ospedaliera sul luogo.</p>
<h3>Scenari tipici e primi interventi</h3>
<ul>
<li><strong>Sincope / malessere:</strong> posizione sicura, valutazione stato di coscienza, parametri vitali se disponibili, ossigeno se previsto, chiamata 118 se necessario.</li>
<li><strong>Sanguinamento:</strong> compressione, emostasi, protezione operatori, smaltimento rifiuti contaminati secondo procedura.</li>
<li><strong>Evento cardiaco acuto o arresto:</strong> attivazione 118, inizio BLSD se il personale è formato e attrezzato, uso del DAE se presente e accessibile.</li>
<li><strong>Reazione allergica grave:</strong> farmaci di emergenza se legalmente disponibili e prescritti, posizione, ossigeno, 118.</li>
<li><strong>Incidente strumentale:</strong> sicurezza della scena, tutela del paziente, segnalazione e registrazione dell’evento avverso.</li>
</ul>
<h3>Numeri e contatti</h3>
<p>Numerazione unica di emergenza <strong>112</strong> / <strong>118</strong>; numeri interni di reperibilità del titolare e, se presente, collaboratori; indirizzo completo della struttura da comunicare al centralinista: <strong>${c.address}</strong>.</p>
<h3>Dotazioni minime e verifiche</h3>
<p>Presidi di primo soccorso, defibrillatore se adottato, estintori e vie di esodo conformi alla documentazione antincendio. Verifiche periodiche su scadenze dei presidi e formazione del personale documentata.</p>
<h3>Evacuazione</h3>
<p>Percorsi preferenziali, punto di raccolta esterno ove applicabile, ruolo di accompagnamento pazienti a mobilità ridotta. Coordinamento con le autorità in caso di evacuazione dell’edificio.</p>
`;
}

export function protocolloIsolamentoEstesoBlock(c: BodyContext): string {
  return `
<h2>Protocollo operativo per pazienti con patologie contagiose o potenzialmente tali</h2>
<p>La struttura <strong>${c.studioName}</strong> adotta misure precauzionali proporzionate al rischio e alla tipologia di attività, in linea con le indicazioni delle autorità sanitarie e con le buone pratiche di prevenzione delle infezioni.</p>
<h3>Criteri di sospensione / differimento</h3>
<p>Valutazione anamnestica e sintomatologia compatibile con patologie trasmissibili; differimento programmabile delle prestazioni non urgenti; canalizzazione verso strutture idonee in caso di sospetta malattia a notifica o alta contagiosità.</p>
<h3>Misure di protezione</h3>
<ul>
<li>Uso di DPI secondo protocollo interno e tipologia di contatto.</li>
<li>Ventilazione dei locali e sanificazione ambientale potenziata a fine seduta o giornata, con prodotti e modalità registrate.</li>
<li>Gestione separata temporale o spaziale delle attività ove possibile per ridurre incroci tra pazienti a rischio diverso.</li>
</ul>
<h3>Comunicazioni</h3>
<p>Flussi verso ATS / Igiene e sanità pubblica quando obbligatori per legge; documentazione interna degli eventi e delle decisioni assunte dal titolare.</p>
<h3>Formazione</h3>
<p>Aggiornamento periodico del personale su protocolli aggiornati e su eventuali circolari regionali o nazionali.</p>
${c.premisesSectionHtml}
`;
}
