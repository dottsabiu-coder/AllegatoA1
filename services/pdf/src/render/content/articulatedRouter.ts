import type { AllegatoFormData, ResolvedDocument } from "@allegato-a1/shared";
import { escapeHtml } from "../escape.js";
import { buildBodyContext } from "./contextBuilder.js";
import {
  buildTechnicalForOrder,
  doc01Organization,
  doc02PrivacyInfo,
  doc03to07Block,
  doc05ErogazioneAssistenzaTeresi,
  doc25Insurance,
  doc26ServiceCharter,
  doc28ReportCsat,
  doc29RiskPlan,
  doc30Cleaning,
  doc31Biological,
  doc32NearMiss,
  explosivesNotApplicableBlock,
  gasLong,
  internsLong,
  ionizingLong,
  technicalComplianceBlock,
  GENERIC_TECHNICAL_SPEC,
} from "./longFormBodies.js";
import {
  complaintIntakeFormBlock,
  maintenanceVerificationPlanBlock,
  pianoEmergenzeEstesoBlock,
  protocolloIsolamentoEstesoBlock,
} from "./blocksForms.js";

function doc08ClinicalDocs(c: ReturnType<typeof buildBodyContext>, doc: ResolvedDocument): string {
  return (
    doc03to07Block(c, doc, [
      {
        h: "1. Finalità, ambito e principi",
        p: [
          `La procedura definisce i requisiti per la <strong>redazione, aggiornamento, conservazione e verifica</strong> della documentazione sanitaria presso <strong>${c.studioName}</strong>, garantendo <strong>tracciabilità</strong>, <strong>riservatezza</strong>, <strong>integrità</strong> e conformità agli obblighi deontologici, al Codice deontologico odontoiatrico e alla normativa privacy applicabile ai dati particolari (salute).`,
          "Il documento si applica a cartella clinica cartacea e/o informatica, consensi informati, piani di cura, referti diagnostici, documentazione ortodontico-chirurgica, note di dimissione e comunicazioni rilevanti verso altri professionisti.",
        ],
      },
      {
        h: "2. Contenuto minimo e completezza della cartella",
        p: [
          "La cartella deve consentire la <strong>ricostruzione del percorso clinico</strong>: identificazione del paziente, anamnesi, stato clinico, diagnosi e piani terapeutici, materiali e tecniche ove rilevanti, consensi, esiti delle prestazioni, follow-up e note amministrative strettamente necessarie.",
          "Per prestazioni particolari (chirurgia, implantologia, ortodonzia) si richiede documentazione proporzionata alla complessità, inclusi eventuali check-list o schemi interni approvati.",
        ],
      },
      {
        h: "3. Registrazioni, firme e responsabilità",
        p: [
          "Le annotazioni sono <strong>datate</strong> e attribuite al <strong>professionista responsabile</strong> della prestazione; firma autografa o firma elettronica qualificata ove adottata. Il titolare definisce chi può integrare la documentazione per conto dello studio (es. personale autorizzato sotto supervisione).",
        ],
      },
      {
        h: "4. Conservazione temporale e supporti",
        p: [
          "I tempi di conservazione rispettano il dettato <strong>sanitario e civilistico</strong>; i supporti informatici devono garantire leggibilità nel tempo (backup, formati, migrazione). I referti esterni e la corrispondenza clinica rilevante sono archiviati in modo ordinato.",
        ],
      },
      {
        h: "5. Accessi, modifica e tracciabilità",
        p: [
          "Solo il <strong>personale autorizzato</strong> accede ai dati per finalità assistenziali o amministrative connesse; ogni modifica sostanziale post-datata deve essere motivata secondo policy interna. Il sistema informativo, ove presente, deve consentire audit trail o equivalenti controlli organizzativi.",
        ],
      },
      {
        h: "6. Controllo di qualità documentale",
        p: [
          "Controlli periodici (campionamenti su cartelle, verifiche su completezza consensi e referti) alimentano il miglioramento continuo e il piano rischi. Non conformità ricorrenti attivano azioni correttive.",
          "Check-list interna (trimestrale o semestrale): completezza anamnesi e consensi; referti esterni associati alla cartella; tracciabilità firme e date; coerenza tra piano di cura e prestazioni registrate; archiviazione consensi privacy aggiornata.",
        ],
      },
      {
        h: "7. Referti esterni, imaging e corrispondenza clinica",
        p: [
          "Referti di laboratorio, imaging diagnostico e corrispondenza con altri professionisti sono conservati in modo ordinato e associati al percorso del paziente, con possibilità di recupero tempestivo in sede di visita o contenzioso.",
        ],
      },
    ])
  );
}

