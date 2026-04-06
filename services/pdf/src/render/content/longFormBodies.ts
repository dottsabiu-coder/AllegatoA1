import type { ResolvedDocument } from "@allegato-a1/shared";
import { escapeHtml } from "../escape.js";
import type { BodyContext } from "./contextBuilder.js";
import { quadroGeneraleAllegatoA1Monopresidio, intestazioneRequisitoSpecifico } from "./normativePreamble.js";

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
    quadroGeneraleAllegatoA1Monopresidio() +
    intestazioneRequisitoSpecifico(doc.code, label) +
    `<h2>Applicazione alla struttura</h2><p>Le sezioni seguenti si riferiscono a <strong>${c.studioName}</strong>, con sede in <strong>${c.address}</strong>; titolare della struttura <strong>${c.ownerName}</strong> (c.f. / p.iva: <strong>${c.vat}</strong>). Per la monopresidio <strong>non si attribuiscono</strong>, salvo atti pubblici che lo prevedano, figure di “direttore sanitario” o “responsabile tecnico” <em>distinte</em> dal titolare.</p>` +
    `<h2>Parte generale — ${escapeHtml(label)}</h2>` +
    generalHtml +
    `<h2>Attestazione documentale e ambito probatorio</h2>
<p>L’obiettivo è attestare, in forma organica e verificabile, che la tipologia di attività svolta è supportata da <strong>documentazione tecnica</strong> coerente con la materia di <em>${escapeHtml(matter)}</em>, con riferimento ai principali dettami normativi applicabili in via generale: ${laws}. Le indicazioni che seguono hanno valore di quadro descrittivo e operativo; certificati, verbali di collaudo, pratiche VVF, relazioni specialistiche e allegati restano acquisiti nel fascicolo fisico o digitale della struttura.</p>
${c.openingLine}

<h2>1. Descrizione della struttura e dei locali</h2>
<p>La struttura opera nei locali di cui all’indirizzo sopra indicato. Le caratteristiche planimetriche e funzionali, nel limite dei dati raccolti tramite il gestionale, sono sintetizzate come segue:</p>
${c.premisesSectionHtml}
<p>Il titolare si impegna a mantenere idonee le condizioni strutturali e impiantistiche rispetto alle prescrizioni vigenti per la specifica attività professionale svolta e a conservare la documentazione tecnica di progetto, asseverazioni e aggiornamenti quando richiesti dalla normativa settoriale o dagli enti di controllo.</p>

<h2>2. Risorse umane e responsabilità</h2>
<p>Per la corretta gestione delle misure richiamate dalla materia oggetto del presente allegato, la struttura definisce ruoli e responsabilità. Il titolare coordina l’osservanza delle procedure e la conservazione della documentazione; il personale collabora all’applicazione delle istruzioni operative e alla segnalazione di anomalie.</p>
${c.staffSectionHtml}

<h2>3. Attrezzature, impianti e manutenzione</h2>
<p>L’elenco delle principali apparecchiature dichiarate — utile ai fini della tracciabilità e della manutenzione — è riportato di seguito. Si ricorda che la documentazione tecnica di fabbrica, i manuali d’uso e i registri di manutenzione devono essere conservati e resi disponibili agli operatori e al responsabile della manutenzione, come previsto dai requisiti dell’Allegato A1.</p>
${c.equipmentSectionHtml}

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
    quadroGeneraleAllegatoA1Monopresidio() +
    intestazioneRequisitoSpecifico(doc.code, "Protezione da radiazioni ionizzanti — non applicabilità") +
    `<h2>Applicazione alla struttura</h2><p>La dichiarazione seguente riguarda <strong>${c.studioName}</strong>, <strong>${c.address}</strong>, titolare <strong>${c.ownerName}</strong>.</p>
