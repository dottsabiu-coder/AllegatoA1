import { z } from "zod";

const optionalNonEmptyString = z.string().trim().optional().or(z.literal(""));

export const personRefSchema = z.object({
  name: z.string().trim().min(1, "Nome obbligatorio"),
  role: optionalNonEmptyString,
});

export const equipmentItemSchema = z.object({
  category: z.string().trim().min(1),
  brand: optionalNonEmptyString,
  model: optionalNonEmptyString,
  serialNumber: optionalNonEmptyString,
  notes: optionalNonEmptyString,
});

export const allegatoFormSchema = z.object({
  meta: z.object({
    revisionLabel: z.string().trim().default("REV. 1/2024"),
    generatedAt: z.string().datetime().optional(),
  }),
  studio: z.object({
    structureName: z.string().trim().min(1, "Nome struttura obbligatorio"),
    ownerDisplayName: z.string().trim().min(1, "Titolare obbligatorio"),
    addressLine: z.string().trim().min(1, "Indirizzo obbligatorio"),
    vatOrFiscalCode: z.string().trim().min(1, "P.IVA / Codice fiscale obbligatorio"),
    openingOrAuthDate: z.string().trim().optional(),
    /** Carta dei servizi / front office (documento 26). */
    phone: optionalNonEmptyString,
    email: optionalNonEmptyString,
    /** Es. «lun–gio 9:00–13:00, 15:00–19:00». */
    openingHours: optionalNonEmptyString,
  }),
  staff: z.object({
    secretarial: z.array(personRefSchema).default([]),
    aso: z.array(personRefSchema).default([]),
    /** Collaboratori ortodontisti (professionisti con partita IVA / collaborazione). */
    orthodontists: z.array(personRefSchema).default([]),
    /** @deprecated Non più riportato nel PDF (nessun accesso ai PC); mantenuto per compatibilità dati. */
    cleaning: z.array(personRefSchema).default([]),
    /** Commercialista / consulente fiscale con accesso profilato al gestionale (solo area contabile). */
    accountant: z.array(personRefSchema).default([]),
  }),
  equipment: z.object({
    items: z.array(equipmentItemSchema).default([]),
    electricalInstaller: optionalNonEmptyString,
    fireMaintenanceCompany: optionalNonEmptyString,
  }),
  external: z.object({
    wasteCompanyName: optionalNonEmptyString,
    wasteCompanyVat: optionalNonEmptyString,
    rsppName: optionalNonEmptyString,
    occupationalPhysicianName: optionalNonEmptyString,
    medicalPhysicsExpertName: optionalNonEmptyString,
  }),
  insurance: z.object({
    company: z.string().trim().min(1, "Compagnia assicurativa obbligatoria"),
    policyNumber: z.string().trim().min(1, "Numero polizza obbligatorio"),
    coverageLimit: optionalNonEmptyString,
    expiryDate: z.string().trim().optional(),
  }),
  premises: z.object({
    surfaceSqm: z.number().positive().optional(),
    operativeRooms: z.number().int().nonnegative().optional(),
    hasWaitingRoom: z.boolean().default(true),
    bathroomCount: z.number().int().nonnegative().optional(),
    hasSterilizationRoom: z.boolean().default(false),
    notes: optionalNonEmptyString,
    /** Doc. 13 — ubicazione (es. piano terra, ingresso da via …). */
    floorAndAccess: optionalNonEmptyString,
    /** Doc. 13 — riferimenti catastali / NCEU. */
    cadastralReference: optionalNonEmptyString,
    /** Doc. 13 — destinazione d’uso, agibilità, atti comunali (testo libero). */
    municipalTitlesSummary: optionalNonEmptyString,
    /** Doc. 13 — ulteriori dichiarazioni (scarichi, emissioni, VVF, ecc.). */
    environmentalExtraSummary: optionalNonEmptyString,
  }),
  facility: z.object({
    hasIonizingRadiation: z.boolean().default(false),
    hasMedicalGas: z.boolean().default(false),
    hasInterns: z.boolean().default(false),
  }),
  /** Dettagli opzionali per il documento sul sistema informativo / privacy (requisito 1A.01.04.01). */
  itProfile: z
    .object({
      clinicalSoftware: z.string().trim().optional(),
      managementSoftware: z.string().trim().optional(),
      osSummary: z.string().trim().optional(),
      backupModality: z.string().trim().optional(),
      riskAnalysisSummary: z.string().trim().optional(),
      /** PC e periferiche hardware (documento privacy — § hardware); distinte dalle attrezzature cliniche. */
      peripherals: z.array(equipmentItemSchema).default([]),
    })
    .default({}),
});

export type AllegatoFormData = z.infer<typeof allegatoFormSchema>;
export type PersonRef = z.infer<typeof personRefSchema>;
export type EquipmentItem = z.infer<typeof equipmentItemSchema>;

export const defaultAllegatoFormData: AllegatoFormData = {
  meta: { revisionLabel: "REV. 1/2024", generatedAt: undefined },
  studio: {
    structureName: "",
    ownerDisplayName: "",
    addressLine: "",
    vatOrFiscalCode: "",
    openingOrAuthDate: "",
    phone: "",
    email: "",
    openingHours: "",
  },
  staff: { secretarial: [], aso: [], orthodontists: [], cleaning: [], accountant: [] },
  equipment: { items: [], electricalInstaller: "", fireMaintenanceCompany: "" },
  external: {
    wasteCompanyName: "",
    wasteCompanyVat: "",
    rsppName: "",
    occupationalPhysicianName: "",
    medicalPhysicsExpertName: "",
  },
  insurance: { company: "", policyNumber: "", coverageLimit: "", expiryDate: "" },
  premises: {
    surfaceSqm: undefined,
    operativeRooms: undefined,
    hasWaitingRoom: true,
    bathroomCount: undefined,
    hasSterilizationRoom: false,
    notes: "",
    floorAndAccess: "",
    cadastralReference: "",
    municipalTitlesSummary: "",
    environmentalExtraSummary: "",
  },
  facility: { hasIonizingRadiation: false, hasMedicalGas: false, hasInterns: false },
  itProfile: { peripherals: [] },
};
