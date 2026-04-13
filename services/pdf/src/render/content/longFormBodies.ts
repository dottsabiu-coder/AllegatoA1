import type { ResolvedDocument } from "@allegato-a1/shared";
import { escapeHtml } from "../escape.js";
import type { BodyContext } from "./contextBuilder.js";
import { insuranceAdhesionFormBlock } from "./blocksForms.js";
import { intestazioneRequisitoSpecifico } from "./normativePreamble.js";
import { customerSatisfactionQuestionnaireBlock } from "./teresi/teresiShared.js";

type TechnicalSpec = {
  label: string;
  matter: string;
  laws: string;
  /** Parte generale sul requisito (prima dei dati della struttura), stile FT. */
  generalHtml: string;
};

/** Blocco “documentazione tecnica” allineato allo stile del modulo ALL. A1 (requisiti 1A.03.05.xx). */
export function technicalComplianceBlock(c: BodyContext, doc: ResolvedDocument, spec: TechnicalSpec): string {
  const { matter, laws, label, generalHtml } = spec;
  return (
    intestazioneRequisitoSpecifico(doc.code, label) +
    `<h2>Parte generale — ${escapeHtml(label)}</h2>` +
    generalHtml +
    `<h2>Attestazione documentale e ambito probatorio</h2>
<p>L’obiettivo è attestare, in forma organica e verificabile, che la tipologia di attività svolta è supportata da <strong>documentazione tecnica</strong> coerente con la materia di <em>${escapeHtml(matter)}</em>, con riferimento ai principali dettami normativi applicabili in via generale: ${laws}. Le indicazioni che seguono hanno valore di quadro descrittivo e operativo; certificati, verbali di collaudo, pratiche VVF, relazioni specialistiche e allegati restano acquisiti nel fascicolo fisico o digitale della struttura.</p>

<h2>1. Descrizione della struttura e dei locali</h2>
<p>La struttura opera nei locali di cui all’indirizzo sopra indicato. Le caratteristiche planimetriche e funzionali, nel limite dei dati raccolti tramite il gestionale, sono sintetizzate come segue:</p>
${c.premisesSectionHtml}
<p>Il titolare si impegna a mantenere idonee le condizioni strutturali e impiantistiche rispetto alle prescrizioni vigenti per la specifica attività professionale svolta e a conservare la documentazione tecnica di progetto, asseverazioni e aggiornamenti quando richiesti dalla normativa settoriale o dagli enti di controllo.</p>

<h2>2. Risorse umane e responsabilità</h2>
<p>Per la corretta gestione delle misure richiamate dalla materia oggetto del presente allegato, la struttura definisce ruoli e responsabilità. Il titolare coordina l’osservanza delle procedure e la conservazione della documentazione; il personale collabora all’applicazione delle istruzioni operative e alla segnalazione di anomalie.</p>
${c.staffSectionHtml}

<h2>3. Attrezzature, impianti e manutenzione</h2>
<p>Per evitare duplicazioni nel fascicolo, l’inventario delle apparecchiature è documentato nel <strong>documento n. 10</strong>, il piano di manutenzione e le <strong>verifiche periodiche</strong> nel <strong>documento n. 11</strong>, la documentazione tecnica di fabbrica nel <strong>documento n. 12</strong>. Manuali, certificati, rapportini e registri di intervento restano acquisiti in sede e sono esibiti al GdV su richiesta.</p>

<h2>4. Fornitori, consulenze e servizi esterni</h2>
<p>Per attività per le quali è previsto il coinvolgimento di soggetti terzi (consulenze, smaltimenti, manutenzioni specialistiche), la struttura tiene traccia dei riferimenti essenziali:</p>
${c.externalSectionHtml}

<h2>5. Sistema di verifica, aggiornamento e miglioramento</h2>
<p>La struttura adotta un approccio sistematico alla verifica del rispetto dei requisiti: revisione periodica della documentazione, aggiornamento a seguito di modifiche edilizie, impiantistiche o organizzative, formazione del personale e analisi delle non conformità rilevate in sede di audit interno o ispezioni. Ogni variazione sostanziale viene registrata e comunicata secondo i flussi previsti dalla normativa sanitaria e amministrativa regionale.</p>
<ul>
<li>Verifica annuale (o con diversa periodicità se imposta da norma specifica) dell’adeguatezza degli elaborati tecnici.</li>
<li>Aggiornamento del presente fascicolo in caso di ristrutturazioni, sostituzione di apparecchiature, cambio di fornitore di servizi critici.</li>
<li>Archiviazione ordinata degli atti probatori (verbali, certificati, relazioni) per la consultazione del Gruppo di Valutazione.</li>
</ul>

<h2>6. Conclusioni</h2>
<p>Il documento costituisce la dichiarazione organizzativa e tecnica della struttura <strong>${c.studioName}</strong> in relazione al requisito <strong>${escapeHtml(doc.code)}</strong>, con l’intesa che la completezza probatoria finale dipende anche dalla documentazione specialistica allegata e dalla conformità effettiva dei locali e degli impianti al momento della visita di accreditamento / verifica.</p>
`
  );
}

export function ionizingLong(c: BodyContext, doc: ResolvedDocument): string {
  return (
    intestazioneRequisitoSpecifico(doc.code, "Protezione da radiazioni ionizzanti — non applicabilità") +
    `<h2>Parte generale — radioprotezione</h2>
<p>La normativa in materia di radiazioni ionizzanti (D.Lgs. 101/2020 e provvedimenti applicativi) impone, ove presenti sorgenti o apparecchiature radiogene, un sistema documentato di <strong>autorizzazioni</strong>, <strong>valutazioni di sicurezza</strong>, <strong>formazione</strong>, <strong>controlli di qualità</strong> e <strong>gestione delle aree</strong> controllate o sorvegliate.</p>
<p>Il Manuale OTA e le indicazioni regionali per le strutture monopresidio richiedono che la documentazione sia <strong>coerente con l’inventario effettivo</strong> delle apparecchiature e che ogni modifica impiantistica o sostitutiva determini l’aggiornamento del fascicolo.</p>
<h2>Situazione dichiarata dalla struttura</h2>
<p>La struttura <strong>${c.studioName}</strong> dichiara, in relazione al requisito <strong>${escapeHtml(doc.code)}</strong>, l’<strong>assenza di apparecchiature emittenti radiazioni ionizzanti</strong> o l’<strong>irrilevanza</strong> delle stesse rispetto all’assetto tecnico attuale. Sede operativa: <strong>${c.address}</strong>.</p>
<h2>Conseguenze in termini di adempimenti</h2>
<p>In assenza di apparecchiature radiogene, non si applicano gli adempimenti tipici del caso (piano di protezione radiologica strutturato, incarichi specialistici per installazioni diagnostiche, ecc.). Resta fermo l’obbligo di <strong>aggiornare la presente dichiarazione</strong> qualora la struttura introduca in futuro dispositivi soggetti a disciplina di radioprotezione.</p>
<h2>Impegni e tracciabilità</h2>
<ul>
<li>Monitoraggio delle modifiche tecnologiche che possano integrare sorgenti di radiazioni ionizzanti.</li>
<li>Conservazione della presente attestazione nel fascicolo Allegato A1 e allineamento alla revisione <strong>${c.revision}</strong>.</li>
<li>Verifica periodica in sede di riesame del sistema qualità / rischi.</li>
</ul>` +
    sharedClosing(c)
  );
}

export function gasLong(c: BodyContext, doc: ResolvedDocument): string {
  return (
    intestazioneRequisitoSpecifico(doc.code, "Impianti di distribuzione gas medicali — non applicabilità") +
    `<p>Per il requisito <strong>${escapeHtml(doc.code)}</strong> la struttura dichiara la <strong>non applicabilità</strong> dell’impianto di distribuzione centralizzato di gas medicali rispetto alle attività svolte.</p>` +
    sharedClosing(c)
  );
}

