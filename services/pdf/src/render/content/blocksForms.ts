import { escapeHtml } from "../escape.js";
import type { BodyContext } from "./contextBuilder.js";

/** Modulo reclami — layout a griglia (allineamento a moduli tipo studio / Teresi). */
export function complaintIntakeFormBlock(): string {
  return `
<h2>Modulo di registrazione e valutazione del reclamo</h2>
<p>Ogni reclamo, osservazione o suggerimento è registrato con <strong>protocollo progressivo</strong>. Compilare una scheda per ogni pratica.</p>
<table class="data-table" style="width:100%;border-collapse:collapse;font-size:10pt;margin:0.75rem 0;">
  <thead>
    <tr>
      <th style="border:1px solid #333;padding:0.4rem;width:22%;text-align:left;">Campo</th>
      <th style="border:1px solid #333;padding:0.4rem;text-align:left;" colspan="3">Valore / note</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border:1px solid #333;padding:0.35rem;vertical-align:top;"><strong>1. Protocollo interno n.</strong></td>
      <td style="border:1px solid #333;padding:0.35rem;" colspan="3">&nbsp;</td>
    </tr>
    <tr>
      <td style="border:1px solid #333;padding:0.35rem;vertical-align:top;"><strong>2. Data e ora di ricezione</strong></td>
      <td style="border:1px solid #333;padding:0.35rem;width:26%;">&nbsp;</td>
      <td style="border:1px solid #333;padding:0.35rem;width:22%;"><strong>Ricevuto da</strong></td>
      <td style="border:1px solid #333;padding:0.35rem;">&nbsp;</td>
    </tr>
    <tr>
      <td style="border:1px solid #333;padding:0.35rem;vertical-align:top;"><strong>3. Modalità di presentazione</strong></td>
      <td style="border:1px solid #333;padding:0.35rem;" colspan="3">□ Di persona &nbsp; □ Telefono &nbsp; □ Posta / raccomandata &nbsp; □ E-mail &nbsp; □ PEC &nbsp; □ Altro: __________</td>
    </tr>
    <tr>
      <td style="border:1px solid #333;padding:0.35rem;vertical-align:top;"><strong>4. Dati reclamante</strong><br/><span style="font-size:9pt;font-weight:normal;">(se diverso dal paziente)</span></td>
      <td style="border:1px solid #333;padding:0.35rem;" colspan="3">Cognome e nome __________________ &nbsp; Recapito __________________ &nbsp; Rapporto con il paziente __________</td>
    </tr>
    <tr>
      <td style="border:1px solid #333;padding:0.35rem;vertical-align:top;"><strong>5. Sintesi oggetto del reclamo</strong></td>
      <td style="border:1px solid #333;padding:0.35rem;min-height:4.5rem;" colspan="3">&nbsp;<br/>&nbsp;<br/>&nbsp;</td>
    </tr>
    <tr>
      <td style="border:1px solid #333;padding:0.35rem;vertical-align:top;"><strong>6. Classificazione</strong></td>
      <td style="border:1px solid #333;padding:0.35rem;" colspan="3">
        Area: □ Organizzativa / accoglienza &nbsp; □ Clinica &nbsp; □ Economica / fatturazione &nbsp; □ Privacy &nbsp; □ Altro _______<br/>
        Gravità percepita: □ Bassa &nbsp; □ Media &nbsp; □ Alta
      </td>
    </tr>
    <tr>
      <td style="border:1px solid #333;padding:0.35rem;vertical-align:top;"><strong>7. Istruttoria</strong></td>
      <td style="border:1px solid #333;padding:0.35rem;" colspan="3">Responsabile istruttoria __________ &nbsp; Azioni avviate (data) __________</td>
    </tr>
    <tr>
      <td style="border:1px solid #333;padding:0.35rem;vertical-align:top;"><strong>8. Misure correttive / preventive</strong></td>
      <td style="border:1px solid #333;padding:0.35rem;min-height:3.2rem;" colspan="3">&nbsp;<br/>&nbsp;</td>
    </tr>
    <tr>
      <td style="border:1px solid #333;padding:0.35rem;vertical-align:top;"><strong>9. Risposta all’utente</strong></td>
      <td style="border:1px solid #333;padding:0.35rem;" colspan="3">Data consegna / invio risposta ________ &nbsp; Modalità □ Verbale □ Scritta □ PEC/e-mail &nbsp; Estremi documento ________</td>
    </tr>
    <tr>
      <td style="border:1px solid #333;padding:0.35rem;vertical-align:top;"><strong>10. Chiusura pratica</strong></td>
      <td style="border:1px solid #333;padding:0.35rem;" colspan="3">□ Accolta &nbsp; □ Respinta &nbsp; □ Parzialmente accolta &nbsp; Note ________________________________</td>
    </tr>
    <tr>
      <td style="border:1px solid #333;padding:0.35rem;vertical-align:top;"><strong>11. Firme</strong></td>
      <td style="border:1px solid #333;padding:0.35rem;" colspan="3">Titolare / incaricato _________________________ &nbsp; Data __________</td>
    </tr>
  </tbody>
</table>
<p style="font-size:9.5pt;"><em>Duplicare la scheda per ogni reclamo. Conservare il registro in fascicolo qualità. Riferimento procedura 1A.01.06.01.</em></p>
`;
}