function doc09MaintenanceCharge(c: ReturnType<typeof buildBodyContext>, doc: ResolvedDocument): string {
  return (
    doc03to07Block(c, doc, [
    {
      h: "1. Finalità e ambito dell’incarico",
      p: [
        `La struttura <strong>${c.studioName}</strong> definisce un <strong>responsabile della manutenzione</strong> (figura tecnico-organizzativa distinta da ogni “responsabile tecnico sanitario” non previsto nella monopresidio) per gli impianti e le apparecchiature, in adempimento al requisito <strong>${escapeHtml(doc.code)}</strong>.`,
        "L’incarico è <strong>formale</strong> (verbale o contratto / nomina scritta) e documenta chi ha l’obbligo di pianificare, seguire e rendicontare interventi su edificio, impianti e apparecchiature biomediche e ausiliarie.",
      ],
    },
    {
      h: "2. Soggetto responsabile e modalità di nomina",
      p: [
        "Il responsabile della manutenzione può coincidere con il <strong>titolare</strong> della struttura ovvero essere un <strong>soggetto esterno</strong> (tecnico, ditta, manutentore qualificato) con competenze coerenti con gli impianti presenti. La nomina è conservata in copia nel fascicolo Allegato A1.",
      ],
    },
    {
      h: "3. Compiti operativi",
      p: [
        "Pianificazione delle <strong>manutenzioni ordinarie e straordinarie</strong>, rispetto delle scadenze legali (es. estintori, impianti elettrici ove di competenza), interfaccia con ditte esterne, conservazione di <strong>registri, rapportini, dichiarazioni di conformità</strong> e relazioni di intervento.",
      ],
    },
    {
      h: "4. Verifiche, registri e aggiornamento",
      p: [
        `Il responsabile coordina le verifiche documentali in vista delle visite del GdV e aggiorna il fascicolo dopo sostituzioni di apparecchiature o modifiche impiantistiche. Riferimento revisione documentale: <strong>${c.revision}</strong>.`,
      ],
    },
    {
      h: "5. Registro interventi e contratti",
      p: [
        "È tenuto un registro o archivio contrattuale degli interventi di manutenzione con date, esiti e firme o rapportini, consultabile in sede di verifica.",
      ],
    },
    {
      h: "6. Matrice operativa incarico — attività",
      p: [
        "Schema di riferimento per verifiche in sede GdV (integrare con nomi effettivi):",
      ],
    },
  ]) +
    `<table class="data-table" style="width:100%;border-collapse:collapse;font-size:9.5pt;margin:0.5rem 0;">
<thead><tr>
<th style="border:1px solid #333;padding:0.28rem;">Attività</th>
<th style="border:1px solid #333;padding:0.28rem;">Cadenza</th>
<th style="border:1px solid #333;padding:0.28rem;">Evidenza richiesta</th>
<th style="border:1px solid #333;padding:0.28rem;">Responsabile</th>
</tr></thead>
<tbody>
<tr><td style="border:1px solid #333;padding:0.3rem;">Verifica scadenze manutenzioni legali (estintori, impianti ove di competenza)</td><td style="border:1px solid #333;padding:0.3rem;">Almeno annuale</td><td style="border:1px solid #333;padding:0.3rem;">Contratti, rapportini, etichette</td><td style="border:1px solid #333;padding:0.3rem;">Resp. manutenzione</td></tr>
<tr><td style="border:1px solid #333;padding:0.3rem;">Aggiornamento registro dopo sostituzione apparecchiature</td><td style="border:1px solid #333;padding:0.3rem;">Evento</td><td style="border:1px solid #333;padding:0.3rem;">Nota su inventario + doc. fabbrica</td><td style="border:1px solid #333;padding:0.3rem;">Titolare</td></tr>
<tr><td style="border:1px solid #333;padding:0.3rem;">Riesame nominativo responsabile manutenzione</td><td style="border:1px solid #333;padding:0.3rem;">Annuale</td><td style="border:1px solid #333;padding:0.3rem;">Verbale / lettera incarico</td><td style="border:1px solid #333;padding:0.3rem;">Titolare</td></tr>
</tbody></table>`
  );
}