export function internsLong(c: BodyContext, doc: ResolvedDocument): string {
  return (
    intestazioneRequisitoSpecifico(
      doc.code,
      "Identificazione tirocinanti e percorsi formativi — assenza al momento"
    ) +
    `<h2>Parte generale — identificazione e tracciabilità</h2>
<p>Il requisito mira a garantire che ogni soggetto che entri nel percorso assistenziale in veste formativa sia <strong>identificabile</strong>, <strong>autorizzato</strong>, <strong>coperto</strong> da assicurazioni e accordi con l’ente di provenienza, e <strong>formato</strong> su privacy, sicurezza e limiti operativi.</p>
<p>La documentazione tipica include: convenzione o protocollo con università / scuole, <strong>registro presenze</strong>, designazione del <strong>tutor</strong>, estremi anagrafici, limitazioni alle attività cliniche, DPI e vaccinazioni ove richieste.</p>
<h2>Situazione dichiarata dalla struttura</h2>
<p>La struttura <strong>${c.studioName}</strong> dichiara che <strong>non ospita al momento tirocinanti o percorsi formativi</strong> che richiedano identificazione e tracciabilità aggiuntiva oltre al personale strutturale già censito negli altri documenti dell’Allegato A1.</p>
<h2>Impegni in caso di futuro ingresso di tirocinanti</h2>
<ul>
<li>Identificazione formale, convenzione con ente formativo, coperture assicurative e trattamento privacy conforme.</li>
<li>Registro presenze e attività, limitazioni operative supervisionate dal titolare o tutor designato.</li>
<li>Aggiornamento del presente allegato e revisione <strong>${c.revision}</strong> prima delle visite del GdV.</li>
</ul>` +
    sharedClosing(c)
  );
}

/** Documento 23 — dichiarazione di non detenzione di materiali esplodenti (studio odontoiatrico). */
export function explosivesNotApplicableBlock(c: BodyContext, doc: ResolvedDocument): string {
  return (
    intestazioneRequisitoSpecifico(doc.code, "Materiali esplodenti — non detenzione") +
    `<h2>Situazione dichiarata</h2>
<p>La struttura dichiara di <strong>non detenere materiali esplodenti</strong> né sostanze assimilabili che richiedano autorizzazioni ex normativa sugli esplosivi, nell’ambito dell’ordinario esercizio professionale. Qualsiasi futura detenzione comporta l’aggiornamento del fascicolo e gli adempimenti di legge.</p>` +
    sharedClosing(c)
  );
}

/** Modello documento 1 allineato al testo del modulo di riferimento (studio Teresi / 12_Mod. ALL. A1). */
export function doc01Organization(c: BodyContext): string {
  return (
    intestazioneRequisitoSpecifico("1A.01.03.01", "Organizzazione e politiche di gestione delle risorse") +
    `
<p>Il presente documento descritto è un <strong>Piano di Organizzazione e Gestione delle Risorse (POG-R)</strong> o un <strong>Piano di Gestione dei Servizi</strong>, che definisce le politiche, i processi e la struttura organizzativa per l’uso efficiente delle risorse e include un’analisi dei processi per identificare i punti deboli e i possibili disservizi di <strong>${c.studioName}</strong>.</p>
<p>L’obiettivo è garantire un’organizzazione ottimale e prevenire problemi operativi, spesso attraverso l’analisi dei rischi e l’implementazione di procedure di controllo interno.</p>

<h2>Funzioni e scopi del documento</h2>
<ul>
<li><strong>Definizione dell’organizzazione:</strong> descrive la struttura organizzativa, i ruoli e le responsabilità per la gestione delle risorse.</li>
<li><strong>Politiche di gestione:</strong> stabilisce le regole e i principi che guidano l’uso delle risorse (finanziarie, umane e materiali).</li>
<li><strong>Analisi dei processi:</strong> mappa i processi aziendali per identificare le fasi critiche in cui potrebbero verificarsi disservizi, errori o inefficienze.</li>
<li><strong>Prevenzione dei disservizi:</strong> individua le criticità e implementa azioni correttive o preventive per mitigare i rischi e garantire la continuità dei servizi.</li>
<li><strong>Controllo interno:</strong> supporta l’implementazione di un sistema di controllo interno per assicurare la conformità alle procedure e la salvaguardia delle risorse.</li>
<li><strong>Base documentale:</strong> fornisce una base documentale utilizzabile per la formazione, la revisione e il miglioramento continuo delle operazioni.</li>
</ul>

<h2>Contenuti tipici</h2>
<ul>
<li><strong>Mappatura dei processi:</strong> descrizione dettagliata delle attività e delle interazioni tra le diverse unità organizzative.</li>
<li><strong>Analisi dei rischi:</strong> identificazione dei rischi associati a ogni fase del processo e valutazione di probabilità e impatto.</li>
<li><strong>Piani di mitigazione:</strong> misure preventive e correttive per ridurre i rischi.</li>
<li><strong>Indicatori di performance:</strong> definizione degli indicatori chiave per monitorare efficienza ed efficacia dei processi.</li>
<li><strong>Procedure operative standard:</strong> istruzioni dettagliate su come svolgere le attività operative.</li>
</ul>

<h2>Documento organizzativo e di gestione delle risorse</h2>
<p><strong>${c.studioName}</strong> — <strong>${c.address}</strong>. Titolare: <strong>${c.ownerName}</strong> (P.IVA / C.F. <strong>${c.vat}</strong>).</p>
${c.openingLine}

<h2>1. Scopo del documento</h2>
<p>Il presente documento ha l’obiettivo di definire e rendere esplicita l’organizzazione interna dello studio odontoiatrico e le politiche adottate per la gestione delle risorse (umane, materiali e tecnologiche). Analizza i principali processi operativi per individuare eventuali fasi critiche in cui possono verificarsi disservizi, al fine di prevenirli e garantire un servizio di qualità e in sicurezza per i pazienti.</p>

<h2>2. Struttura organizzativa dello studio</h2>
<h3>2.1 Personale e ruoli (modello tipico)</h3>
<ul>
<li><strong>Responsabile sanitario / titolare:</strong> coordinamento generale, supervisione clinica e gestionale.</li>
<li><strong>Odontoiatri collaboratori:</strong> esecuzione dei trattamenti e presa in carico dei pazienti.</li>
<li><strong>Igienisti dentali:</strong> prevenzione, educazione e igiene orale.</li>
<li><strong>Assistenti alla poltrona (ASO):</strong> supporto clinico e logistico alle attività odontoiatriche.</li>
<li><strong>Personale amministrativo:</strong> accoglienza, gestione appuntamenti, documentazione, fatturazione.</li>
</ul>
<p>Elenco del personale e dei collaboratori dichiarati nel gestionale:</p>
${c.staffSectionHtml}

<h3>2.2 Comunicazione interna</h3>
<ul>
<li>Riunioni periodiche di coordinamento (mensili o bimestrali).</li>
<li>Uso di software gestionale per la condivisione di informazioni cliniche e organizzative.</li>
<li>Canali interni di comunicazione digitale (e-mail, agenda condivisa, ove adottati).</li>
</ul>

<h2>3. Politiche di gestione delle risorse</h2>
<h3>3.1 Risorse umane</h3>
<ul>
<li>Aggiornamento continuo e formazione obbligatoria (corsi ECM, formazione ASO).</li>
<li>Affiancamento e formazione on-the-job per nuovo personale.</li>
<li>Verifica periodica delle competenze e colloqui di feedback.</li>
</ul>
<h3>3.2 Risorse materiali e tecnologiche</h3>
<ul>
<li>Manutenzione periodica delle attrezzature odontoiatriche secondo calendario prestabilito.</li>
<li>Controllo di scorte e materiali sanitari (inventario automatico o manuale).</li>
<li>Adozione di software gestionali aggiornati per appuntamenti, cartelle cliniche e amministrazione.</li>
</ul>
<h3>3.3 Sicurezza e igiene</h3>
<ul>
<li>Adozione dei protocolli di sterilizzazione e sanificazione secondo normative vigenti.</li>
<li>Formazione del personale in materia di sicurezza sul lavoro e gestione emergenze.</li>
<li>Verifica periodica del rispetto delle normative igienico-sanitarie.</li>
</ul>

<h2>4. Analisi dei processi e delle fasi critiche</h2>
<p>L’analisi dei principali processi permette di individuare punti di rischio e prevenire i disservizi. Di seguito una tabella riepilogativa:</p>
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
<td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Accoglienza del paziente</td>
<td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Prenotazione, accettazione</td>
<td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Errori agenda, attese prolungate</td>
<td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Software gestionale, promemoria automatici, conferma telefonica</td>
</tr>
<tr>
<td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Trattamento clinico</td>
<td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Diagnosi, esecuzione terapia</td>
<td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Errori clinici, strumentazione non disponibile</td>
<td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Check-list, formazione continua, protocolli clinici</td>
</tr>
<tr>
<td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Sterilizzazione strumenti</td>
<td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Pulizia, imbustamento, gestione autoclave</td>
<td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Contaminazione, malfunzionamento</td>
<td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Manutenzione periodica, tracciabilità sterilizzazione</td>
</tr>
<tr>
<td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Gestione amministrativa</td>
<td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Fatturazione, archiviazione</td>
<td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Errori documentali, perdita dati</td>
<td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Backup, digitalizzazione documenti, formazione amministrativi</td>
</tr>
<tr>
<td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Comunicazione con pazienti</td>
<td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Informazioni pre/post trattamento, follow-up</td>
<td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Mancanza di informazioni, appuntamenti dimenticati</td>
<td style="border:1px solid #333;padding:0.3rem;vertical-align:top;">Promemoria SMS/e-mail, materiale informativo standard</td>
</tr>
</tbody>
</table>

<h2>5. Monitoraggio e miglioramento continuo</h2>
<p>Lo studio si impegna in un processo continuo di miglioramento della qualità attraverso:</p>
<ul>
<li>raccolta del feedback da parte dei pazienti (questionari cartacei o digitali);</li>
<li>audit interni periodici per la verifica del rispetto delle procedure;</li>
<li>revisione degli eventi critici, analisi delle cause e implementazione di azioni correttive;</li>
<li>aggiornamento dei protocolli interni in base alle normative vigenti e ai risultati delle verifiche.</li>
</ul>
<p>Riferimento revisione documentale: <strong>${c.revision}</strong>.</p>

<h2>6. Conclusioni</h2>
<p>Una gestione strutturata ed efficiente delle risorse è essenziale per garantire la qualità del servizio odontoiatrico offerto ai pazienti. Il presente documento costituisce una guida pratica per il personale, promuovendo qualità, sicurezza e miglioramento continuo in ogni area dello studio.</p>
`
  );
}

