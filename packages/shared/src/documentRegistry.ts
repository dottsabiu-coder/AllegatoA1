import type { AllegatoFormData } from "./schema.js";

/** Voce registry: ordine fisso Allegato A1 (1–32). Titoli allineati al modulo regionale (ALL. A1). */
export type DocumentRegistryEntry = {
  order: number;
  code: string;
  title: string;
};

export const DOCUMENT_REGISTRY: readonly DocumentRegistryEntry[] = [
  {
    order: 1,
    code: "1A.01.03.01",
    title:
      "Documento che definisce ed esplicita l'organizzazione e le politiche di gestione delle risorse (analisi dei principali processi per l'individuazione delle fasi nelle quali è possibile che si verifichino disservizi)",
  },
  { order: 2, code: "1A.01.04.01", title: "Documentazione inerente il sistema informativo" },
  {
    order: 3,
    code: "1A.01.05.01",
    title:
      "Documento/programma che descrive le modalità per la valutazione e il miglioramento della qualità delle prestazioni e dei servizi erogati",
  },
  {
    order: 4,
    code: "1A.01.06.01",
    title: "Procedura per la presentazione e gestione di reclami, osservazioni e suggerimenti.",
  },
  {
    order: 5,
    code: "1A.02.02.01",
    title: "Documento/procedura che descrive le modalità di erogazione dell'assistenza",
  },
  { order: 6, code: "1A.02.02.02", title: "Piano per la gestione delle emergenze" },
  {
    order: 7,
    code: "1A.02.02.03",
    title: "Protocollo per l'isolamento di pazienti con patologie contagiose o potenzialmente tali",
  },
  {
    order: 8,
    code: "1A.02.05.01",
    title:
      "Procedura che definisce i requisiti per la redazione, l'aggiornamento, la conservazione e la verifica della documentazione sanitaria nonché le modalità di controllo.",
  },
  { order: 9, code: "1A.03.01.01", title: "Documento formale di incarico del responsabile della Manutenzione" },
  {
    order: 10,
    code: "1A.03.02.01",
    title:
      "Inventario delle attrezzature aggiornato e verificato annualmente e procedura per l'identificazione delle attrezzature",
  },
  {
    order: 11,
    code: "1A.03.02.02",
    title:
      "Piano per la gestione e la manutenzione (ordinaria e straordinaria) delle strutture, impianti, attrezzature e apparecchiature biomediche.",
  },
  {
    order: 12,
    code: "1A.03.02.03",
    title:
      "Documentazione tecnica relativa alle singole attrezzature e apparecchiature immediatamente disponibile agli operatori interessati e alla funzione preposta alla manutenzione",
  },
  {
    order: 13,
    code: "1A.03.05.01",
    title:
      "Documentazione tecnica, in relazione alla tipologia delle attività svolte, attestante il possesso dei requisiti previsti dalle vigenti leggi in materia di caratteristiche ambientali e di accessibilità",
  },
  {
    order: 14,
    code: "1A.03.05.02",
    title:
      "Documentazione tecnica, in relazione alla tipologia delle attività svolte, attestante il possesso dei requisiti previsti dalle vigenti leggi in materia di protezione antincendio",
  },
  {
    order: 15,
    code: "1A.03.05.03",
    title:
      "Documentazione tecnica, in relazione alla tipologia delle attività svolte, attestante il possesso dei requisiti previsti dalle vigenti leggi in materia di protezione acustica",
  },
  {
    order: 16,
    code: "1A.03.05.04",
    title:
      "Documentazione tecnica, in relazione alla tipologia delle attività svolte, attestante il possesso dei requisiti previsti dalle vigenti leggi in materia di sicurezza elettrica e continuità elettrica",
  },
  {
    order: 17,
    code: "1A.03.05.05",
    title:
      "Documentazione tecnica, in relazione alla tipologia delle attività svolte, attestante il possesso dei requisiti previsti dalle vigenti leggi in materia di sicurezza anti-infortunistica",
  },
  {
    order: 18,
    code: "1A.03.05.06",
    title:
      "Documentazione tecnica, in relazione alla tipologia delle attività svolte, attestante il possesso dei requisiti previsti dalle vigenti leggi in materia di protezione dai rischi di radiazioni ionizzanti",
  },
  {
    order: 19,
    code: "1A.03.05.07",
    title:
      "Documentazione tecnica, in relazione alla tipologia delle attività svolte, attestante il possesso dei requisiti previsti dalle vigenti leggi in materia di eliminazione delle barriere architettoniche",
  },
  {
    order: 20,
    code: "1A.03.05.08",
    title:
      "Documentazione tecnica, in relazione alla tipologia delle attività svolte, attestante il possesso dei requisiti previsti dalle vigenti leggi in materia di smaltimento dei rifiuti",
  },
  {
    order: 21,
    code: "1A.03.05.09",
    title:
      "Documentazione tecnica, in relazione alla tipologia delle attività svolte, attestante il possesso dei requisiti previsti dalle vigenti leggi in materia di condizioni microclimatiche",
  },
  {
    order: 22,
    code: "1A.03.05.10",
    title:
      "Documentazione tecnica, in relazione alla tipologia delle attività svolte, attestante il possesso dei requisiti previsti dalle vigenti leggi in materia di impianti di distribuzione dei gas",
  },
  {
    order: 23,
    code: "1A.03.05.11",
    title:
      "Documentazione tecnica, in relazione alla tipologia delle attività svolte, attestante il possesso dei requisiti previsti dalle vigenti leggi in materia di materiali esplodenti",
  },
  {
    order: 24,
    code: "1A.03.05.12",
    title:
      "Documentazione tecnica, in relazione alla tipologia delle attività svolte, attestante il possesso dei requisiti previsti dalle vigenti leggi in materia di protezione antisismica",
  },
  { order: 25, code: "1A.04.12.04", title: "Obblighi assicurativi definiti dalla normativa applicabile" },
  { order: 26, code: "1A.05.03.01", title: "Carta dei servizi" },
  {
    order: 27,
    code: "1A.05.03.03",
    title:
      "Modalità identificazione di tirocinanti, specializzandi e altri soggetti che intervengono nel percorso assistenziale.",
  },
  {
    order: 28,
    code: "1A.05.03.05",
    title:
      "Report criticità riscontrate dall'analisi dei reclami e dei risultati delle indagini di customer satisfaction e relativi Piani di intervento",
  },
  { order: 29, code: "1A.06.02.01", title: "Piano aziendale per la gestione del rischio" },
  { order: 30, code: "1A.06.02.02", title: "Procedura per la pulizia e sanificazione degli ambienti" },
  {
    order: 31,
    code: "1A.06.02.03",
    title:
      "Procedura per la protezione dagli incidenti per esposizione a materiale biologico o altre sostanze pericolose",
  },
  {
    order: 32,
    code: "1A.06.02.04",
    title:
      'Sistema (Piani di intervento/report) per l\'identificazione e la segnalazione di "near miss", eventi avversi ed eventi sentinella',
  },
] as const;

export type DocumentContentVariant =
  | "standard"
  | "ionizing_absence"
  | "gas_not_applicable"
  | "interns_not_applicable";

export type ResolvedDocument = DocumentRegistryEntry & {
  variant: DocumentContentVariant;
};

/** Determina varianti di testo (RX assenti, gas assenti, assenza tirocinanti). */
export function resolveDocuments(data: AllegatoFormData): ResolvedDocument[] {
  return DOCUMENT_REGISTRY.map((doc) => {
    let variant: DocumentContentVariant = "standard";
    if (doc.order === 18 && !data.facility.hasIonizingRadiation) {
      variant = "ionizing_absence";
    }
    if (doc.order === 22 && !data.facility.hasMedicalGas) {
      variant = "gas_not_applicable";
    }
    if (doc.order === 27 && !data.facility.hasInterns) {
      variant = "interns_not_applicable";
    }
    return { ...doc, variant };
  });
}