<h2>Parte generale — radioprotezione</h2>
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
    quadroGeneraleAllegatoA1Monopresidio() +
    intestazioneRequisitoSpecifico(doc.code, "Impianti di distribuzione gas medicali — non applicabilità") +
    `<h2>Applicazione alla struttura</h2><p>La dichiarazione seguente riguarda <strong>${c.studioName}</strong>, <strong>${c.address}</strong>, titolare <strong>${c.ownerName}</strong>.</p>
<h2>Parte generale — gas medicali</h2>
<p>Gli impianti fissi di distribuzione di gas medicali richiedono in genere <strong>progettazione specialistica</strong>, <strong>collaudo</strong>, <strong>manutenzione programmata</strong>, <strong>allarmi</strong> e formazione del personale. La documentazione tecnica deve essere disponibile agli operatori e al responsabile della manutenzione.</p>
<p>La normativa sui fluidi medicali e le norme tecniche UNI disciplinano reti, terminali, etichettatura e compatibilità dei materiali; eventuali bombole o sorgenti portatili per usi limitati restano soggette a <strong>regole di stoccaggio e sicurezza</strong> anche in assenza di rete fissa.</p>
<h2>Situazione dichiarata dalla struttura</h2>
<p>Per il requisito <strong>${escapeHtml(doc.code)}</strong> la struttura <strong>${c.studioName}</strong> dichiara la <strong>non applicabilità</strong> o l’assenza di impianti centralizzati di distribuzione di gas medicali rispetto alle attività effettivamente svolte.</p>
${c.openingLine}
<h2>Descrizione operativa dei locali</h2>
<p>Nei locali di <strong>${c.address}</strong> non risultano installazioni centralizzate che richiedano la documentazione tipica degli impianti fissi. Qualsiasi futura installazione determinerà l’aggiornamento del fascicolo tecnico e gli adempimenti specialistici previsti.</p>
<h2>Obblighi residui e impegni</h2>
<p>Restano salve le norme su stoccaggio, movimentazione e sicurezza dei gas compressi se presenti per finalità strumentali non assimilabili a impianto di distribuzione sanitario. La struttura si impegna a integrare il fascicolo prima dell’introduzione di nuove sorgenti o reti.</p>` +
    sharedClosing(c)
  );
}

export function internsLong(c: BodyContext, doc: ResolvedDocument): string {
  return (
    quadroGeneraleAllegatoA1Monopresidio() +
    intestazioneRequisitoSpecifico(
      doc.code,
      "Identificazione tirocinanti e percorsi formativi — assenza al momento"
    ) +
    `<h2>Applicazione alla struttura</h2><p>La dichiarazione seguente riguarda <strong>${c.studioName}</strong>, <strong>${c.address}</strong>, titolare <strong>${c.ownerName}</strong>.</p>
<h2>Parte generale — identificazione e tracciabilità</h2>
<p>Il requisito mira a garantire che ogni soggetto che entri nel percorso assistenziale in veste formativa sia <strong>identificabile</strong>, <strong>autorizzato</strong>, <strong>coperto</strong> da assicurazioni e accordi con l’ente di provenienza, e <strong>formato</strong> su privacy, sicurezza e limiti operativi.</p>
<p>La documentazione tipica include: convenzione o protocollo con università / scuole, <strong>registro presenze</strong>, designazione del <strong>tutor</strong>, estremi anagrafici, limitazioni alle attività cliniche, DPI e vaccinazioni ove richieste.</p>
<h2>Situazione dichiarata dalla struttura</h2>
<p>La struttura <strong>${c.studioName}</strong> dichiara che <strong>non ospita al momento tirocinanti o percorsi formativi</strong> che richiedano identificazione e tracciabilità aggiuntiva oltre al personale strutturale elencato nella sezione conclusiva del presente documento.</p>
${c.openingLine}
<h2>Impegni in caso di futuro ingresso di tirocinanti</h2>
<ul>
<li>Identificazione formale, convenzione con ente formativo, coperture assicurative e trattamento privacy conforme.</li>
<li>Registro presenze e attività, limitazioni operative supervisionate dal titolare o tutor designato.</li>
<li>Aggiornamento del presente allegato e revisione <strong>${c.revision}</strong> prima delle visite del GdV.</li>
</ul>` +
    sharedClosing(c)
  );
}

