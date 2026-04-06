import type { AllegatoFormData } from "@allegato-a1/shared";
import { escapeHtml } from "../escape.js";

/** Variabili testuali già escapate per inclusione in HTML. */
export type BodyContext = {
  studioName: string;
  ownerName: string;
  address: string;
  vat: string;
  openingLine: string;
  revision: string;
  hasRx: boolean;
  hasGas: boolean;
  hasInterns: boolean;
  staffSectionHtml: string;
  equipmentSectionHtml: string;
  insuranceSectionHtml: string;
  premisesSectionHtml: string;
  externalSectionHtml: string;
  /** Blocco software / backup / analisi rischi per doc. 2. */
  itProfileSectionHtml: string;
};

function peopleList(title: string, rows: { name: string; role?: string }[]): string {
  if (rows.length === 0) {
    return `<p><em>Nessun profilo dichiarato per la voce «${escapeHtml(title)}»; la struttura può operare esclusivamente con il titolare o integrare in seguito.</em></p>`;
  }
  const li = rows
    .map(
      (p) =>
        `<li><strong>${escapeHtml(p.name)}</strong>${p.role?.trim() ? ` — ${escapeHtml(p.role.trim())}` : ""}</li>`
    )
    .join("");
  return `<h3>${escapeHtml(title)}</h3><ul>${li}</ul>`;
}