/**
 * Documento 5 — erogazione dell’assistenza (modello Teresi / 12_Mod. ALL. A1), con tabella mensile disservizi.
 */
export function doc05ErogazioneAssistenzaTeresi(c: BodyContext, doc: ResolvedDocument): string {
  return (
    intestazioneRequisitoSpecifico(doc.code, doc.title) +
    `
<p>La presente procedura ha lo scopo di descrivere in modo chiaro e uniforme le modalità di erogazione dell’assistenza odontoiatrica presso <strong>${c.studioName}</strong>, garantendo qualità, sicurezza del paziente e conformità alle normative vigenti (D.Lgs. 81/08, GDPR, normative sanitarie regionali, linee guida del Ministero della Salute).</p>

<h2>1. Campo di applicazione</h2>
<p>La procedura si applica a tutte le attività cliniche e assistenziali erogate all’interno dello studio odontoiatrico, comprese:</p>
<ul>
<li>visite odontoiatriche e diagnostiche;</li>
<li>trattamenti terapeutici e chirurgici;</li>
<li>prestazioni igienico-preventive;</li>
<li>gestione delle urgenze odontoiatriche.</li>
</ul>

<h2>2. Riferimenti normativi</h2>
<ul>
<li>D.Lgs. 81/2008 – Sicurezza nei luoghi di lavoro;</li>
<li>Regolamento UE 2016/679 (GDPR) – Protezione dei dati personali;</li>
<li>linee guida del Ministero della Salute per la sicurezza del paziente odontoiatrico;</li>
<li>Codice deontologico degli odontoiatri.</li>
</ul>

<h2>3. Responsabilità</h2>
<ul>
<li><strong>Titolare:</strong> supervisione generale del processo assistenziale, esecuzione delle prestazioni cliniche, diagnosi, trattamento, consenso informato, gestione strumenti, disinfezione e sterilizzazione, gestione accettazione, anagrafica, appuntamenti, privacy.</li>
</ul>

<h2>4. Descrizione della procedura</h2>
<h3>4.1 Accoglienza e accettazione del paziente</h3>
<ol>
<li>Il paziente viene accolto dal titolare dello studio o da eventuale personale amministrativo.</li>
<li>Vengono registrati i dati anagrafici e acquisiti i consensi informati (privacy e trattamento sanitario).</li>
<li>Viene fissato o confermato l’appuntamento con l’odontoiatra.</li>
</ol>
<h3>4.2 Valutazione clinica e piano di trattamento</h3>
<ol>
<li>L’odontoiatra effettua l’anamnesi generale e odontoiatrica.</li>
<li>Si procede con l’esame del paziente.</li>
<li>Viene elaborato un piano di trattamento personalizzato, discusso e approvato dal paziente mediante consenso informato scritto.</li>
</ol>
<h3>4.3 Erogazione della prestazione odontoiatrica</h3>
<ol>
<li>Il titolare verifica pulizia, sterilità e funzionamento delle attrezzature.</li>
<li>L’odontoiatra esegue la prestazione secondo protocolli clinici e linee guida.</li>
<li>Durante la seduta vengono rispettate le procedure di sicurezza e prevenzione del rischio biologico (DPI, gestione rifiuti sanitari, disinfezione).</li>
<li>Al termine, il titolare provvede alla detersione, disinfezione e sterilizzazione degli strumenti utilizzati.</li>
</ol>
<h3>4.4 Follow-up e monitoraggio</h3>
<ol>
<li>Al termine della prestazione, vengono fornite al paziente le indicazioni post-operatorie o di mantenimento.</li>
<li>Si pianificano eventuali controlli successivi.</li>
<li>I dati clinici vengono registrati nella cartella odontoiatrica elettronica o cartacea.</li>
</ol>

<h2>5. Gestione delle urgenze</h2>
<p>Le urgenze odontoiatriche vengono gestite con priorità.</p>
<ol>
<li>Il paziente viene identificato e valutato rapidamente.</li>
<li>L’odontoiatra stabilisce la priorità e la tipologia di intervento.</li>
<li>Dopo la prestazione, viene programmato il follow-up per la risoluzione definitiva.</li>
</ol>

<h2>6. Sicurezza e igiene</h2>
<ul>
<li>Tutti gli ambienti vengono sanificati secondo protocolli giornalieri e tra un paziente e l’altro.</li>
<li>Gli strumenti vengono sterilizzati in autoclave e tracciati mediante sistema di controllo.</li>
<li>Vengono rispettati i protocolli di prevenzione del rischio infettivo (HBV, HCV, HIV, COVID-19, ecc.).</li>
</ul>

<h2>7. Documentazione e registrazioni</h2>
<p>Le seguenti registrazioni devono essere mantenute:</p>
<ul>
<li>schede anagrafiche e cliniche dei pazienti;</li>
<li>consensi informati;</li>
<li>registri di sterilizzazione;</li>
<li>piani di manutenzione apparecchiature;</li>
<li>registro smaltimento rifiuti sanitari.</li>
</ul>

<h2>8. Miglioramento continuo</h2>
<p>Il titolare valuta periodicamente:</p>
<ul>
<li>soddisfazione del paziente;</li>
<li>non conformità e segnalazioni;</li>
<li>aggiornamenti scientifici e normativi;</li>
<li>necessità di formazione del personale.</li>
</ul>
<p>Eventuali azioni correttive o preventive vengono pianificate e documentate.</p>

<h2>Tabella riepilogativa mensile dei disservizi</h2>
<p>Mensilmente è prevista la revisione di una tabella riepilogativa contenente i disservizi riscontrati all’interno dello studio odontoiatrico, al fine di effettuare un’analisi statistica degli stessi, finalizzata alla predisposizione di eventuali azioni di indagine e intervento.</p>
<table class="data-table" style="width:100%;border-collapse:collapse;font-size:9pt;margin:0.6rem 0;">
<thead>
<tr>
<th style="border:1px solid #333;padding:0.28rem;">Descrizione</th>
<th style="border:1px solid #333;padding:0.28rem;width:12%;">Mese</th>
<th style="border:1px solid #333;padding:0.28rem;width:10%;">N. eventi</th>
<th style="border:1px solid #333;padding:0.28rem;width:26%;" colspan="3">Rispetto al mese precedente</th>
</tr>
<tr>
<th style="border:1px solid #333;padding:0.2rem;"></th>
<th style="border:1px solid #333;padding:0.2rem;"></th>
<th style="border:1px solid #333;padding:0.2rem;"></th>
<th style="border:1px solid #333;padding:0.2rem;">Diminuiti</th>
<th style="border:1px solid #333;padding:0.2rem;">Inalterati</th>
<th style="border:1px solid #333;padding:0.2rem;">Aumentati</th>
</tr>
</thead>
<tbody>
${[
      "Disservizi dovuti a fuori uso attrezzature",
      "Ritardi erogazione prestazioni dovuti a indisponibilità personale di studio",
      "Appuntamenti non rispettati da parte del pubblico giustificati",
      "Appuntamenti non rispettati per insufficiente comunicazione e/o chiarezza da parte della segreteria",
      "Disservizi dovuti a guasti impianti",
      "Disservizi dovuti a guasti/indisponibilità sistema informatico",
    ]
      .map(
        (label) => `<tr>
<td style="border:1px solid #333;padding:0.28rem;vertical-align:top;">${escapeHtml(label)}</td>
<td style="border:1px solid #333;padding:0.28rem;">&nbsp;</td>
<td style="border:1px solid #333;padding:0.28rem;">&nbsp;</td>
<td style="border:1px solid #333;padding:0.28rem;">&nbsp;</td>
<td style="border:1px solid #333;padding:0.28rem;">&nbsp;</td>
<td style="border:1px solid #333;padding:0.28rem;">&nbsp;</td>
</tr>`
      )
      .join("")}
</tbody>
</table>
` +
    sharedClosing(c)
  );
}