export function doc01Organization(c: BodyContext): string {
  return (
    quadroGeneraleAllegatoA1Monopresidio() +
    intestazioneRequisitoSpecifico("1A.01.03.01", "Organizzazione e politiche di gestione delle risorse") +
    `
<h2>Parte I — Finalità, scopi e campo di applicazione</h2>
<p>Il presente documento definisce, per <strong>${c.studioName}</strong> sita in <strong>${c.address}</strong>, l’organizzazione e le <strong>politiche di gestione delle risorse</strong>, inclusa l’analisi dei processi per individuare le fasi ove possono manifestarsi disservizi (requisito <strong>1A.01.03.01</strong>). La <strong>denominazione della struttura</strong> riportata nei frontespizi deve coincidere <strong>letteralmente</strong> con la ragione sociale ufficiale inserita nel gestionale (nessuna abbreviazione o formula tipo “Resp.” / “Dir. tecnico” se non corrisponde ad atti reali).</p>
<p>Il <strong>titolare</strong> <strong>${c.ownerName}</strong> (P.IVA / C.F. <strong>${c.vat}</strong>) è il <strong>legale rappresentante e professionista titolare</strong> dell’esercizio, salvo diversa struttura societaria documentata. Per la monopresidio <strong>non si attribuiscono</strong>, salvo atti pubblici che lo prevedano, figure di “direttore sanitario” o “responsabile tecnico” <em>distinte</em> dal titolare.</p>
${c.openingLine}

<h2>Parte II — Funzioni del documento</h2>
<ul>
<li><strong>Organizzazione:</strong> ruoli, responsabilità, interazioni tra titolare, collaboratori e supporto.</li>
<li><strong>Politiche di gestione:</strong> risorse umane, strumentali, tecnologiche, finanziarie.</li>
<li><strong>Analisi dei processi:</strong> fasi critiche (accoglienza, prestazioni, sterilizzazione, documentazione, fatturazione).</li>
<li><strong>Prevenzione disservizi:</strong> misure, formazione, strumenti informatici.</li>
<li><strong>Controllo e miglioramento:</strong> verifiche, indicatori, riesame.</li>
</ul>

<h2>Parte III — Glossario (definizioni operative)</h2>
<dl style="font-size:10.5pt;">
  <dt><strong>Disservizio</strong></dt><dd>Evento che riduce qualità o conformità (ritardi, errori, comunicazioni inadeguate, guasti).</dd>
  <dt><strong>Processo</strong></dt><dd>Attività correlate che trasformano input in output (percorso del paziente).</dd>
  <dt><strong>Risorsa</strong></dt><dd>Personale, strumenti, software, spazi, tempo, budget.</dd>
  <dt><strong>Indicatore</strong></dt><dd>Grandezza misurabile per monitorare efficacia/efficienza.</dd>
  <dt><strong>Titolare</strong></dt><dd>Professionista responsabile dell’esercizio nella struttura monopresidio.</dd>
</dl>

<h2>Parte IV — Struttura organizzativa e personale</h2>
${c.staffSectionHtml}

<h2>Parte V — Risorse strumentali e tecnologiche</h2>
${c.equipmentSectionHtml}

<h2>Parte VI — Analisi dei processi e mitigazione</h2>
<p>Mappatura dei processi con identificazione rischi e controlli; azioni preventive su agenda, cartella clinica, sterilizzazione, backup.</p>

<h2>Parte VII — Monitoraggio e revisione documentale</h2>
<p>Indicatori, reclami, eventi avversi; riesame collegato a <strong>${c.revision}</strong>.</p>

<h2>Parte VIII — Conclusioni</h2>
<p>Quadro organizzativo e glossario per l’Allegato A1; integrare con procedure dettagliate in studio.</p>
`
  );
}

export function doc02PrivacyInfo(c: BodyContext): string {
  return (
    quadroGeneraleAllegatoA1Monopresidio() +
    intestazioneRequisitoSpecifico("1A.01.04.01", "Documentazione inerente il sistema informativo") +
    `
<h2>Premessa estesa sul trattamento dei dati e sul sistema informativo</h2>
<p>Il Codice e il Regolamento (UE) 2016/679 impongono principi stringenti (liceità, correttezza, trasparenza, minimizzazione, limitazione della conservazione, integrità e riservatezza). Le violazioni possono avere rilevanza anche penale e amministrativa. La struttura <strong>${c.studioName}</strong>, con sede in <strong>${c.address}</strong>, tratta dati particolari (salute) nel contesto dell’attività sanitaria; il <strong>titolare del trattamento</strong> è il professionista che esercita l’attività (<strong>${c.ownerName}</strong>), salvo diversa struttura giuridica documentata.</p>
<p>Il documento definisce, in forma organica: <strong>(i)</strong> le risorse da proteggere; <strong>(ii)</strong> i trattamenti svolti; <strong>(iii)</strong> la distribuzione dei compiti; <strong>(iv)</strong> l’analisi dei rischi per minacce e vulnerabilità; <strong>(v)</strong> il piano di misure fisiche, logiche e organizzative; <strong>(vi)</strong> il piano di verifiche periodiche; <strong>(vii)</strong> il piano di formazione degli incaricati. Le schede dettagliate possono essere replicate per ogni postazione come negli allegati estesi di riferimento.</p>
${c.openingLine}

<h2>1. Ambito, basi giuridiche e finalità</h2>
<p>Finalità: diagnosi e cura, gestione amministrativa e contabile, adempimenti di legge, gestione qualità e reclami, tutela in giudizio. I trattamenti avvengono con strumenti elettronici e, ove necessario, cartacei. I diritti degli interessati (accesso, rettifica, cancellazione, limitazione, portabilità, opposizione) sono gestiti con procedure interne e tempi di risposta documentati.</p>

<h2>2. Software applicativi e piattaforme (dati dichiarati nel gestionale)</h2>
${c.itProfileSectionHtml}

<h2>3. Hardware, periferiche e postazioni di lavoro</h2>
<p>Di seguito l’elenco delle apparecchiature censite (categoria, marca, modello, matricola), utile anche come “scheda rilevazione risorse” ai fini della sicurezza dei dati:</p>
${c.equipmentSectionHtml}

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
<p>Registro delle attività di trattamento, revisione almeno annuale o dopo cambiamenti rilevanti, test di ripristino backup, verifica log. Riferimento revisione documentale: <strong>${c.revision}</strong>.</p>

<h2>9. Conclusioni</h2>
<p>Documentazione di sistema informativo in adempimento a 1A.01.04.01; DPIA, nomina DPO o consulenza privacy specialistica se dovuti restano allegati.</p>
`
  );
}

