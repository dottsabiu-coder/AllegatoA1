import type { AllegatoFormData } from "./schema.js";

/** Voce registry: ordine fisso Allegato A1 (1–32). */
export type DocumentRegistryEntry = {
  order: number;
  code: string;
  /** Titolo come da modulo; verificare su PDF ufficiale in `docs/normativa/`. */
  title: string;
};

export const DOCUMENT_REGISTRY: readonly DocumentRegistryEntry[] = [
  { order: 1, code: "1A.01.03.01", title: "Documento organizzazione e politiche risorse" },
  { order: 2, code: "1A.01.04.01", title: "Documentazione sistema informativo / Privacy" },
  { order: 3, code: "1A.01.05.01", title: "Documento valutazione e miglioramento qualità" },
  { order: 4, code: "1A.01.06.01", title: "Procedura gestione reclami" },
  { order: 5, code: "1A.02.02.01", title: "Documento erogazione assistenza" },
  { order: 6, code: "1A.02.02.02", title: "Piano gestione emergenze" },
  { order: 7, code: "1A.02.02.03", title: "Protocollo isolamento patologie contagiose" },
  { order: 8, code: "1A.02.05.01", title: "Procedura gestione documentazione sanitaria" },
  { order: 9, code: "1A.03.01.01", title: "Incarico responsabile manutenzione" },
  { order: 10, code: "1A.03.02.01", title: "Inventario attrezzature" },
  { order: 11, code: "1A.03.02.02", title: "Piano manutenzione strutture e apparecchiature" },
  { order: 12, code: "1A.03.02.03", title: "Documentazione tecnica attrezzature" },
  { order: 13, code: "1A.03.05.01", title: "Requisiti caratteristiche ambientali e accessibilità" },
  { order: 14, code: "1A.03.05.02", title: "Protezione antincendio" },
  { order: 15, code: "1A.03.05.03", title: "Protezione acustica" },
  { order: 16, code: "1A.03.05.04", title: "Sicurezza e continuità elettrica" },
  { order: 17, code: "1A.03.05.05", title: "Sicurezza anti-infortunistica e DVR" },
  { order: 18, code: "1A.03.05.06", title: "Protezione radiazioni ionizzanti" },
  { order: 19, code: "1A.03.05.07", title: "Eliminazione barriere architettoniche" },
  { order: 20, code: "1A.03.05.08", title: "Smaltimento rifiuti" },
  { order: 21, code: "1A.03.05.09", title: "Condizioni microclimatiche" },
  { order: 22, code: "1A.03.05.10", title: "Impianti distribuzione gas (se applicabile)" },
  { order: 23, code: "1A.03.05.11", title: "Dichiarazione materiali esplodenti (assenza)" },
  { order: 24, code: "1A.03.05.12", title: "Protezione antisismica" },
  { order: 25, code: "1A.04.12.04", title: "Obblighi assicurativi" },
  { order: 26, code: "1A.05.03.01", title: "Carta dei servizi" },
  { order: 27, code: "1A.05.03.03", title: "Modalità identificazione tirocinanti" },
  { order: 28, code: "1A.05.03.05", title: "Report criticità e customer satisfaction" },
  { order: 29, code: "1A.06.02.01", title: "Piano aziendale gestione rischio" },
  { order: 30, code: "1A.06.02.02", title: "Procedura pulizia e sanificazione" },
  { order: 31, code: "1A.06.02.03", title: "Procedura protezione incidenti materiale biologico" },
  {
    order: 32,
    code: "1A.06.02.04",
    title: 'Sistema segnalazione "near miss" ed eventi avversi',
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