export function buildBodyContext(data: AllegatoFormData): BodyContext {
  const studioName = escapeHtml(data.studio.structureName);
  const ownerName = escapeHtml(data.studio.ownerDisplayName);
  const address = escapeHtml(data.studio.addressLine);
  const vat = escapeHtml(data.studio.vatOrFiscalCode);
  const openingLine = data.studio.openingOrAuthDate?.trim()
    ? `<p>Data di riferimento apertura / autorizzazione dichiarata: <strong>${escapeHtml(data.studio.openingOrAuthDate.trim())}</strong>.</p>`
    : "";

  const staffSectionHtml = [
    peopleList("Segreteria e accoglienza amministrativa", data.staff.secretarial),
    peopleList("Assistenti di studio odontoiatrico (ASO) e affini", data.staff.aso),
    peopleList("Addetti alle pulizie e sanificazione ambienti", data.staff.cleaning),
  ].join("");

  const eq = data.equipment.items;
  let equipmentSectionHtml: string;
  if (eq.length === 0) {
    equipmentSectionHtml =
      "<p><em>L’inventario delle attrezzature inserito nel gestionale risulta vuoto al momento della generazione; si raccomanda di integrarlo prima della visita del GdV.</em></p>";
  } else {
    const rows = eq
      .map(
        (e) =>
          `<tr><td>${escapeHtml(e.category)}</td><td>${escapeHtml(e.brand ?? "—")}</td><td>${escapeHtml(e.model ?? "—")}</td><td>${escapeHtml(e.serialNumber ?? "—")}</td><td>${escapeHtml(e.notes ?? "—")}</td></tr>`
      )
      .join("");
    equipmentSectionHtml = `<table class="data-table" style="width:100%;border-collapse:collapse;font-size:10pt;margin:0.6rem 0;"><thead><tr><th style="border:1px solid #333;padding:0.25rem;">Tipologia</th><th style="border:1px solid #333;padding:0.25rem;">Marca</th><th style="border:1px solid #333;padding:0.25rem;">Modello</th><th style="border:1px solid #333;padding:0.25rem;">S/N</th><th style="border:1px solid #333;padding:0.25rem;">Note</th></tr></thead><tbody>${rows}</tbody></table>`;
  }
  if (data.equipment.electricalInstaller?.trim()) {
    equipmentSectionHtml += `<p>Ditta installazione / verifica impianto elettrico dichiarata: <strong>${escapeHtml(data.equipment.electricalInstaller.trim())}</strong>.</p>`;
  }
  if (data.equipment.fireMaintenanceCompany?.trim()) {
    equipmentSectionHtml += `<p>Ditta manutenzione estintori / impianti antincendio dichiarata: <strong>${escapeHtml(data.equipment.fireMaintenanceCompany.trim())}</strong>.</p>`;
  }

  const ins = data.insurance;
  const insuranceSectionHtml = `<p>Compagnia: <strong>${escapeHtml(ins.company)}</strong>; numero polizza <strong>${escapeHtml(ins.policyNumber)}</strong>${ins.coverageLimit?.trim() ? `; massimale dichiarato: ${escapeHtml(ins.coverageLimit.trim())}` : ""}${ins.expiryDate?.trim() ? `; scadenza: ${escapeHtml(ins.expiryDate.trim())}` : ""}, in coerenza con gli obblighi di copertura assicurativa per l’esercizio dell’attività sanitaria.</p>`;

  const pr = data.premises;
  const premisesBits: string[] = [];
  if (pr.surfaceSqm != null) premisesBits.push(`superficie complessiva indicata: <strong>${pr.surfaceSqm}</strong> m²`);
  if (pr.operativeRooms != null) premisesBits.push(`sale operative: <strong>${pr.operativeRooms}</strong>`);
  premisesBits.push(`sala d’attesa: <strong>${pr.hasWaitingRoom ? "sì" : "no"}</strong>`);
  if (pr.bathroomCount != null) premisesBits.push(`servizi igienici: <strong>${pr.bathroomCount}</strong>`);
  premisesBits.push(`area/locale dedicato alla sterilizzazione: <strong>${pr.hasSterilizationRoom ? "sì" : "no"}</strong>`);
  const premisesSectionHtml = `<p>${premisesBits.join("; ")}.</p>${pr.notes?.trim() ? `<p>Note sui locali: ${escapeHtml(pr.notes.trim())}</p>` : ""}`;

  const ex = data.external;
  const extLines: string[] = [];
  if (ex.wasteCompanyName?.trim())
    extLines.push(
      `Smaltimento rifiuti: <strong>${escapeHtml(ex.wasteCompanyName.trim())}</strong>${ex.wasteCompanyVat?.trim() ? ` (P.IVA ${escapeHtml(ex.wasteCompanyVat.trim())})` : ""}`
    );
  if (ex.rsppName?.trim()) extLines.push(`RSPP / consulente sicurezza: <strong>${escapeHtml(ex.rsppName.trim())}</strong>`);
  if (ex.occupationalPhysicianName?.trim())
    extLines.push(`Medico competente: <strong>${escapeHtml(ex.occupationalPhysicianName.trim())}</strong>`);
  if (ex.medicalPhysicsExpertName?.trim())
    extLines.push(`Esperto in fisica medica: <strong>${escapeHtml(ex.medicalPhysicsExpertName.trim())}</strong>`);
  const externalSectionHtml =
    extLines.length > 0
      ? `<ul>${extLines.map((l) => `<li>${l}</li>`).join("")}</ul>`
      : "<p><em>Fornitori esterni critici non dichiarati nel modulo; integrare prima della verifica.</em></p>";

  const it = data.itProfile ?? {};
  const itParts: string[] = [];
  if (it.clinicalSoftware?.trim())
    itParts.push(`<strong>Software cartella clinica / clinico:</strong> ${escapeHtml(it.clinicalSoftware.trim())}`);
  if (it.managementSoftware?.trim())
    itParts.push(`<strong>Software gestionale / amministrativo:</strong> ${escapeHtml(it.managementSoftware.trim())}`);
  if (it.osSummary?.trim())
    itParts.push(`<strong>Sistemi operativi e postazioni:</strong> ${escapeHtml(it.osSummary.trim())}`);
  if (it.backupModality?.trim())
    itParts.push(`<strong>Modalità di backup e conservazione:</strong> ${escapeHtml(it.backupModality.trim())}`);
  if (it.riskAnalysisSummary?.trim())
    itParts.push(`<strong>Sintesi analisi dei rischi privacy / sicurezza logica:</strong> ${escapeHtml(it.riskAnalysisSummary.trim())}`);
  const itProfileSectionHtml =
    itParts.length > 0
      ? `<div class="it-profile-block"><h3>Dati dichiarati sul sistema informativo</h3><ul>${itParts.map((p) => `<li>${p}</li>`).join("")}</ul></div>`
      : `<p><em>Nel modulo web non sono stati inseriti i dettagli software/backup/analisi rischi: compilare la sezione «Sistema informativo (privacy)» o integrare a mano questo capitolo prima della visita del GdV.</em></p>`;

  return {
    studioName,
    ownerName,
    address,
    vat,
    openingLine,
    revision: escapeHtml(data.meta.revisionLabel),
    hasRx: data.facility.hasIonizingRadiation,
    hasGas: data.facility.hasMedicalGas,
    hasInterns: data.facility.hasInterns,
    staffSectionHtml,
    equipmentSectionHtml,
    insuranceSectionHtml,
    premisesSectionHtml,
    externalSectionHtml,
    itProfileSectionHtml,
  };
}