/** Intestazione lunga (quadro A1 + codice + ancoraggio alla struttura) per documenti 25–32. */
function leadArticulatedDoc(c: BodyContext, code: string, titleShort: string): string {
  return (
    quadroGeneraleAllegatoA1Monopresidio() +
    intestazioneRequisitoSpecifico(code, titleShort) +
    `<h2>Applicazione alla struttura</h2><p>Le sezioni seguenti si riferiscono a <strong>${c.studioName}</strong>, con sede in <strong>${c.address}</strong>; titolare della struttura <strong>${c.ownerName}</strong>.</p>` +
    c.openingLine
  );
}

export function doc03to07Block(
  c: BodyContext,
  doc: ResolvedDocument,
  sections: { h: string; p: string[] }[]
): string {
  const body = sections
    .map(
      (s) =>
        `<h2>${escapeHtml(s.h)}</h2>${s.p.map((x) => `<p>${x}</p>`).join("")}`
    )
    .join("");
  return (
    quadroGeneraleAllegatoA1Monopresidio() +
    intestazioneRequisitoSpecifico(doc.code, doc.title) +
    `<h2>Applicazione alla struttura</h2><p>Le sezioni seguenti si riferiscono a <strong>${c.studioName}</strong>, <strong>${c.address}</strong>, titolare <strong>${c.ownerName}</strong>.</p>` +
    body +
    sharedClosing(c)
  );
}