function doc10Inventory(c: ReturnType<typeof buildBodyContext>, doc: ResolvedDocument): string {
  return (
    doc03to07Block(c, doc, [
      {
        h: "1. Finalità e conformità al requisito",
        p: [
          `L’inventario delle attrezzature di <strong>${c.studioName}</strong> è <strong>aggiornato</strong> e sottoposto a <strong>verifica almeno annuale</strong> (o con frequenza maggiore se imposta da norma o contratto di manutenzione), in adempimento al requisito <strong>${escapeHtml(doc.code)}</strong>.`,
          "L’inventario supporta la tracciabilità per manutenzione, formazione, gestione rischi e dimostrazione del possesso delle apparecchiature dichiarate in sede autorizzativa.",
        ],
      },
      {
        h: "2. Identificazione univoca dei beni",
        p: [
          "Ogni bene è identificato con <strong>tipologia</strong>, <strong>marca</strong>, <strong>modello</strong>, <strong>numero di serie o matricola</strong> ove disponibile, <strong>anno di acquisizione</strong> ove noto e <strong>ubicazione</strong> logica (sala 1, sterilizzazione, radiologia, ecc.).",
        ],
      },
      {
        h: "3. Etichettatura, stato e messa fuori servizio",
        p: [
          "Le apparecchiature in uso devono essere <strong>etichettabili</strong> o riconoscibili; quelle fuori servizio o in quarantena sono segregate e segnalate per evitare uso improprio. Le eliminazioni sono registrate con data e motivazione.",
        ],
      },
      {
        h: "4. Collegamento a manutenzione e documentazione di fabbrica",
        p: [
          "L’inventario è il riferimento per il <strong>piano di manutenzione</strong> (doc. 11) e per la <strong>documentazione tecnica di fabbrica</strong> (doc. 12): ogni riga dovrebbe poter essere ricondotta a manuali, certificati e registri di intervento.",
        ],
      },
      {
        h: "5. Elenco dichiarato (gestionale)",
        p: [
          "Di seguito l’elenco unico delle apparecchiature biomediche e ausiliarie censite per l’Allegato A1 (allineato ai documenti 11 e 12 e alle modifiche organizzative concordate):",
        ],
      },
      {
        h: "6. Verifica annuale e responsabilità",
        p: [
          "Almeno una volta all’anno (o con frequenza maggiore se imposta da norma o contratto) il titolare o il responsabile designato verifica la congruenza tra inventario effettivo e registri, annotando data e esito della verifica.",
        ],
      },
    ]) + c.equipmentSectionHtml
  );
}

function doc11MaintenancePlan(c: ReturnType<typeof buildBodyContext>, doc: ResolvedDocument): string {
  return doc03to07Block(c, doc, [
    {
      h: "1. Ambito del piano",
      p: [
        "Il piano copre <strong>strutture edili</strong>, <strong>impianti tecnologici</strong> (elettrico, termico, idraulico ove presenti), <strong>apparecchiature biomediche</strong> e <strong>ausiliarie</strong>, distinguendo <strong>manutenzione ordinaria</strong>, <strong>straordinaria</strong> e <strong>verifiche legali</strong> obbligate (estintori, impianti elettrici, dispositivi di sicurezza, ecc.).",
      ],
    },
    {
      h: "2. Frequenze, responsabilità e fornitori",
      p: [
        "Per ciascuna tipologia di bene o impianto sono definite <strong>periodicità</strong>, <strong>responsabile dell’esecuzione</strong> (interno o esterno) e <strong>criteri di accettazione</strong> dell’intervento. I contratti con ditte sono conservati con estremi identificativi e contatti.",
      ],
    },
    {
      h: "3. Registrazione degli interventi e non conformità",
      p: [
        "Ogni intervento rilevante è documentato (data, esito, firma o rapportino). Le non conformità rilevate (guasti ripetuti, ritardi, rischi per la sicurezza) attivano azioni correttive e possono essere segnalate nel sistema near miss / rischi ove applicabile.",
      ],
    },
    {
      h: "4. Evidenze per il GdV",
      p: [
        "Il fascicolo contiene <strong>contratti</strong>, <strong>rapportini</strong>, <strong>scadenze</strong> e, ove richiesto, <strong>certificati di verifica</strong> aggiornati. L’elenco delle apparecchiature è riportato nel <strong>documento n. 10</strong> (inventario), cui si rimanda per coerenza con i piani di intervento.",
      ],
    },
    {
      h: "5. Collegamento con la figura di responsabilità manutentiva",
      p: [
        "Il piano è coordinato con il documento sull’incarico di manutenzione (requisito collegato): stesso soggetto o interfaccia definita tra titolare, interni ed esterni.",
      ],
    },
  ], { appendBeforeClosing: maintenanceVerificationPlanBlock() });
}