/** Piano verifiche periodiche apparecchiature (doc. 11). */
export function maintenanceVerificationPlanBlock(): string {
  return `
<h2>Piano di verifiche periodiche alle apparecchiature</h2>
<p>Per ciascun bene censito nel documento n. 10 si programmano verifiche funzionali, controlli di sicurezza e manutenzioni obbligate dalla norma o dal costruttore. Compilare o allegare registro aggiornato.</p>
<table class="data-table" style="width:100%;border-collapse:collapse;font-size:9.5pt;margin:0.65rem 0;">
  <thead>
    <tr>
      <th style="border:1px solid #333;padding:0.28rem;">Apparecchiatura / impianto</th>
      <th style="border:1px solid #333;padding:0.28rem;">Tipo di verifica</th>
      <th style="border:1px solid #333;padding:0.28rem;">Periodicità</th>
      <th style="border:1px solid #333;padding:0.28rem;">Responsabile</th>
      <th style="border:1px solid #333;padding:0.28rem;">Ultima data / esito</th>
    </tr>
  </thead>
  <tbody>
    <tr><td style="border:1px solid #333;padding:0.35rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.35rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.35rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.35rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.35rem;">&nbsp;</td></tr>
    <tr><td style="border:1px solid #333;padding:0.35rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.35rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.35rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.35rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.35rem;">&nbsp;</td></tr>
    <tr><td style="border:1px solid #333;padding:0.35rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.35rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.35rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.35rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.35rem;">&nbsp;</td></tr>
  </tbody>
</table>
`;
}