export function doc02PrivacyInfo(c: BodyContext): string {
  return (
    intestazioneRequisitoSpecifico("1A.01.04.01", "Documentazione inerente il sistema informativo") +
    `
<h2>Premessa estesa sul trattamento dei dati e sul sistema informativo</h2>
<p>Il Codice e il Regolamento (UE) 2016/679 impongono principi stringenti (liceità, correttezza, trasparenza, minimizzazione, limitazione della conservazione, integrità e riservatezza). Le violazioni possono avere rilevanza anche penale e amministrativa. La struttura <strong>${c.studioName}</strong>, con sede in <strong>${c.address}</strong>, tratta dati particolari (salute) nel contesto dell’attività sanitaria; il <strong>titolare del trattamento</strong> è il professionista che esercita l’attività (<strong>${c.ownerName}</strong>), salvo diversa struttura giuridica documentata.</p>
<p>Il documento definisce, in forma organica: <strong>(i)</strong> le risorse da proteggere; <strong>(ii)</strong> i trattamenti svolti; <strong>(iii)</strong> la distribuzione dei compiti; <strong>(iv)</strong> l’analisi dei rischi per minacce e vulnerabilità; <strong>(v)</strong> il piano di misure fisiche, logiche e organizzative; <strong>(vi)</strong> il piano di verifiche periodiche; <strong>(vii)</strong> il piano di formazione degli incaricati. Le schede dettagliate possono essere replicate per ogni postazione come negli allegati estesi di riferimento.</p>
${c.openingLine}

<h2>1. Ambito, basi giuridiche e finalità</h2>
<p>Finalità: diagnosi e cura, gestione amministrativa e contabile, adempimenti di legge, gestione qualità e reclami, tutela in giudizio. I trattamenti avvengono con strumenti elettronici e, ove necessario, cartacei. Le basi giuridiche includono <strong>esecuzione del contratto</strong> (prestazione sanitaria), <strong>obblighi legali</strong>, <strong>consenso</strong> ove richiesto per finalità specifiche, e <strong>legittimo interesse</strong> proporzionato ove applicabile (es. difesa giudiziaria, sicurezza dei sistemi).</p>

<h2>1.1 Categorie di dati, destinatari e conservazione</h2>
<p>Sono trattati dati <strong>identificativi</strong>, <strong>contatto</strong>, <strong>sanitari</strong> (cartella clinica, immagini, consensi), <strong>amministrativi e di pagamento</strong> ove presenti. I destinatari possono includere: laboratori, consulenti, compagnie assicurative per sinistri, fornitori di servizi informatici con nomina a responsabile del trattamento o accordi contrattuali equivalenti, autorità quando obbligatorio. I tempi di conservazione rispettano la normativa sanitaria, civilistica e fiscale; i criteri di cancellazione / anonimizzazione sono definiti nella policy interna.</p>

<h2>1.2 Diritti degli interessati e modalità di esercizio</h2>
<p>Gli interessati possono esercitare i diritti di cui agli artt. 15–22 del GDPR (accesso, rettifica, cancellazione ove applicabile, limitazione, portabilità dei dati forniti contrattualmente, opposizione ove prevista) rivolgendosi al titolare ai recapiti dello studio. È possibile proporre reclamo al Garante per la protezione dei dati personali. Le richieste sono evase nei termini di legge e registrate ove utile alla tracciabilità.</p>

<h2>2. Software applicativi e piattaforme (dati dichiarati nel gestionale)</h2>
${c.itProfileSectionHtml}

<h2>3. Hardware, periferiche e postazioni di lavoro</h2>
<p>Di seguito l’elenco delle <strong>periferiche hardware</strong> e delle postazioni di lavoro (in particolare <strong>PC fissi o portatili</strong>, con <strong>marca</strong>, <strong>modello</strong> e <strong>matricola o numero di serie</strong>), distinto dalle attrezzature odontoiatriche cliniche censite negli altri allegati tecnici:</p>
${c.peripheralsSectionHtml}

<h2>4. Accessi logici, antivirus, firewall e continuità</h2>
<p>Account individuali, policy password, aggiornamenti di sistema, antivirus aggiornato, firewall a livello di sistema o perimetrale ove presente. Per la continuità operativa e la disponibilità dei dati si fa riferimento alla modalità di backup dichiarata al §2 e alle misure ridondanti eventualmente in uso (UPS, gruppi di continuità).</p>

<h2>5. Backup, conservazione e disaster recovery (logica)</h2>
<p>La strategia di backup (completa, incrementale, differenziale, cloud cifrato, NAS locale, rotazione supporti) deve garantire ripristino testato. Conservazione secondo tempi previsti da normativa sanitaria e fiscale. Piano di ripristino in caso di incidente (hardware, ransomware, errore umano) con tempi massimi di indisponibilità accettabili definiti internamente.</p>

<h2>6. Analisi dei rischi (sintesi metodologica)</h2>
<p>Valutazione di minacce (accessi non autorizzati, furto, malware, insider, perdita supporti) e vulnerabilità (password deboli, assenza aggiornamenti, backup non verificati). Per ciascun rischio: probabilità, impatto, misure esistenti, misure residue, responsabile del trattamento / incaricati. La sintesi operativa inserita tramite il gestionale compare nel paragrafo dedicato al sistema informativo; il dettaglio matriciale può essere allegato.</p>

<h2>7. Ruoli, incaricati e formazione</h2>
<p>Designazione degli incaricati, istruzioni scritte, formazione periodica su phishing, uso di posta e dispositivi mobili, gestione delle violazioni. Elenco personale che può accedere a dati particolari:</p>
${c.staffSectionHtml}

<h2>8. Registro trattamenti, verifiche e revisione</h2>
<p>Registro delle attività di trattamento, revisione almeno annuale o dopo cambiamenti rilevanti, test di ripristino backup, verifica log. In presenza di trattamenti ad alto rischio può essere necessaria la <strong>valutazione d’impatto (DPIA)</strong> e la <strong>nomina del DPO</strong> ove obbligatoria per legge o linee guida applicabili. Riferimento revisione documentale: <strong>${c.revision}</strong>.</p>

<h2>8.1 Violazioni dei dati personali (data breach)</h2>
<p>In caso di violazione dei dati personali, il titolare valuta il rischio per gli interessati e, ove richiesto, notifica all’autorità e comunica agli interessati secondo il GDPR. Sono documentate le cause, le misure correttive e le lezioni apprese per ridurre il rischio di recidiva.</p>

<h2>9. Conclusioni</h2>
<p>Documentazione di sistema informativo in adempimento a 1A.01.04.01; DPIA, nomina DPO o consulenza privacy specialistica se dovuti restano allegati.</p>
`
  );
}

/** Intestazione (quadro A1 + codice) per documenti 25–32. */
function leadArticulatedDoc(_c: BodyContext, code: string, titleShort: string): string {
  return intestazioneRequisitoSpecifico(code, titleShort);
}

export function doc03to07Block(
  c: BodyContext,
  doc: ResolvedDocument,
  sections: { h: string; p: string[] }[],
  options?: { appendBeforeClosing?: string; prependAfterIntestazione?: string }
): string {
  const body = sections
    .map(
      (s) =>
        `<h2>${escapeHtml(s.h)}</h2>${s.p.map((x) => `<p>${x}</p>`).join("")}`
    )
    .join("");
  const beforeClose = options?.appendBeforeClosing ?? "";
  const prepend = options?.prependAfterIntestazione ?? "";
  return (
    intestazioneRequisitoSpecifico(doc.code, doc.title) +
    prepend +
    body +
    beforeClose +
    sharedClosing(c)
  );
}

function sharedClosing(c: BodyContext): string {
  return `<p>Revisione documentale di riferimento: <strong>${c.revision}</strong>.</p>`;
}

/** Fallback se l’ordine documento non è mappato (non dovrebbe accadere per 13–24). */
export const GENERIC_TECHNICAL_SPEC: TechnicalSpec = {
  label: "Documentazione tecnica",
  matter: "requisito generico",
  laws: "normativa vigente in materia sanitaria, edilizia, impiantistica e sicurezza sul lavoro applicabile al caso concreto",
  generalHtml: `
<p>L’Allegato A1 richiede, per ciascun subcodice, <strong>documentazione tecnica immediatamente consultabile</strong>, idonea a dimostrare il possesso dei requisiti strutturali e impiantistici coerenti con l’attività dichiarata.</p>
<p>La parte generale descrive finalità e ambito; la parte successiva collega gli impegni alla struttura specifica (locali, personale, attrezzature, fornitori). Gli atti probatori (certificati, verbali, pratiche) restano allegati al fascicolo cartaceo o digitale.</p>
`,
};