function doc12TechSheets(c: ReturnType<typeof buildBodyContext>, doc: ResolvedDocument): string {
  return doc03to07Block(c, doc, [
    {
      h: "1. Finalità e accessibilità",
      p: [
        "La documentazione tecnica di fabbrica (manuali d’uso, <strong>dichiarazioni di conformità</strong>, <strong>certificati CE</strong> ove applicabili, schemi elettrici, bollettini del costruttore) è conservata in <strong>formato cartaceo e/o digitale</strong> e resa <strong>immediatamente disponibile</strong> agli operatori autorizzati e al responsabile della manutenzione, in adempimento al requisito <strong>${escapeHtml(doc.code)}</strong>.",
      ],
    },
    {
      h: "2. Contenuto minimo per tipologia di apparecchiatura",
      p: [
        "<strong>Dispositivi medici / apparecchiature radiologiche:</strong> manuale utente, dichiarazione di conformità, etichettatura UDI ove richiesta, certificati di installazione o collaudo ove prodotti.",
        "<strong>Strumentazione odontoiatrica e ausiliaria:</strong> limiti d’uso, avvertenze di sicurezza, elenco accessori omologati, intervalli di manutenzione consigliati dal costruttore.",
        "<strong>Software e firmware:</strong> versione installata, note di rilascio rilevanti per la sicurezza, log di aggiornamento ove applicabile.",
      ],
    },
    {
      h: "3. Archiviazione, indicizzazione e tracciabilità",
      p: [
        "Per ogni bene del <strong>documento n. 10</strong> si mantiene un fascicolo (cartella digitale o cartacea) con manuali, certificati e corrispondenza con il fornitore. In sede di verifica deve essere possibile risalire da matricola / modello alla documentazione relativa entro tempi congrui.",
      ],
    },
    {
      h: "4. Rinvio all’inventario",
      p: [
        "Non si ripete in questo documento l’elenco delle apparecchiature: si rimanda al <strong>documento n. 10</strong> per l’inventario aggiornato e al <strong>documento n. 11</strong> per le verifiche e manutenzioni programmate.",
      ],
    },
    {
      h: "5. Recall, field safety notices (FSN) e aggiornamenti",
      p: [
        "Le comunicazioni del fabbricante su recall, correttivi di sicurezza e FSN sono conservate con evidenza della data di ricezione, della valutazione del rischio e delle azioni intraprese (es. messa fuori servizio, sostituzione, aggiornamento software).",
      ],
    },
    {
      h: "6. Responsabilità e revisione",
      p: [
        "Il titolare o il responsabile della manutenzione verifica periodicamente la completezza dei fascicoli tecnici dopo acquisti o sostituzioni. Riferimento revisione documentale: <strong>${c.revision}</strong>.",
      ],
    },
  ]);
}