/** Modulo di adesione / conferma copertura assicurativa (doc. 25). */
export function insuranceAdhesionFormBlock(c: BodyContext): string {
  return `
<h2>Modulo di adesione alla copertura assicurativa</h2>
<p>Il sottoscritto titolare / legale rappresentante della struttura <strong>${c.studioName}</strong> dichiara di avere sottoscritto polizza/i idonee ai sensi della L. 24/2017 e successive, coerenti con l’attività sanitaria svolta, e di impegnarsi a mantenere la documentazione contrattuale aggiornata.</p>
<table class="data-table" style="width:100%;border-collapse:collapse;font-size:10pt;margin:0.7rem 0;">
  <tbody>
    <tr><td style="border:1px solid #333;padding:0.35rem;width:34%;"><strong>Compagnia assicurativa</strong></td><td style="border:1px solid #333;padding:0.35rem;">&nbsp;</td></tr>
    <tr><td style="border:1px solid #333;padding:0.35rem;"><strong>N. polizza / contratto</strong></td><td style="border:1px solid #333;padding:0.35rem;">&nbsp;</td></tr>
    <tr><td style="border:1px solid #333;padding:0.35rem;"><strong>Massimali e scadenza</strong></td><td style="border:1px solid #333;padding:0.35rem;">&nbsp;</td></tr>
    <tr><td style="border:1px solid #333;padding:0.35rem;"><strong>Estensione a collaboratori / struttura</strong></td><td style="border:1px solid #333;padding:0.35rem;">□ Sì &nbsp; □ No &nbsp; Note: ________________________________</td></tr>
    <tr><td style="border:1px solid #333;padding:0.35rem;"><strong>Data e firma per adesione / presa visione</strong></td><td style="border:1px solid #333;padding:0.35rem;">&nbsp;</td></tr>
  </tbody>
</table>
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
<p>La struttura <strong>${c.studioName}</strong> definisce comportamenti e responsabilità in caso di emergenze che si verificano durante l’orario di apertura, in assenza di continuità assistenziale ospedaliera sul luogo. Il titolare coordina l’attivazione delle procedure; in sua assenza il collaboratore di turno assume le funzioni operative fino all’arrivo dei soccorsi.</p>
<h3>Schema operativo — procedure da attuare</h3>
<table class="data-table" style="width:100%;border-collapse:collapse;font-size:9.5pt;margin:0.55rem 0;">
  <thead>
    <tr>
      <th style="border:1px solid #333;padding:0.28rem;width:22%;">Scenario</th>
      <th style="border:1px solid #333;padding:0.28rem;">Azioni immediate (ordine logico)</th>
      <th style="border:1px solid #333;padding:0.28rem;width:18%;">Responsabile</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Sincope / malessere</td>
      <td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Mettere in sicurezza il paziente (posizione supina, gambe sollevate ove indicato); valutare coscienza e respirazione; liberare vie aeree; ossigeno se disponibile e indicato; monitoraggio; <strong>118</strong> se instabilità o perdita coscienza prolungata.</td>
      <td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Titolare / operatore di turno</td>
    </tr>
    <tr>
      <td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Emorragia importante</td>
      <td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Compressione diretta; posizione anti-shock se indicata; DPI; smaltimento materiali contaminati; <strong>118</strong> se non controllabile.</td>
      <td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Titolare / operatore di turno</td>
    </tr>
    <tr>
      <td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Dolore toracico / sospetto evento cardiaco</td>
      <td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Paziente a riposo, ossigeno se previsto, <strong>118</strong> immediato; preparazione eventuale DAE se disponibile e personale formato.</td>
      <td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Titolare / operatore di turno</td>
    </tr>
    <tr>
      <td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Arresto cardiaco</td>
      <td style="border:1px solid #333;padding:0.3rem;vertical-align:top;"><strong>118</strong>; BLSD se competenza certificata; DAE se presente e accessibile; continuità fino a delega al 118.</td>
      <td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Personale formato BLSD</td>
    </tr>
    <tr>
      <td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Reazione allergica grave</td>
      <td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Posizione sicura, rimozione allergene ove possibile, ossigeno, farmaci di emergenza solo se legalmente disponibili e prescritti, <strong>118</strong>.</td>
      <td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Titolare</td>
    </tr>
    <tr>
      <td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Crisi convulsiva</td>
      <td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Proteggere da traumi, non forzare bocca, cronometrare durata, <strong>118</strong> se prima crisi, prolungata o stato post-critico anomalo.</td>
      <td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Titolare / operatore di turno</td>
    </tr>
    <tr>
      <td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Incidente strumentale / trauma</td>
      <td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Sicurezza scena, emostasi, valutazione lesioni, <strong>118</strong> se necessario; registrazione evento avverso / near miss.</td>
      <td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Titolare</td>
    </tr>
  </tbody>
</table>
<h3>Numeri e contatti</h3>
<p>Emergenza sanitaria <strong>118</strong>; emergenza generica <strong>112</strong>. Indirizzo completo da comunicare al centralinista: <strong>${c.address}</strong>. Elenco interno di reperibilità (titolare / collaboratori) esposto in sala operatoria o custodito in copia cartacea.</p>
<h3>Dotazioni, verifiche e formazione</h3>
<p>Cassetta primo soccorso, presidi emostatici, ossigeno se adottato secondo normativa, DAE se presente con scadenze verificate. Estintori e vie di esodo conformi al documento antincendio (doc. 14). Formazione BLSD / primo soccorso documentata nel fascicolo personale.</p>
<h3>Evacuazione</h3>
<p>Percorsi preferenziali segnalati, accompagnamento pazienti con ridotta autonomia, punto di raccolta esterno. Non usare ascensori in incendio. Dopo evacuazione, comunicazione alle autorità secondo procedure edificio.</p>
`;
}