const TECH_SPECS: Record<number, TechnicalSpec> = {
  13: {
    label: "Caratteristiche ambientali e accessibilità",
    matter: "caratteristiche ambientali e accessibilità",
    laws: "normativa urbanistica ed edilizia applicabile, Codice dei beni culturali ove pertinente, D.Lgs. 81/2008 per profili connessi, riferimenti regionali per l’accessibilità e l’eliminazione delle barriere",
    generalHtml: `
<p>Il presente allegato documenta le <strong>caratteristiche ambientali</strong> dei locali in cui opera la struttura e le soluzioni adottate per l’<strong>accessibilità</strong> e l’igiene ambientale, distinto dall’inventario delle apparecchiature (documento n. 10).</p>
<p><strong>Ambito:</strong> finiture, illuminazione, percorsi interni, servizi igienici per utenti e personale, segnaletica, eventuali ausili (rampe, maniglioni, porte a larghezza adeguata), rapporto con la viabilità esterna e parcheggi ove presenti.</p>
<p><strong>Documentazione attesa in sede:</strong> planimetrie aggiornate con destinazione d’uso dei locali; titoli abilitativi edilizi o certificati di agibilità; relazioni a fine lavori o relazioni tecniche per interventi rilevanti; eventuali attestazioni di conformità per eliminazione barriere (collegamento al documento n. 19 ove distinto).</p>
<p><strong>Manutenzione:</strong> programma di ordinaria manutenzione di finiture e impianti che incidono su comfort e sicurezza (es. illuminazione di emergenza se di competenza, non estintori che restano nel capitolo antincendio).</p>
`,
  },
  14: {
    label: "Protezione antincendio",
    matter: "protezione antincendio",
    laws: "D.P.R. 151/2011 e norme tecniche di prevenzione incendi, schede della attività e prescrizioni dei VVF ove applicabili, D.Lgs. 81/2008",
    generalHtml: `
<p>La struttura mantiene in sede la documentazione richiesta dalla normativa di prevenzione incendi per la tipologia di attività svolta (schede, planimetrie con vie di esodo ove richieste, dotazioni estintive, adempimenti verso i Vigili del Fuoco ove applicabili).</p>
<p>Per la <strong>manutenzione ordinaria e straordinaria dei presidi antincendio</strong> si fa riferimento al D.M. 3 luglio 2021 e s.m.i.; l’estremo della ditta manutentore, se dichiarato nel modulo, è richiamato nel fascicolo (anagrafica fornitori / documento 11).</p>
`,
  },
  15: {
    label: "Protezione acustica",
    matter: "protezione acustica",
    laws: "normativa nazionale e regionale in materia di acustica ambientale e di contenimento del rumore negli ambienti di lavoro, linee guida per strutture sanitarie di piccola dimensione",
    generalHtml: `
<p>L’acustica riguarda sia il <strong>benessere degli utenti</strong> (sale d’attesa, segreteria) sia la <strong>salute e sicurezza sul lavoro</strong> (rumore da apparecchiature, aspirazione, compressori). La valutazione può richiedere misure strumentali o stime tecniche documentate.</p>
<p>La documentazione può includere: <strong>relazioni tecniche</strong>, <strong>schede di caratterizzazione</strong> degli ambienti, <strong>piani di manutenzione</strong> delle apparecchiature rumorose e misure organizzative (turnazioni, chiusure porte, orari).</p>
<p>In assenza di superamento dei limiti, una <strong>valutazione del rischio rumore</strong> proportionata alla dimensione della struttura è comunque elemento atteso dal sistema di gestione della sicurezza.</p>
`,
  },
  16: {
    label: "Sicurezza elettrica e continuità elettrica",
    matter: "sicurezza elettrica e continuità elettrica",
    laws: "CEI 0-21 e norme di riferimento per gli impianti elettrici, verifiche periodiche, D.Lgs. 81/2008, eventuale gruppo di continuità per sistemi informatici critici",
    generalHtml: `
<p>Gli impianti elettrici devono garantire <strong>sicurezza delle persone</strong> (protezioni, messa a terra, sezionamenti) e <strong>affidabilità</strong> per apparecchiature mediche e sistemi informatici. Le verifiche periodiche (es. conformità CEI) documentano lo stato di mantenimento.</p>
<p>La <strong>continuità elettrica</strong> (UPS, gruppi elettrogeni) è rilevante quando interruzioni possono compromettere dati clinici o apparecchiature in uso; la scelta è proporzionata al rischio e alla criticità dei servizi.</p>
<p>Il fascicolo dovrebbe contenere: <strong>denuncia / certificazione impianto</strong>, <strong>verbali di verifica</strong>, <strong>schema aggiornato</strong> in caso di modifiche, contratti con ditte installatrici o manutentori.</p>
`,
  },
  17: {
    label: "Sicurezza anti-infortunistica",
    matter: "sicurezza anti-infortunistica e valutazione dei rischi",
    laws: "D.Lgs. 81/2008 e s.m.i., DVR o documentazione equivalente per la microstruttura, sorveglianza sanitaria e formazione obbligatoria",
    generalHtml: `
<p>Il Titolo IV del D.Lgs. 81/2008 impone <strong>valutazione dei rischi</strong>, misure preventive, informazione e formazione, sorveglianza sanitaria ove dovuta, e consultazione del RLS se presente. La documentazione è il supporto alla dimostrazione di un <strong>sistema di gestione effettivo</strong>, non solo formale.</p>
<p>Per la microstruttura: <strong>DVR</strong> o documento equivalente, <strong>prove di idoneità</strong> formativa, <strong>registri infortuni</strong> (anche per in itinere ove di competenza), <strong>schede sicurezza</strong> per sostanze chimiche utilizzate in ambito odontoiatrico.</p>
<p>Integrare con <strong>nomine</strong> (RSPP, medico competente se non esternalizzati), <strong>procedure</strong> per DPI, movimentazione carichi, ergonomia e stress lavoro correlato laddove rilevante.</p>
`,
  },
  18: {
    label: "Radiazioni ionizzanti",
    matter: "protezione da radiazioni ionizzanti",
    laws: "D.Lgs. 101/2020 e normativa di radioprotezione per le apparecchiature diagnostiche, linee guida del competente organo di protezione",
    generalHtml: `
<p>Qualora siano presenti apparecchiature radiogene, la struttura deve documentare: <strong>autorizzazioni</strong>, <strong>piano di protezione radiologica</strong> o documentazione equivalente, <strong>incarichi</strong> (radioprotezione, fisica medica ove richiesto), <strong>controllo di qualità</strong> e formazione del personale.</p>
<p>La documentazione deve essere <strong>coerente con l’inventario</strong> delle apparecchiature e con le <strong>aree controllate / sorvegliate</strong> ove istituite. Aggiornamenti sono obbligatori dopo sostituzione o spostamento delle apparecchiature.</p>
<p>Se la struttura non detiene apparecchiature radiogene, si utilizza la <strong>variante dichiarativa di non applicabilità</strong> (documento dedicato nel fascicolo).</p>
`,
  },
  19: {
    label: "Eliminazione barriere architettoniche",
    matter: "eliminazione delle barriere architettoniche",
    laws: "D.P.R. 503/1996 e aggiornamenti, norme tecniche per l’accessibilità, regolamenti edilizi regionali",
    generalHtml: "",
  },
  20: {
    label: "Smaltimento rifiuti",
    matter: "smaltimento dei rifiuti",
    laws: "D.Lgs. 152/2006 in materia di rifiuti sanitari, contratti con centri autorizzati, registri di carico e scarico",
    generalHtml: `
<p>La struttura ha stipulato contratto per lo smaltimento dei rifiuti sanitari con il centro autorizzato <strong>SICURAD s.r.l.</strong>, con contratto e formulari di tracciabilità conservati in sede e disponibili per il GdV.</p>
<p>I rifiuti sono classificati e segregati secondo il D.Lgs. 152/2006; il personale è formato su procedure, DPI e registrazione dei conferimenti. Ogni variazione del gestore comporta l’aggiornamento del fascicolo.</p>
`,
  },
  21: {
    label: "Condizioni microclimatiche",
    matter: "condizioni microclimatiche",
    laws: "D.Lgs. 81/2008, linee guida igienistiche per ambienti sanitari, buone prassi di ventilazione e controllo di temperature",
    generalHtml: `
<p>Temperatura, umidità relativa, ricambi d’aria e comfort influenzano <strong>igiene ambientale</strong>, <strong>benessere</strong> e talvolta il funzionamento di apparecchiature. Negli ambienti sanitari sono attese condizioni controllate e documentate ove la norma o le linee guida lo richiedono.</p>
<p>Documentazione utile: <strong>schede impianti termici</strong> e di ventilazione meccanica, <strong>registri di manutenzione filtri</strong>, <strong>rilevazioni</strong> periodiche o relazioni tecniche, <strong>piani di sanificazione</strong> integrati con il documento sulla pulizia.</p>
<p>In assenza di impianti centralizzati, descrivere <strong>misure organizzative</strong> (aerazione naturale programmata, controllo stagionale) e limiti strutturali noti.</p>
`,
  },
  22: {
    label: "Gas medicali",
    matter: "impianti di distribuzione dei gas medicali",
    laws: "norme sui fluidi medicali, UNI e riferimenti tecnici per impianti fissi, prescrizioni del farmacista o del competente ove richiesto",
    generalHtml: `
<p>Gli impianti fissi di distribuzione di gas medicali richiedono <strong>progettazione</strong>, <strong>collaudo</strong>, <strong>manutenzione programmata</strong> e formazione del personale su allarmi e emergenze. La documentazione tecnica deve essere disponibile agli operatori e al manutentore.</p>
<p>Qualora la struttura <strong>non disponga</strong> di reti fisse ma solo di bombole o sorgenti portatili per usi limitati, la documentazione descrive comunque <strong>stoccaggio</strong>, <strong>etichettatura</strong>, DPI e procedure di sicurezza.</p>
<p>Se il requisito è <strong>non applicabile</strong> per assenza totale di impianti e usi assimilabili, si usa la variante dichiarativa dedicata nel fascicolo.</p>
`,
  },
  23: {
    label: "Materiali esplodenti",
    matter: "materiali esplodenti",
    laws: "normativa sulla detenzione di esplosivi e sostanze pericolose; in caso di assenza totale, la struttura dichiara la non detenzione",
    generalHtml: ``,
  },
  24: {
    label: "Protezione antisismica",
    matter: "protezione antisismica",
    laws: "Norme Tecniche per le Costruzioni e normativa sismica vigente, documentazione statica ove richiesta per la tipologia edilizia",
    generalHtml: `
<p>La sicurezza sismica riguarda la <strong>resistenza strutturale dell’edificio</strong> e, per interventi di rilevante entità, la documentazione progettuale e asseverativa. Per esercizi in immobili consolidati, il fascicolo può includere <strong>certificazioni storiche</strong>, <strong>certificato di agibilità</strong> o titoli edilizi, <strong>relazioni statiche</strong> o dichiarazioni di conformità urbanistico-edilizia.</p>
<p>Per interventi edilizi recenti possono essere richiesti <strong>collaudi</strong>, <strong>prove su materiali</strong> e aggiornamenti alle NTC vigenti al momento dell’intervento.</p>
<p>La struttura sanitaria deve dimostrare di operare in <strong>edificio legittimato</strong> e, ove applicabile, di aver recepito prescrizioni post-sisma o di vulnerabilità. Il <strong>certificato di agibilità</strong> e la documentazione antisismica pertinente sono conservati in sede per la consultazione del GdV.</p>
`,
  },
};