function doc03Quality(c: ReturnType<typeof buildBodyContext>, doc: ResolvedDocument): string {
  return doc03to07Block(
    c,
    doc,
    [
    {
      h: "1. Programma di valutazione e miglioramento",
      p: [
        `La struttura <strong>${c.studioName}</strong> adotta un programma strutturato per misurare la qualità delle prestazioni e dei servizi erogati, in coerenza con il requisito <strong>${escapeHtml(doc.code)}</strong>. Il programma definisce obiettivi misurabili, responsabilità, strumenti di rilevazione e tempi di riesame, in linea con il Manuale OTA e con le attese del GdV per la documentazione non meramente elencativa.`,
      ],
    },
    {
      h: "2. Indicatori, customer satisfaction e fonti di dato",
      p: [
        "Reclami, questionari di soddisfazione, colloqui strutturati, audit interni, indicatori clinico-organizzativi (tempi, completenza documentale, sicurezza), esiti delle verifiche periodiche e benchmark interni alimentano il ciclo di miglioramento. Ogni indicatore ha una baseline, una frequenza di misurazione e una soglia di allerta.",
      ],
    },
    {
      h: "3. Metodo PDCA e documentazione delle azioni",
      p: [
        "Il <strong>PDCA</strong> (<strong>Plan-Do-Check-Act</strong>) è un metodo iterativo di gestione in quattro fasi, noto come <strong>ciclo di Deming</strong> o di <strong>Shewhart</strong>, finalizzato al <strong>miglioramento continuo</strong> di processi, prodotti o servizi. Si basa su una logica ciclica per <strong>pianificare</strong> le azioni, <strong>eseguirle</strong>, <strong>verificare</strong> i risultati e <strong>standardizzare</strong> le soluzioni efficaci.",
        "Nell’ambito del programma di qualità, le azioni correttive e preventive sono registrate con causa radice, responsabile e scadenza, collegando la fase <em>Do</em> all’esecuzione controllata e la fase <em>Check</em> al confronto con gli obiettivi misurabili.",
      ],
    },
    {
      h: "4. Coinvolgimento del personale e formazione",
      p: [
        "Il personale è informato sugli obiettivi di qualità e formato sulle procedure aggiornate; il feedback interno è raccolto in riunioni periodiche.",
      ],
    },
    {
      h: "5. Revisione direzionale e integrazione con altri requisiti",
      p: [
        "Il titolare riesamina almeno annualmente gli obiettivi di qualità e approva piani di miglioramento. Il programma si integra con reclami (1A.01.06.01), carta dei servizi (1A.05.03.01) e report su criticità (1A.05.03.05).",
      ],
    },
  ]);
}

function doc04Complaints(c: ReturnType<typeof buildBodyContext>, doc: ResolvedDocument): string {
  return doc03to07Block(
    c,
    doc,
    [
    {
      h: "1. Ambito e finalità (modello esteso)",
      p: [
        `La procedura disciplina la gestione di <strong>reclami, osservazioni e suggerimenti</strong> relativi alle prestazioni e ai servizi di <strong>${c.studioName}</strong>, garantendo <strong>tempi congrui</strong>, <strong>tracciabilità</strong> e <strong>riservatezza</strong>, in coerenza con la carta dei servizi e con gli obblighi deontologici e privacy.`,
        "Ogni segnalazione costituisce opportunità di <strong>miglioramento continuo</strong> ed è registrata con protocollo progressivo.",
      ],
    },
    {
      h: "2. Canali di presentazione",
      p: [
        "Sportello in sede, posta ordinaria, e-mail / PEC ove attivata, moduli cartacei in sala d’attesa. Per le richieste scritte è utile indicare recapito per la risposta.",
      ],
    },
    {
      h: "3. Registrazione, classificazione e tempi di risposta",
      p: [
        "Alla ricezione si attribuisce un <strong>numero di protocollo</strong>, si classifica la segnalazione (organizzativa, clinica, amministrativa, privacy, altro) e si avvia l’istruttoria interna. La risposta motivata è fornita nei termini compatibili con la complessità del caso e con quanto comunicato nella carta dei servizi.",
      ],
    },
    {
      h: "4. Segreto, conservazione e trattamento dati",
      p: [
        "I dati personali contenuti nelle segnalazioni sono trattati secondo il Regolamento (UE) 2016/679 e normativa applicabile; la documentazione è conservata per il tempo necessario alle verifiche, al miglioramento della qualità e alla tutela in sede contenziosa ove pertinente.",
      ],
    },
  ],
    { prependAfterIntestazione: complaintIntakeFormBlock() }
  );
}

function doc05CareDelivery(c: ReturnType<typeof buildBodyContext>, doc: ResolvedDocument): string {
  return doc05ErogazioneAssistenzaTeresi(c, doc);
}

