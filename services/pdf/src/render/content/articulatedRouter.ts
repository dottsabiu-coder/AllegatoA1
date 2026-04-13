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
import { teresiDoc03MainHtml } from "./teresi/doc03Body.js";
import { teresiDoc04MainHtml } from "./teresi/doc04Body.js";
import { teresiDoc06MainHtml } from "./teresi/doc06Body.js";
import { teresiDoc07MainHtml } from "./teresi/doc07Body.js";
import { teresiDoc08MainHtml } from "./teresi/doc08Body.js";
import { teresiDoc09MainHtml } from "./teresi/doc09Body.js";
import { teresiDoc10PreambleHtml } from "./teresi/doc10Body.js";
import { teresiDoc11MainHtml } from "./teresi/doc11Body.js";
import { teresiDoc12MainHtml } from "./teresi/doc12Body.js";
import { intestazioneRequisitoSpecifico } from "./normativePreamble.js";
import { maintenanceVerificationPlanBlock, pianoEmergenzeEstesoBlock } from "./blocksForms.js";

function doc08ClinicalDocs(c: ReturnType<typeof buildBodyContext>, doc: ResolvedDocument): string {
  return intestazioneRequisitoSpecifico(doc.code, doc.title) + teresiDoc08MainHtml(c);
}

function doc09MaintenanceCharge(c: ReturnType<typeof buildBodyContext>, doc: ResolvedDocument): string {
  return intestazioneRequisitoSpecifico(doc.code, doc.title) + teresiDoc09MainHtml(c);
}

function doc10Inventory(c: ReturnType<typeof buildBodyContext>, doc: ResolvedDocument): string {
  return (
    intestazioneRequisitoSpecifico(doc.code, doc.title) +
    teresiDoc10PreambleHtml(c) +
    c.equipmentSectionHtml +
    `<p>Riferimento revisione documentale: <strong>${c.revision}</strong>.</p>`
  );
}

function doc11MaintenancePlan(c: ReturnType<typeof buildBodyContext>, doc: ResolvedDocument): string {
  return (
    intestazioneRequisitoSpecifico(doc.code, doc.title) +
    teresiDoc11MainHtml(c) +
    maintenanceVerificationPlanBlock()
  );
}

function doc12TechSheets(c: ReturnType<typeof buildBodyContext>, doc: ResolvedDocument): string {
  return intestazioneRequisitoSpecifico(doc.code, doc.title) + teresiDoc12MainHtml(c);
}

function doc03Quality(c: ReturnType<typeof buildBodyContext>, doc: ResolvedDocument): string {
  return intestazioneRequisitoSpecifico(doc.code, doc.title) + teresiDoc03MainHtml(c);
}

function doc04Complaints(c: ReturnType<typeof buildBodyContext>, doc: ResolvedDocument): string {
  return intestazioneRequisitoSpecifico(doc.code, doc.title) + teresiDoc04MainHtml(c);
}

function doc05CareDelivery(c: ReturnType<typeof buildBodyContext>, doc: ResolvedDocument): string {
  return doc05ErogazioneAssistenzaTeresi(c, doc);
}

function doc06Emergency(c: ReturnType<typeof buildBodyContext>, doc: ResolvedDocument): string {
  return (
    intestazioneRequisitoSpecifico(doc.code, doc.title) +
    teresiDoc06MainHtml(c) +
    pianoEmergenzeEstesoBlock(c) +
    `<p>Riferimento revisione documentale: <strong>${c.revision}</strong>.</p>`
  );
}

function doc07Isolation(c: ReturnType<typeof buildBodyContext>, doc: ResolvedDocument): string {
  return intestazioneRequisitoSpecifico(doc.code, doc.title) + teresiDoc07MainHtml(c);
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