export function buildTechnicalForOrder(c: BodyContext, doc: ResolvedDocument): string {
  if (doc.order === 19) {
    const base = TECH_SPECS[19];
    const spec: TechnicalSpec = {
      ...base,
      generalHtml: `
<p>Il requisito attesta il superamento delle barriere architettoniche nei locali di <strong>${c.studioName}</strong> (sede <strong>${c.address}</strong>) secondo i criteri applicabili (D.P.R. 503/1996 e s.m.i., regolamenti edilizi regionali, norme tecniche per l’accessibilità). Planimetrie con quote, relazioni di asseverazione, certificato di agibilità e titoli edilizi aggiornati sono conservati in sede per la consultazione del GdV.</p>
<p>Ove sussistano vincoli o deroghe motivate, la documentazione ne riporta le motivazioni e le misure compensative adottate.</p>
`,
    };
    return technicalComplianceBlock(c, doc, spec);
  }
  const spec = TECH_SPECS[doc.order];
  if (!spec) return "";
  return technicalComplianceBlock(c, doc, spec);
}

export function doc25Insurance(c: BodyContext): string {
  return (
    leadArticulatedDoc(c, "1A.04.12.04", "Obblighi assicurativi") +
    `
<h2>Parte generale — quadro normativo</h2>
<p>La Legge 24 febbraio 2017, n. 24 (c.d. Gelli-Bianco) e le disposizioni applicative impongono <strong>adeguate coperture assicurative</strong> per la responsabilità civile verso terzi connessa all’esercizio dell’attività sanitaria. La copertura deve essere <strong>coerente con le prestazioni erogate</strong>, con massimali e franchigie consoni al profilo di rischio.</p>
<p>Per i professionisti sanitari rilevano anche le <strong>polizze di responsabilità civile professionale (RCO)</strong> e le condizioni contrattuali previste da ordini professionali o da convenzioni. In caso di struttura con più operatori, è utile documentare <strong>chi è assicurato</strong> e per quali attività.</p>
<h2>Estremi contrattuali dichiarati nel gestionale</h2>
${c.insuranceSectionHtml}
<h2>Verifiche, rinnovi e gestione dei sinistri</h2>
<p>Il titolare verifica periodicamente <strong>scadenze</strong>, <strong>massimali</strong>, <strong>esclusioni</strong> e <strong>franchigie</strong>, aggiornando il fascicolo e informando il personale ove necessario. In caso di sinistro o contenzioso, la documentazione contrattuale e le comunicazioni alla compagnia sono conservate secondo policy interna e tempi di prescrizione.</p>
<h2>Integrazione con altri requisiti A1</h2>
<p>La copertura assicurativa si collega alla <strong>carta dei servizi</strong>, alla <strong>gestione reclami</strong> e al <strong>piano rischi</strong>; ogni modifica contrattuale rilevante è registrata nella revisione <strong>${c.revision}</strong>.</p>
${insuranceAdhesionFormBlock(c)}
` +
    sharedClosing(c)
  );
}

export function doc26ServiceCharter(c: BodyContext): string {
  return (
    leadArticulatedDoc(c, "1A.05.03.01", "Carta dei servizi") +
    `
<h2>Testo tipo — Carta dei servizi (da personalizzare e stampare per la sala d’attesa)</h2>
<p><strong>${c.studioName}</strong> — <strong>${c.address}</strong>. Titolare: <strong>${c.ownerName}</strong>.</p>
<p>La presente carta illustra, in forma sintetica e comprensibile, <strong>cosa può aspettarsi l’utente</strong> dall’accesso alle prestazioni dello studio, i <strong>canali di comunicazione</strong>, i <strong>diritti</strong> e le <strong>modalità di tutela</strong>.</p>

<h2>1. Missione e ambito delle prestazioni</h2>
<p>Lo studio eroga <strong>prestazioni odontoiatriche ambulatoriali</strong> nelle competenze professionali del titolare e dei collaboratori eventualmente presenti. Le prestazioni non erogate o soggette a lista d’attesa sono dichiarate esplicitamente in sede. Le <strong>urgenze odontoiatriche</strong> sono gestite secondo priorità clinica e disponibilità, nel rispetto delle risorse della monopresidio.</p>

<h2>2. Orari, prenotazione e accesso</h2>
<p><strong>Orari di apertura al pubblico:</strong> <em>(indicare giorni e fascia oraria effettiva)</em>. <strong>Prenotazione:</strong> telefono, sportello, o strumenti digitali ove attivati. <strong>Disdette:</strong> si invitano gli utenti a comunicare con congruo anticipo per liberare lo slot. <strong>Puntualità:</strong> lo studio si impegna a ridurre l’attesa; eventuali ritardi sono comunicati in accoglienza.</p>

<h2>3. Qualità, sicurezza e continuità</h2>
<p>Il servizio è erogato applicando <strong>protocolli clinici</strong>, <strong>norme di igiene e sterilizzazione</strong>, <strong>trattamento dei dati personali e sanitari</strong> secondo il GDPR. In caso di <strong>non conformità</strong> o segnalazione, la struttura avvia verifiche interne e, ove necessario, azioni correttive documentate nel sistema qualità.</p>

<h2>4. Trasparenza economica</h2>
<p>Prima o al momento della prestazione sono fornite <strong>informazioni su onorari</strong>, eventuali <strong>alternative terapeutiche</strong> e <strong>modalità di pagamento</strong>. Per prestazioni complesse si utilizzano <strong>consensi informati</strong> e preventivi ove applicabile.</p>

<h2>5. Diritti dell’utente</h2>
<ul>
<li>Diritto a informazioni chiare sullo stato di salute e sul piano di cura.</li>
<li>Diritto alla <strong>privacy</strong> e alla riservatezza delle informazioni cliniche.</li>
<li>Diritto di <strong>accedere</strong> alla propria documentazione clinica secondo normativa.</li>
<li>Diritto di presentare <strong>reclami, osservazioni e suggerimenti</strong> (procedura 1A.01.06.01) e di ricevere risposta motivata nei tempi congrui.</li>
</ul>

<h2>6. Come contattarci e presentare un reclamo</h2>
<p>Recapiti in sede, e-mail / PEC ove attivata, orari di sportello. Per i reclami si può utilizzare il <strong>modulo cartaceo</strong> disponibile in studio o le modalità indicate nella procedura dedicata. Ogni pratica è <strong>protocollata</strong>.</p>

<h2>7. Aggiornamento</h2>
<p>La carta è revisionata con la documentazione di qualità. Riferimento: <strong>${c.revision}</strong>.</p>
` +
    sharedClosing(c)
  );
}