function doc06Emergency(c: ReturnType<typeof buildBodyContext>, doc: ResolvedDocument): string {
  return doc03to07Block(
    c,
    doc,
    [
    {
      h: "1. Finalità e campo di applicazione",
      p: [
        `Il piano definisce comportamenti, responsabilità e dotazioni per le <strong>emergenze intra moenia</strong> durante l’orario di apertura di <strong>${c.studioName}</strong>, in assenza di continuità assistenziale ospedaliera in loco, in adempimento al requisito <strong>${escapeHtml(doc.code)}</strong>.`,
      ],
    },
    {
      h: "2. Ruoli e coordinamento",
      p: [
        "Il <strong>titolare</strong> coordina l’attivazione delle procedure; in sua assenza il collaboratore di turno assume le funzioni operative fino all’arrivo dei soccorsi. È utile definire un <strong>ordine di priorità</strong> per la tutela del paziente, del personale e degli altri presenti.",
      ],
    },
    {
      h: "3. Scenari, primi interventi e continuità assistenziale",
      p: [
        "Scenari tipo: malessere / sincope, emorragie, dolore toracico o sospetto evento cardiaco, arresto cardiaco, reazione allergica grave, crisi convulsiva, incidente strumentale con lesioni. Per ciascuno: valutazione rapida, messa in sicurezza, chiamata al <strong>118</strong> / <strong>112</strong> ove necessario, documentazione dell’evento.",
      ],
    },
    {
      h: "4. BLSD, DAE e formazione",
      p: [
        "Ove il personale sia formato al <strong>BLSD</strong> e sia disponibile un <strong>DAE</strong>, la procedura ne descrive ubicazione, accessibilità e verifiche periodiche. La formazione è aggiornata secondo protocolli riconosciuti e registrata nel fascicolo formazione.",
      ],
    },
    {
      h: "5. Dotazioni, vie di esodo e integrazione antincendio",
      p: [
        `Presidi di primo soccorso, estintori, segnaletica e percorsi di evacuazione devono essere coerenti con la documentazione antincendio e sottoposti a verifiche di scadenza. Indirizzo completo da comunicare al centralino: <strong>${c.address}</strong>.`,
      ],
    },
  ],
    { appendBeforeClosing: pianoEmergenzeEstesoBlock(c) }
  );
}

function doc07Isolation(c: ReturnType<typeof buildBodyContext>, doc: ResolvedDocument): string {
  return doc03to07Block(
    c,
    doc,
    [
    {
      h: "1. Finalità e principi",
      p: [
        `Il protocollo stabilisce misure <strong>proporzionate</strong> per la gestione di pazienti con <strong>patologie contagiose o potenzialmente tali</strong>, nel rispetto della sicurezza del paziente, degli operatori e degli altri utenti di <strong>${c.studioName}</strong>, in adempimento al requisito <strong>${escapeHtml(doc.code)}</strong>.`,
      ],
    },
    {
      h: "2. Valutazione anamnestica e screening organizzativo",
      p: [
        "All’accettazione si raccoglie l’anamnesi rilevante e si valuta la presenza di sintomatologia compatibile con patologie trasmissibili; per le prestazioni non urgenti si può <strong>differire</strong> l’accesso secondo criteri documentati internamente.",
      ],
    },
    {
      h: "3. DPI, igiene delle mani, aerazione e sanificazione",
      p: [
        "Uso di DPI secondo rischio e tipo di procedura; igiene delle mani; ventilazione dei locali; sanificazione delle superfici e delle attrezzature secondo prodotti e modalità registrate, con integrazione al documento su pulizia e sanificazione ambienti.",
      ],
    },
    {
      h: "4. Comunicazioni istituzionali e documentazione",
      p: [
        "Flussi verso ATS / Igiene e sanità pubblica quando obbligatori; registrazione interna delle decisioni assunte. In caso di epidemie o circolari regionali, il protocollo è aggiornato di conseguenza.",
      ],
    },
    {
      h: "5. Integrazione con piano emergenze e formazione",
      p: [
        "Allineamento con il piano emergenze intra moenia e formazione periodica del personale su aggiornamenti normativi e circolari applicabili.",
      ],
    },
  ],
    { appendBeforeClosing: protocolloIsolamentoEstesoBlock(c) }
  );
}

