import type { AllegatoFormData, ResolvedDocument } from "@allegato-a1/shared";
import { escapeHtml } from "../escape.js";
import { buildBodyContext } from "./contextBuilder.js";
import {
  buildTechnicalForOrder,
  doc01Organization,
  doc02PrivacyInfo,
  doc03to07Block,
  doc25Insurance,
  doc26ServiceCharter,
  doc28ReportCsat,
  doc29RiskPlan,
  doc30Cleaning,
  doc31Biological,
  doc32NearMiss,
  gasLong,
  internsLong,
  ionizingLong,
  technicalComplianceBlock,
  GENERIC_TECHNICAL_SPEC,
} from "./longFormBodies.js";
import {
  complaintIntakeFormBlock,
  disserviziProcessTableBlock,
  pianoEmergenzeEstesoBlock,
  protocolloIsolamentoEstesoBlock,
  riferimentiNormativiErogazioneAssistenza,
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
        ],
      },
      {
        h: "7. Collegamento al sistema informativo e alle attrezzature",
        p: [
          "Le apparecchiature che producono output clinico (radiografia digitale, scanner, software di pianificazione) devono essere riconducibili in cartella; di seguito l’inventario dichiarato a supporto della tracciabilità strumentale:",
        ],
      },
    ]) + c.equipmentSectionHtml
  );
}

function doc09MaintenanceCharge(c: ReturnType<typeof buildBodyContext>, doc: ResolvedDocument): string {
  return doc03to07Block(c, doc, [
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
  ]);
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
          "Di seguito l’estratto generato dai dati inseriti nel modulo:",
        ],
      },
    ]) + c.equipmentSectionHtml
  );
}

function doc11MaintenancePlan(c: ReturnType<typeof buildBodyContext>, doc: ResolvedDocument): string {
  return (
    doc03to07Block(c, doc, [
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
          "Il fascicolo contiene <strong>contratti</strong>, <strong>rapportini</strong>, <strong>scadenze</strong> e, ove richiesto, <strong>certificati di verifica</strong> aggiornati. L’inventario sottostante supporta la congruenza tra beni censiti e piani di intervento.",
        ],
      },
      {
        h: "5. Inventario attrezzature (riferimento incrociato)",
        p: [
          "Tabella aggiornata dal gestionale:",
        ],
      },
    ]) + c.equipmentSectionHtml
  );
}

function doc12TechSheets(c: ReturnType<typeof buildBodyContext>, doc: ResolvedDocument): string {
  return (
    doc03to07Block(c, doc, [
      {
        h: "1. Finalità e accessibilità",
        p: [
          "La documentazione tecnica di fabbrica (manuali d’uso, <strong>dichiarazioni di conformità</strong>, <strong>certificati CE</strong> ove applicabili, schemi elettrici, bollettini del costruttore) è conservata in <strong>formato cartaceo e/o digitale</strong> e resa <strong>immediatamente disponibile</strong> agli operatori autorizzati e al responsabile della manutenzione.",
        ],
      },
      {
        h: "2. Contenuto minimo per tipologia",
        p: [
          "Per apparecchiature biomedicali: manuale utente, avvertenze di sicurezza, software e versioni ove rilevanti. Per strumentazione odontoiatrica: limiti d’uso, cicli di manutenzione consigliati dal costruttore, accessori omologati.",
        ],
      },
      {
        h: "3. Aggiornamenti, recall e comunicazioni del fabbricante",
        p: [
          "La struttura conserva le <strong>comunicazioni</strong> del fabbricante (aggiornamenti, recall, field safety notices) e documenta le azioni intraprese. È utile associare ogni apparecchiatura a un <strong>fascicolo digitale/cartaceo</strong> dedicato.",
        ],
      },
      {
        h: "4. Correlazione con l’inventario",
        p: [
          "L’elenco seguente consente di verificare la coerenza tra beni presenti e documentazione richiesta:",
        ],
      },
    ]) + c.equipmentSectionHtml
  );
}

function doc03Quality(c: ReturnType<typeof buildBodyContext>, doc: ResolvedDocument): string {
  return doc03to07Block(c, doc, [
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
        "Pianificazione delle azioni, esecuzione controllata, verifica dei risultati rispetto agli obiettivi, aggiornamento degli standard. Le azioni correttive e preventive sono registrate con causa radice, responsabile e scadenza.",
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
  return (
    doc03to07Block(c, doc, [
    {
      h: "1. Ambito",
      p: [
        "La procedura regola presentazione, registrazione, analisi e risposta a reclami, osservazioni e suggerimenti, garantendo tempi congrui e tracciabilità.",
      ],
    },
    {
      h: "2. Canali e tempi",
      p: [
        "Sportello fisico, posta elettronica e moduli cartacei/digitali. Risposta motivata nei termini previsti dalla normativa di settore e dalla carta dei servizi.",
      ],
    },
    {
      h: "3. Segreto e conservazione",
      p: [
        "I dati sono trattati nel rispetto della privacy; gli atti sono conservati per il periodo necessario alle verifiche e alle eventuali controversie.",
      ],
    },
  ]) +
    complaintIntakeFormBlock()
  );
}

function doc05CareDelivery(c: ReturnType<typeof buildBodyContext>, doc: ResolvedDocument): string {
  return (
    doc03to07Block(c, doc, [
    {
      h: "1. Percorso assistenziale",
      p: [
        `Il documento descrive le modalità di erogazione dell’assistenza in <strong>${c.studioName}</strong>: accoglienza, informazioni al paziente, consenso informato, erogazione delle prestazioni, dimissione e follow-up.`,
      ],
    },
    {
      h: "2. Continuità e sicurezza",
      p: [
        "Coordinamento tra professionisti, gestione delle urgenze intra-moenia, rinvio alle strutture ospedaliere ove necessario.",
      ],
    },
  ]) +
    riferimentiNormativiErogazioneAssistenza() +
    disserviziProcessTableBlock(c)
  );
}

function doc06Emergency(c: ReturnType<typeof buildBodyContext>, doc: ResolvedDocument): string {
  return (
    doc03to07Block(c, doc, [
    {
      h: "1. Piano emergenze",
      p: [
        "Definizione di scenari (sincope, sanguinamento, arresto cardiaco, incidente strumentale), numeri di emergenza, ruoli, dotazioni di primo soccorso e percorsi di evacuazione.",
      ],
    },
    {
      h: "2. Formazione e simulazioni",
      p: [
        "Il personale è formato al BLSD ove richiesto; esercitazioni periodiche documentate migliorano la prontezza.",
      ],
    },
  ]) +
    pianoEmergenzeEstesoBlock(c)
  );
}

function doc07Isolation(c: ReturnType<typeof buildBodyContext>, doc: ResolvedDocument): string {
  return (
    doc03to07Block(c, doc, [
    {
      h: "1. Protocollo di isolamento",
      p: [
        "Misure precauzionali per pazienti con patologie contagiose o potenzialmente tali: scheduling differito, uso di DPI, aerazione, sanificazione straordinaria e comunicazione ai servizi competenti ove indicato.",
      ],
    },
    {
      h: "2. Integrazione con piano emergenze",
      p: [
        "Allineamento con il piano emergenze e con le indicazioni delle autorità sanitarie in caso di focolai.",
      ],
    },
  ]) +
    protocolloIsolamentoEstesoBlock(c)
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
    case 23:
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
