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
  }),
  staff: z.object({
    secretarial: z.array(personRefSchema).default([]),
    aso: z.array(personRefSchema).default([]),
    cleaning: z.array(personRefSchema).default([]),
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
  }),
  facility: z.object({
    hasIonizingRadiation: z.boolean().default(false),
    hasMedicalGas: z.boolean().default(false),
    hasInterns: z.boolean().default(false),
  }),
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
  },
  staff: { secretarial: [], aso: [], cleaning: [] },
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
  },
  facility: { hasIonizingRadiation: false, hasMedicalGas: false, hasInterns: false },
};