function doc27InternsPresent(c: ReturnType<typeof buildBodyContext>, doc: ResolvedDocument): string {
  return doc03to07Block(c, doc, [
    {
      h: "1. Finalità e ambito",
      p: [
        `La struttura <strong>${c.studioName}</strong> ospita <strong>tirocinanti, specializzandi o altri soggetti formativi</strong> che intervengono nel percorso assistenziale. Il documento definisce le modalità di <strong>identificazione, tracciabilità e governo</strong> del rischio, in adempimento al requisito <strong>${escapeHtml(doc.code)}</strong>.`,
      ],
    },
    {
      h: "2. Identificazione anagrafica e amministrativa",
      p: [
        "Per ciascun soggetto sono conservati: <strong>estremi anagrafici</strong>, <strong>ente di provenienza</strong>, <strong>convenzione o protocollo formativo</strong>, <strong>tutor struttura / tutor accademico</strong>, <strong>coperture assicurative</strong> e <strong>limitazioni operative</strong> (prestazioni consentite, supervisione obbligatoria).",
      ],
    },
    {
      h: "3. Privacy, segreto professionale e accesso ai dati",
      p: [
        "L’accesso a dati clinici è consentito solo con <strong>autorizzazione</strong> e per finalità formative strettamente necessarie; sono fornite <strong>istruzioni scritte</strong> su riservatezza, conservazione e divieto di riproduzione non autorizzata.",
      ],
    },
    {
      h: "4. Sicurezza sul lavoro e formazione",
      p: [
        "Formazione su <strong>rischi biologici</strong>, <strong>DPI</strong>, <strong>movimentazione manuale</strong>, <strong>ergonomia</strong> e percorsi emergenza; eventuali vaccinazioni o sorveglianza sanitaria secondo indicazioni del medico competente.",
      ],
    },
    {
      h: "5. Registro presenze, valutazione e chiusura del percorso",
      p: [
        "È tenuto un <strong>registro presenze</strong> e delle attività svolte; a fine percorso si documenta l’esito formativo e si aggiorna l’Allegato A1 se cambiano i soggetti abilitati.",
      ],
    },
    {
      h: "6. Personale strutturale (riferimento)",
      p: [
        "Elenco del personale di studio (titolare, collaboratori, segreteria, ASO, ecc.) rispetto al quale i tirocinanti sono integrati:",
      ],
    },
  ]) + c.staffSectionHtml;
}

/** Corpo HTML articolato (stile modulo ALL. A1) con dati utente. */
export function buildArticulatedBody(doc: ResolvedDocument, data: AllegatoFormData): string {
  const c = buildBodyContext(data);

  if (doc.variant === "ionizing_absence" && doc.order === 18) return ionizingLong(c, doc);
  if (doc.variant === "gas_not_applicable" && doc.order === 22) return gasLong(c, doc);
  if (doc.variant === "interns_not_applicable" && doc.order === 27) return internsLong(c, doc);

  switch (doc.order) {
    case 1:
      return doc01Organization(c);
    case 2:
      return doc02PrivacyInfo(c);
    case 3:
      return doc03Quality(c, doc);
    case 4:
      return doc04Complaints(c, doc);
    case 5:
      return doc05CareDelivery(c, doc);
    case 6:
      return doc06Emergency(c, doc);
    case 7:
      return doc07Isolation(c, doc);
    case 8:
      return doc08ClinicalDocs(c, doc);
    case 9:
      return doc09MaintenanceCharge(c, doc);
    case 10:
      return doc10Inventory(c, doc);
    case 11:
      return doc11MaintenancePlan(c, doc);
    case 12:
      return doc12TechSheets(c, doc);
    case 23:
      return explosivesNotApplicableBlock(c, doc);
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 18:
    case 19:
    case 20:
    case 21:
    case 22:
    case 24:
      return buildTechnicalForOrder(c, doc);
    case 25:
      return doc25Insurance(c);
    case 26:
      return doc26ServiceCharter(c);
    case 27:
      return doc27InternsPresent(c, doc);
    case 28:
      return doc28ReportCsat(c);
    case 29:
      return doc29RiskPlan(c);
    case 30:
      return doc30Cleaning(c);
    case 31:
      return doc31Biological(c);
    case 32:
      return doc32NearMiss(c);
    default:
      return technicalComplianceBlock(c, doc, GENERIC_TECHNICAL_SPEC);
  }
}