function sharedClosing(c: BodyContext): string {
  return `
<h2>Sezione conclusiva e impegni</h2>
<p>La struttura si impegna a mantenere aggiornato il presente documento in caso di mutamenti organizzativi, normativi o tecnologici. Revisione di riferimento: <strong>${c.revision}</strong>.</p>
${c.staffSectionHtml}
${c.premisesSectionHtml}`;
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
<p>Il requisito riguarda la <strong>conformità ambientale</strong> dei locali (illuminazione naturale/artificiale, finiture, percorsi, igienizzabilità) e l’<strong>accessibilità</strong> per utenti con ridotta capacità motoria o sensoriale, in coerenza con i criteri tecnici vigenti e con la tipologia di attività sanitaria ambulatoriale.</p>
<p>Per il GdV è rilevante che esistano: <strong>elaborati grafici aggiornati</strong> (planimetrie, relazioni a fine lavori ove prodotte), <strong>certificazioni o attestazioni</strong> rilasciate da professionisti abilitati quando richieste, e <strong>evidenze di manutenzione</strong> che preservino nel tempo le condizioni dichiarate.</p>
<p>Nelle monopresidio la documentazione è spesso snella ma deve essere <strong>tracciabile</strong>: indicare almeno anno di riferimento degli elaborati, eventuali titoli abilitativi edilizi e prescrizioni ancora vincolanti.</p>
`,
  },
  14: {
    label: "Protezione antincendio",
    matter: "protezione antincendio",
    laws: "D.P.R. 151/2011 e norme tecniche di prevenzione incendi, schede della attività e prescrizioni dei VVF ove applicabili, D.Lgs. 81/2008",
    generalHtml: `
<p>La sicurezza antincendio si fonda su <strong>prevenzione</strong> (misure passive e attive), <strong>gestione delle emergenze</strong> (estintori, vie di esodo, segnaletica) e <strong>manutenzione</strong> periodica delle dotazioni. La tipologia di rischio dipende da attività, superfici, presenza di sostanze combustibili e carico termico.</p>
<p>La documentazione attesa include, ove applicabile: <strong>SCIA / autorizzazione o nulla osta</strong> ai sensi del Codice, <strong>relazioni di conformità</strong>, <strong>libretti di manutenzione estintori</strong> e impianti, <strong>planimetrie con vie di esodo</strong>, addestramento del personale su uso estintori e procedure di evacuazione.</p>
<p>Per strutture semplici restano comunque validi gli obblighi di <strong>adeguatezza e conservazione</strong> delle dotazioni e di aggiornamento dopo interventi edili rilevanti.</p>
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
    generalHtml: `
<p>Il requisito si sovrappone parzialmente all’accessibilità generale ma con focus su <strong>superamento delle barriere</strong> (pendenze, servizi igienici, maniglie, segnaletica tattile ove previsto, parcheggi). La documentazione attesta il rispetto dei <strong>criteri dimensionali e funzionali</strong> applicabili all’edificio.</p>
<p>Utile conservare: <strong>relazioni di asseverazione</strong>, <strong>planimetrie con quote</strong>, <strong>fotografie</strong> a supporto, <strong>certificazioni di agibilità o titoli edilizi</strong> che recepiscono prescrizioni di accessibilità.</p>
<p>In caso di unità immobiliari in contesti vincolati, indicare eventuali <strong>deroghe motivate</strong> e misure compensative documentate.</p>
`,
  },
  20: {
    label: "Smaltimento rifiuti",
    matter: "smaltimento dei rifiuti",
    laws: "D.Lgs. 152/2006 in materia di rifiuti sanitari, contratti con centri autorizzati, registri di carico e scarico",
    generalHtml: `
<p>I rifiuti sanitari richiedono <strong>classificazione corretta</strong> (urbani, assimilati, speciali, pericolosi), <strong>stoccaggio temporaneo</strong> in locali o contenitori idonei, <strong>trasporto</strong> tramite operatori autorizzati e <strong>tracciabilità</strong> tramite formulari o registri.</p>
<p>La documentazione include: <strong>contratti</strong> con centri di smaltimento / intermediari, <strong>autorizzazioni</strong> al trasporto ove in house, <strong>formazione del personale</strong> su segregazione e DPI, <strong>procedure</strong> per fuoriuscite o emergenze.</p>
<p>Per la monopresidio è centrale dimostrare <strong>coerenza tra quanto prodotto</strong> (tipologie di prestazione) e <strong>contratti effettivi</strong>, con aggiornamento quando cambia il gestore.</p>
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
    generalHtml: `
<p>Le strutture odontoiatriche di norma <strong>non detengono esplosivi</strong>; il requisito richiede comunque <strong>esplicitazione</strong> della non detenzione o, se presenti sostanze particolari, documentazione su autorizzazioni e sicurezza.</p>
<p>La parte generale chiarisce che ogni <strong>detenzione anomala</strong> rispetto all’ordinario esercizio professionale deve essere trattata con normativa specifica (magazzinaggio, ADR, ecc.).</p>
<p>Il documento strutturale consente al GdV di verificare <strong>coerenza dichiarativa</strong> con l’attività effettiva.</p>
`,
  },
  24: {
    label: "Protezione antisismica",
    matter: "protezione antisismica",
    laws: "Norme Tecniche per le Costruzioni e normativa sismica vigente, documentazione statica ove richiesta per la tipologia edilizia",
    generalHtml: `
<p>La sicurezza sismica riguarda la <strong>resistenza strutturale dell’edificio</strong> e, per interventi di rilevante entità, la documentazione progettuale e asseverativa. Per esercizi in immobili consolidati, il fascicolo può includere <strong>certificazioni storiche</strong>, <strong>agibilità</strong>, <strong>relazioni statiche</strong> o dichiarazioni di conformità urbanistico-edilizia.</p>
<p>Per interventi edilizi recenti possono essere richiesti <strong>collaudi</strong>, <strong>prove su materiali</strong> e aggiornamenti alle NTC vigenti al momento dell’intervento.</p>
<p>La struttura sanitaria deve dimostrare di operare in <strong>edificio legittimato</strong> e, ove applicabile, di aver recepito prescrizioni post-sisma o di vulnerabilità.</p>
`,
  },
};

export function buildTechnicalForOrder(c: BodyContext, doc: ResolvedDocument): string {
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
` +
    sharedClosing(c)
  );
}