export function doc28ReportCsat(c: BodyContext): string {
  return (
    leadArticulatedDoc(c, "1A.05.03.05", "Report criticità e customer satisfaction") +
    `
<h2>Parte generale — obiettivi del requisito</h2>
<p>Il requisito richiede di <strong>analizzare sistematicamente</strong> le criticità emerse da reclami, osservazioni, indicatori di qualità e indagini di customer satisfaction, e di definire <strong>piani di intervento</strong> misurabili. Il processo si integra con il programma di miglioramento (1A.01.05.01) e con la procedura reclami (1A.01.06.01).</p>
<p>Fonti tipiche: <strong>registro reclami</strong>, <strong>questionari</strong> cartacei o digitali, <strong>colloqui</strong> strutturati, <strong>dati operativi</strong> (tempi, cancellazioni, richiami), <strong>audit interni</strong>.</p>
<h2>Metodo di raccolta e frequenza</h2>
<p>La struttura raccoglie segnalazioni e indicatori di soddisfazione (es. scala NPS semplificata o item dedicati) con <strong>periodicità definita</strong> (trimestrale / semestrale / annuale) e produce <strong>report sintetici</strong> per il titolare, con evidenza di trend rispetto al periodo precedente.</p>
<h2>Analisi delle criticità e priorità</h2>
<p>Le criticità sono classificate per <strong>gravità</strong> (impatto sul paziente / conformità), <strong>frequenza</strong> e <strong>urgenza</strong> di trattamento. Per ciascuna si definiscono responsabile, azione, scadenza e indicatore di chiusura.</p>
<h2>Schema tipo — registro miglioramenti (da integrare con dati reali)</h2>
<table class="data-table" style="width:100%;border-collapse:collapse;font-size:9.5pt;margin:0.6rem 0;">
<thead><tr>
<th style="border:1px solid #333;padding:0.25rem;">Area / processo</th>
<th style="border:1px solid #333;padding:0.25rem;">Criticità o tema</th>
<th style="border:1px solid #333;padding:0.25rem;">Fonte (reclamo, survey, audit…)</th>
<th style="border:1px solid #333;padding:0.25rem;">Azione e scadenza</th>
<th style="border:1px solid #333;padding:0.25rem;">Esito / stato</th>
</tr></thead>
<tbody>
<tr><td style="border:1px solid #333;padding:0.25rem;">—</td><td style="border:1px solid #333;padding:0.25rem;"><em>Compilare con le rilevazioni effettive</em></td><td style="border:1px solid #333;padding:0.25rem;">—</td><td style="border:1px solid #333;padding:0.25rem;">—</td><td style="border:1px solid #333;padding:0.25rem;">—</td></tr>
</tbody>
</table>
<h2>Riesame e revisione documentale</h2>
<p>I report sono sottoposti a <strong>riesame</strong> almeno annuale o dopo eventi significativi. Riferimento revisione: <strong>${c.revision}</strong>.</p>
${customerSatisfactionQuestionnaireBlock()}
` +
    sharedClosing(c)
  );
}

export function doc29RiskPlan(c: BodyContext): string {
  return (
    leadArticulatedDoc(c, "1A.06.02.01", "Piano aziendale per la gestione del rischio") +
    `
<h2>Parte generale — modello di gestione del rischio</h2>
<p>Il piano integra rischi <strong>clinici</strong>, <strong>organizzativi</strong>, <strong>igienico-sanitari</strong>, <strong>tecnologici</strong> e <strong>reputazionali</strong> in un’ottica proporzionata alla monopresidio, ispirandosi a principi di <strong>ISO 31000</strong> (framework generale) adattati alla scala operativa.</p>
<p>Il titolare coordina <strong>identificazione</strong>, <strong>valutazione</strong>, <strong>trattamento</strong> (eliminazione, riduzione, trasferimento, accettazione controllata) e <strong>monitoraggio</strong>; il personale è coinvolto nella segnalazione e nell’applicazione delle misure.</p>
<h2>Matrice probabilità / impatto e priorità</h2>
<p>I rischi sono classificati per <strong>probabilità</strong> e <strong>impatto</strong> sul paziente, sul personale e sulla conformità; ne deriva una <strong>priorità</strong> di intervento e un piano di azioni con responsabili e scadenze. Sono collegati il <strong>piano emergenze</strong>, la <strong>sicurezza sul lavoro</strong> (DVR), la <strong>sicurezza informatica</strong> e la <strong>gestione del materiale biologico</strong>.</p>
<h2>Ambiti tipici in studio odontoiatrico</h2>
<ul>
<li>Infezione incrociata, sterilizzazione, gestione scarti e DPI.</li>
<li>Incidenti strumentali, cadute, sostanze chimiche.</li>
<li>Continuità operativa (blackout, guasti apparecchiature, perdita dati).</li>
<li>Comunicazione e consenso; errori di documentazione clinica.</li>
</ul>
<h2>Riesame e aggiornamento</h2>
<p>Revisione almeno <strong>annuale</strong> o dopo eventi significativi, sinistri, ispezioni o introdotte nuove tecnologie. Revisione documentale: <strong>${c.revision}</strong>.</p>
<h2>Registro sintetico dei rischi (modello — da compilare)</h2>
<table class="data-table" style="width:100%;border-collapse:collapse;font-size:9.5pt;margin:0.55rem 0;">
<thead><tr>
<th style="border:1px solid #333;padding:0.25rem;">Rischio / scenario</th>
<th style="border:1px solid #333;padding:0.25rem;">Probabilità (bassa/media/alta)</th>
<th style="border:1px solid #333;padding:0.25rem;">Impatto</th>
<th style="border:1px solid #333;padding:0.25rem;">Misure esistenti</th>
<th style="border:1px solid #333;padding:0.25rem;">Azioni residue / responsabile</th>
</tr></thead>
<tbody>
<tr><td style="border:1px solid #333;padding:0.28rem;">Infezione incrociata / sterilizzazione</td><td style="border:1px solid #333;padding:0.28rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.28rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.28rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.28rem;">&nbsp;</td></tr>
<tr><td style="border:1px solid #333;padding:0.28rem;">Incidente strumentale / caduta</td><td style="border:1px solid #333;padding:0.28rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.28rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.28rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.28rem;">&nbsp;</td></tr>
<tr><td style="border:1px solid #333;padding:0.28rem;">Perdita dati / continuità IT</td><td style="border:1px solid #333;padding:0.28rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.28rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.28rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.28rem;">&nbsp;</td></tr>
<tr><td style="border:1px solid #333;padding:0.28rem;">Esposizione biologica / chimica</td><td style="border:1px solid #333;padding:0.28rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.28rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.28rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.28rem;">&nbsp;</td></tr>
</tbody>
</table>
<h2>Documentazione correlata (DVR e allegati)</h2>
<p>Il presente piano si integra con il <strong>Documento di valutazione dei rischi</strong> (D.Lgs. 81/2008) e con le valutazioni specifiche. Le matrici complete, le schede per ambiente e gli allegati restano nel fascicolo aziendale e sono esibiti al GdV su richiesta.</p>
` +
    sharedClosing(c)
  );
}

