import {
  allegatoFormSchema,
  type AllegatoFormData,
  type EquipmentItem,
  type PersonRef,
} from "@allegato-a1/shared";

function sanitizePayload(data: AllegatoFormData): AllegatoFormData {
  const people = (rows: PersonRef[]) => rows.filter((p) => p.name.trim().length > 0);
  const items = (rows: EquipmentItem[]) => rows.filter((r) => r.category.trim().length > 0);
  return {
    ...data,
    staff: {
      secretarial: people(data.staff.secretarial),
      aso: people(data.staff.aso),
      orthodontists: people(data.staff.orthodontists),
      cleaning: people(data.staff.cleaning),
      accountant: people(data.staff.accountant),
    },
    equipment: {
      ...data.equipment,
      items: items(data.equipment.items),
    },
  };
}

function getEndpoint(): string {
  const configured = import.meta.env.VITE_PDF_API_URL as string | undefined;
  if (configured?.trim()) {
    return `${configured.replace(/\/$/, "")}/generate`;
  }
  if (import.meta.env.DEV) {
    return "/api/pdf/generate";
  }
  throw new Error(
    "VITE_PDF_API_URL non impostato: in produzione su Vercel imposta l'URL pubblico del servizio PDF (Railway)."
  );
}

export async function generatePdfPayload(data: AllegatoFormData): Promise<Blob> {
  const parsed = allegatoFormSchema.safeParse(sanitizePayload(data));
  if (!parsed.success) {
    const msg = JSON.stringify(parsed.error.flatten(), null, 2);
    throw new Error(`Dati non validi:\n${msg}`);
  }

  const res = await fetch(getEndpoint(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parsed.data),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PDF service: ${res.status} ${text}`);
  }

  return res.blob();
}