export function protocolloIsolamentoEstesoBlock(c: BodyContext): string {
  return `
<h2>Protocollo operativo per pazienti con patologie contagiose o potenzialmente tali</h2>
<p>La struttura <strong>${c.studioName}</strong> applica un <strong>piano documentato</strong> per ridurre il rischio di trasmissione crociata, integrando precauzioni standard, valutazione del paziente e misure aggiuntive quando il quadro clinico-epidemiologico lo richiede.</p>
<h3>Campo di applicazione</h3>
<p>Il protocollo si applica a <strong>tutti i pazienti</strong> che accedono a <strong>${c.studioName}</strong> per prestazioni ambulatoriali, inclusi accompagnatori ove presenti, e a tutto il <strong>personale</strong> che entra in contatto con pazienti, fluidi biologici o superfici contaminate. Si applica in aggiunta alle norme generali di biosicurezza e sterilizzazione strumentale.</p>
<h3>Definizioni (uso interno)</h3>
<ul>
<li><strong>Precauzioni standard:</strong> misure basate sul principio che ogni paziente può portare agenti trasmissibili; si applicano sistematicamente (igiene delle mani, DPI per contatto con sangue/liquidi biologici, gestione strumenti e superfici).</li>
<li><strong>Precauzioni aggiuntive (gocce / airborne / contatto):</strong> misure supplementari attivate in base a sospetta o nota patologia trasmissibile e alle indicazioni delle autorità sanitarie.</li>
<li><strong>Differimento della prestazione:</strong> rinvio programmato di attività non urgenti quando sintomi o anamnesi suggeriscono rischio di contagiosità fino a chiarimento clinico o guarigione.</li>
</ul>
<h3>Valutazione iniziale e percorso decisionale</h3>
<p>All’accettazione: anamnesi su sintomi respiratori, febbre, esantemi, diarrea acuta, note di contatto con malattie trasmissibili, terapie in corso. In base all’esito: <strong>(a)</strong> procedere con precauzioni standard; <strong>(b)</strong> intensificare DPI e aerazione; <strong>(c)</strong> differire prestazione non urgente e fornire indicazioni al paziente; <strong>(d)</strong> segnalazione a ATS/Igiene pubblica quando obbligatoria.</p>
<h3>Precauzioni standard — dettaglio operativo</h3>
<ul>
<li><strong>Igiene delle mani:</strong> prima e dopo ogni contatto paziente, dopo tolto i guanti, dopo contatto con superfici potenzialmente contaminate.</li>
<li><strong>DPI:</strong> guanti monouso per contatti con mucose/sangue; mascherina chirurgica e occhiali o visiera quando si prevedono schizzi; camice o divisa dedicata.</li>
<li><strong>Superfici e strumenti:</strong> disinfezione delle superfici tra un paziente e l’altro secondo prodotti e tempi di contatto registrati; sterilizzazione strumentale in circuito dedicato.</li>
<li><strong>Aerazione:</strong> ricambio d’aria naturale o meccanico nelle sale dopo procedure che generano aerosol ove possibile.</li>
</ul>
<h3>Note per categorie indicative di rischio</h3>
<p>Le misure specifiche (DPI aggiuntivi, sale dedicate o fine turno, differimento) seguono <strong>linee guida nazionali/regionali</strong> e circolari vigenti per patologie respiratorie ad alta diffusione, malattie a trasmissione ematica, tubercolosi, esantemi, diarree acute in contesto epidemico. Il titolare aggiorna il protocollo quando le autorità pubblicano nuove raccomandazioni.</p>
<h3>Comunicazioni e registrazione</h3>
<p>Flussi verso ATS / Igiene e sanità pubblica quando obbligatori; nota interna su differimenti o segnalazioni con data e motivazione. Documentazione conservata nel fascicolo qualità.</p>
<h3>Formazione</h3>
<p>Aggiornamento periodico del personale su protocollo, uso DPI e circolari applicabili.</p>
<h3>Sintesi locali dichiarati</h3>
${c.premisesSectionHtml}
`;
}