export function doc30Cleaning(c: BodyContext): string {
  return (
    leadArticulatedDoc(c, "1A.06.02.02", "Pulizia e sanificazione degli ambienti") +
    `
<h2>Parte generale — obiettivi e riferimenti</h2>
<p>La procedura mira a garantire <strong>igiene ambientale</strong>, <strong>prevenzione delle infezioni</strong> correlate all’assistenza e, ove richiesto, <strong>tracciabilità</strong> delle operazioni nelle sale e nelle aree comuni di <strong>${c.studioName}</strong>, in coerenza con linee guida nazionali e regionali e con il profilo di rischio della struttura.</p>
<p>La sanificazione delle superfici non sostituisce la <strong>sterilizzazione strumentale</strong> ma ne è complementare su <strong>ambienti</strong> e <strong>superfici</strong>. Le misure si integrano con il <strong>protocollo di isolamento e precauzioni</strong> per pazienti con patologie trasmissibili (<strong>documento n. 7</strong>) e con il <strong>piano rischi</strong> (documento n. 29).</p>
<h2>Piano per zone e frequenze</h2>
<p>Piani di pulizia per <strong>sale operatorie</strong>, <strong>area di sterilizzazione</strong>, <strong>segreteria e sala d’attesa</strong>, <strong>servizi igienici</strong>, <strong>magazzino</strong>: per ciascuna area indicare <strong>frequenza</strong>, <strong>metodo</strong> (meccanica, detergente, disinfettante ammesso), <strong>responsabile</strong> (interno o ditta esterna) e <strong>DPI</strong>.</p>
<h2>Prodotti, schedatura e sicurezza chimica</h2>
<p>Prodotti <strong>idonei all’uso</strong> previsto, <strong>schede di sicurezza</strong> disponibili, diluizioni corrette, stoccaggio sicuro; formazione del personale su rischi e etichettatura.</p>
<h2>Verifiche, registrazioni e revisione</h2>
<p>Checklist o registri ove applicabile; integrazione con piano rischi. Revisione documentale: <strong>${c.revision}</strong>.</p>
<h2>Schema tipo — piano pulizia per ambiente (da adattare)</h2>
<table class="data-table" style="width:100%;border-collapse:collapse;font-size:9pt;margin:0.6rem 0;">
<thead><tr>
<th style="border:1px solid #333;padding:0.25rem;">Ambiente / locale</th>
<th style="border:1px solid #333;padding:0.25rem;">Frequenza</th>
<th style="border:1px solid #333;padding:0.25rem;">Metodo / prodotto (classe)</th>
<th style="border:1px solid #333;padding:0.25rem;">Responsabile</th>
</tr></thead>
<tbody>
<tr><td style="border:1px solid #333;padding:0.25rem;">Sala trattamento 1</td><td style="border:1px solid #333;padding:0.25rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.25rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.25rem;">&nbsp;</td></tr>
<tr><td style="border:1px solid #333;padding:0.25rem;">Sterilizzazione</td><td style="border:1px solid #333;padding:0.25rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.25rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.25rem;">&nbsp;</td></tr>
<tr><td style="border:1px solid #333;padding:0.25rem;">Sala d’attesa / segreteria</td><td style="border:1px solid #333;padding:0.25rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.25rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.25rem;">&nbsp;</td></tr>
</tbody>
</table>
` +
    sharedClosing(c)
  );
}

export function doc31Biological(c: BodyContext): string {
  return (
    leadArticulatedDoc(c, "1A.06.02.03", "Esposizione a materiale biologico e sostanze pericolose") +
    `
<h2>Parte generale — precauzioni standard e contesto normativo</h2>
<p>La procedura implementa le <strong>precauzioni standard</strong> (igiene delle mani, DPI, prevenzione tagli e schizzi, gestione dei rifiuti, disinfezione ambienti) e la gestione degli <strong>incidenti percutanei</strong> o delle esposizioni a materiale biologico, in coerenza con D.Lgs. 81/2008 e buone pratiche professionali odontoiatriche.</p>
<p>Integra la <strong>sorveglianza sanitaria</strong> ove dovuta, la <strong>formazione obbligatoria</strong> e la <strong>vaccinoprofilassi</strong> secondo indicazioni del medico competente. Per le <strong>sostanze chimiche</strong> (disinfettanti, monomeri, amalgama ove presente) si consultano le <strong>schede di sicurezza</strong> e si rispettano i limiti di stoccaggio; tabella riepilogativa consigliata in allegato operativo.</p>
<h2>Flusso in caso di incidente (schema)</h2>
<ol>
<li>Interruzione sicura dell’attività, messa in sicurezza del luogo.</li>
<li>Lavaggio abbondante con acqua e sapone; espulsione meccanica del sangue ove applicabile; non pratiche sconsigliate (es. caustici sulla ferita).</li>
<li>Segnalazione al titolare / RSPP; consultazione tempestiva del medico competente o PS secondo gravità.</li>
<li>Registrazione dell’evento, analisi delle cause, azioni correttive.</li>
</ol>
<h2>Kit, DPI e disponibilità</h2>
<p>Disponibilità di <strong>DPI</strong> (guanti, mascherine, occhiali, camici), contenitori per materiali taglienti, disinfettanti; verifica periodica delle scorte.</p>
<h2>Vaccinazioni e sorveglianza sanitaria</h2>
<p>Le vaccinazioni e la sorveglianza sanitaria del personale seguono il parere del <strong>medico competente</strong> e le indicazioni nazionali/regionali per i lavoratori esposti a rischio biologico. Le attestazioni di idoneità o le prescrizioni sono conservate nel fascicolo del personale secondo la normativa sulla privacy e sul lavoro.</p>
<h2>Revisione</h2>
<p>Aggiornamento dopo infortuni, nuove sostanze o cambi organizzativi. Riferimento: <strong>${c.revision}</strong>.</p>
` +
    sharedClosing(c)
  );
}

export function doc32NearMiss(c: BodyContext): string {
  return (
    leadArticulatedDoc(c, "1A.06.02.04", "Near miss, eventi avversi ed eventi sentinella") +
    `
<h2>Parte generale — cultura della sicurezza</h2>
<p>Il sistema promuove la <strong>segnalazione non punitiva</strong> di situazioni potenzialmente dannose e di eventi reali, per <strong>apprendimento organizzativo</strong> e riduzione del rischio di danno al paziente e agli operatori, in linea con i requisiti di qualità e sicurezza dell’Allegato A1.</p>
<h2>Glossario operativo</h2>
<dl style="font-size:10.5pt;">
<dt><strong>Near miss (quasi-evento)</strong></dt><dd>Evento che avrebbe potuto causare danno ma è stato intercettato prima (es. strumento quasi caduto nel campo sterile).</dd>
<dt><strong>Evento avverso</strong></dt><dd>Compromissione non intenzionale della sicurezza del paziente durante l’assistenza (da lieve a grave).</dd>
<dt><strong>Evento sentinella</strong></dt><dd>Evento raro o di particolare gravità che indica un fallimento sistemico e richiede analisi approfondita.</dd>
</dl>
<h2>Flusso documentato</h2>
<p><strong>Raccolta</strong> (canale riservato al personale) → <strong>analisi delle cause</strong> (anche contributi umani e organizzativi) → <strong>azioni correttive / preventive</strong> → <strong>monitoraggio dell’efficacia</strong> → <strong>report al titolare</strong> con sintesi in sede di riesame.</p>
<h2>Integrazione con altri processi</h2>
<p>Allineamento con il <strong>piano rischi</strong> (1A.06.02.01), <strong>gestione reclami</strong> (1A.01.06.01), <strong>report criticità</strong> (1A.05.03.05) e formazione periodica. Revisione: <strong>${c.revision}</strong>.</p>
<h2>Registro eventi (modello cartaceo / gestionale)</h2>
<p>Si consiglia di tenere un <strong>registro strutturato</strong> (data, descrizione sintetica, classificazione near miss / avverso / sentinella, azioni immediate, analisi cause, azioni correttive, responsabile, stato) con accesso riservato al titolare e al personale autorizzato, nel rispetto della privacy. Le copie cartacee o gli export digitali sono conservati per i tempi definiti dalla policy interna.</p>
<table class="data-table" style="width:100%;border-collapse:collapse;font-size:9pt;margin:0.55rem 0;">
<thead><tr>
<th style="border:1px solid #333;padding:0.22rem;">Data</th>
<th style="border:1px solid #333;padding:0.22rem;">Breve descrizione</th>
<th style="border:1px solid #333;padding:0.22rem;">Classe</th>
<th style="border:1px solid #333;padding:0.22rem;">Azioni</th>
<th style="border:1px solid #333;padding:0.22rem;">Stato</th>
</tr></thead>
<tbody>
<tr><td style="border:1px solid #333;padding:0.28rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.28rem;"><em>es. strumento scivolato verso campo sterile — intercettato</em></td><td style="border:1px solid #333;padding:0.28rem;">Near miss</td><td style="border:1px solid #333;padding:0.28rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.28rem;">&nbsp;</td></tr>
<tr><td style="border:1px solid #333;padding:0.28rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.28rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.28rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.28rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.28rem;">&nbsp;</td></tr>
</tbody>
</table>
` +
    sharedClosing(c)
  );
}