export function doc26ServiceCharter(c: BodyContext): string {
  return (
    leadArticulatedDoc(c, "1A.05.03.01", "Carta dei servizi") +
    `
<h2>Parte generale — finalità e contenuto minimo</h2>
<p>La carta dei servizi è lo strumento di <strong>trasparenza</strong> verso l’utente: illustra <strong>prestazioni</strong>, <strong>orari</strong>, <strong>modalità di accesso e prenotazione</strong>, <strong>tempi di attesa dichiarati</strong> (ove comunicabili), <strong>standard di qualità percepita</strong>, <strong>canali di feedback</strong> (reclami, suggerimenti) e <strong>tutele</strong> (privacy, continuità, rimedi).</p>
<p>Per le strutture monopresidio la carta può essere sintetica ma deve essere <strong>effettivamente disponibile</strong> in sede (es. esposizione in sala d’attesa, fascicolo informativo, sito o QR) e <strong>allineata</strong> alle procedure interne realmente applicate.</p>
<h2>Prestazioni, organizzazione e comunicazione al pubblico</h2>
<p><strong>${c.studioName}</strong> eroga prestazioni sanitarie ambulatoriali coerenti con le competenze professionali del titolare e con la classificazione della struttura. Le informazioni sono rese disponibili in sala d’attesa e su supporti digitali ove adottati; eventuali <strong>limitazioni</strong> (es. urgenze, specialistica non erogata) sono dichiarate in modo chiaro.</p>
<h2>Reclami, miglioramento e revisione</h2>
<p>I reclami sono gestiti secondo la procedura dedicata (requisito <strong>1A.01.06.01</strong>); la carta è aggiornata a seguito di modifiche organizzative, tariffarie o di offerta assistenziale. La revisione documentale di riferimento è <strong>${c.revision}</strong>.</p>
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
<p>La sanificazione delle superfici non sostituisce la <strong>sterilizzazione strumentale</strong> ma ne è complementare su <strong>ambienti</strong> e <strong>superfici</strong>.</p>
<h2>Piano per zone e frequenze</h2>
<p>Piani di pulizia per <strong>sale operatorie</strong>, <strong>area di sterilizzazione</strong>, <strong>segreteria e sala d’attesa</strong>, <strong>servizi igienici</strong>, <strong>magazzino</strong>: per ciascuna area indicare <strong>frequenza</strong>, <strong>metodo</strong> (meccanica, detergente, disinfettante ammesso), <strong>responsabile</strong> (interno o ditta esterna) e <strong>DPI</strong>.</p>
<h2>Prodotti, schedatura e sicurezza chimica</h2>
<p>Prodotti <strong>idonei all’uso</strong> previsto, <strong>schede di sicurezza</strong> disponibili, diluizioni corrette, stoccaggio sicuro; formazione del personale su rischi e etichettatura.</p>
<h2>Verifiche, registrazioni e revisione</h2>
<p>Checklist o registri ove applicabile; integrazione con piano rischi. Revisione documentale: <strong>${c.revision}</strong>.</p>
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
<p>Integra la <strong>sorveglianza sanitaria</strong> ove dovuta, la <strong>formazione obbligatoria</strong> e la <strong>vaccinoprofilassi</strong> secondo indicazioni del medico competente.</p>
<h2>Flusso in caso di incidente (schema)</h2>
<ol>
<li>Interruzione sicura dell’attività, messa in sicurezza del luogo.</li>
<li>Lavaggio abbondante con acqua e sapone; espulsione meccanica del sangue ove applicabile; non pratiche sconsigliate (es. caustici sulla ferita).</li>
<li>Segnalazione al titolare / RSPP; consultazione tempestiva del medico competente o PS secondo gravità.</li>
<li>Registrazione dell’evento, analisi delle cause, azioni correttive.</li>
</ol>
<h2>Kit, DPI e disponibilità</h2>
<p>Disponibilità di <strong>DPI</strong> (guanti, mascherine, occhiali, camici), contenitori per materiali taglienti, disinfettanti; verifica periodica delle scorte.</p>
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
` +
    sharedClosing(c)
  );
}
