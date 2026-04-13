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
  /** Elenco periferiche / postazioni PC per il doc. privacy (non attrezzature cliniche). */
  peripheralsSectionHtml: string;
  insuranceSectionHtml: string;
  premisesSectionHtml: string;
  externalSectionHtml: string;
  /** Blocco software / backup / analisi rischi per doc. 2. */
  itProfileSectionHtml: string;
  /** Frase contratto manutenzione presidi antincendio (doc. 14), da dati modulo. */
  fireMaintenanceContractClauseHtml: string;
  /** Frase contratto smaltimento rifiuti (doc. 20), da dati modulo. */
  wasteDisposalContractClauseHtml: string;
  /** Blocco HTML elenco titoli / catasto per doc. 13 (vuoto se nessun campo compilato). */
  premisesLegalSectionHtml: string;
  /** Telefono studio (escapato) o stringa vuota. */
  studioPhone: string;
  /** E-mail studio (escapata) o stringa vuota. */
  studioEmail: string;
  /** Paragrafo orari apertura per carta servizi. */
  openingHoursBlockHtml: string;
};

function peopleList(title: string, rows: { name: string; role?: string }[]): string {
  if (rows.length === 0) {
    return "";
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
    peopleList("Collaboratori (ortodontisti)", data.staff.orthodontists),
    peopleList(
      "Commercialista / consulente fiscale (password dedicata; accesso al software gestionale limitato alla sola parte contabile: fatturazione, invio al sistema Tessera Sanitaria, ecc.)",
      data.staff.accountant
    ),
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

  const periph = data.itProfile.peripherals ?? [];
  let peripheralsSectionHtml: string;
  if (periph.length === 0) {
    peripheralsSectionHtml =
      "<p><em>Nel modulo non risultano periferiche hardware censite; indicare almeno i PC (fisso o portatile), marca, modello e matricola/S.N. nella sezione «Periferiche hardware» prima della visita del GdV.</em></p>";
  } else {
    const pRows = periph
      .map(
        (e) =>
          `<tr><td>${escapeHtml(e.category)}</td><td>${escapeHtml(e.brand ?? "—")}</td><td>${escapeHtml(e.model ?? "—")}</td><td>${escapeHtml(e.serialNumber ?? "—")}</td><td>${escapeHtml(e.notes ?? "—")}</td></tr>`
      )
      .join("");
    peripheralsSectionHtml = `<table class="data-table" style="width:100%;border-collapse:collapse;font-size:10pt;margin:0.6rem 0;"><thead><tr><th style="border:1px solid #333;padding:0.25rem;">Tipologia PC (fisso / portatile, postazione)</th><th style="border:1px solid #333;padding:0.25rem;">Marca</th><th style="border:1px solid #333;padding:0.25rem;">Modello</th><th style="border:1px solid #333;padding:0.25rem;">Matricola / S.N.</th><th style="border:1px solid #333;padding:0.25rem;">Note</th></tr></thead><tbody>${pRows}</tbody></table>`;
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
  let premisesSectionHtml = `<p>${premisesBits.join("; ")}.</p>`;
  if (pr.notes?.trim()) {
    premisesSectionHtml += `<p><strong>Ulteriori annotazioni sui locali, titoli edilizi o destinazioni d’uso (testo libero dal modulo):</strong> ${escapeHtml(pr.notes.trim())}</p>`;
  }

  const legalBits: string[] = [];
  if (pr.floorAndAccess?.trim())
    legalBits.push(`<li><strong>Ubicazione e accessi:</strong> ${escapeHtml(pr.floorAndAccess.trim())}</li>`);
  if (pr.cadastralReference?.trim())
    legalBits.push(`<li><strong>Catasto / NCEU e identificativi:</strong> ${escapeHtml(pr.cadastralReference.trim())}</li>`);
  if (pr.municipalTitlesSummary?.trim())
    legalBits.push(
      `<li><strong>Destinazione d’uso, agibilità, atti e autorizzazioni comunali:</strong> ${escapeHtml(pr.municipalTitlesSummary.trim())}</li>`
    );
  if (pr.environmentalExtraSummary?.trim())
    legalBits.push(
      `<li><strong>Ulteriori dichiarazioni ambientali / urbanistiche:</strong> ${escapeHtml(pr.environmentalExtraSummary.trim())}</li>`
    );
  const premisesLegalSectionHtml =
    legalBits.length > 0
      ? `<h2>Dichiarazioni su caratteristiche ambientali e titoli (da modulo web)</h2><ol style="margin-left:1.1rem;padding-left:0.5rem;">${legalBits.join("")}</ol>`
      : "";

  const studioPhone = data.studio.phone?.trim() ? escapeHtml(data.studio.phone.trim()) : "";
  const studioEmail = data.studio.email?.trim() ? escapeHtml(data.studio.email.trim()) : "";
  const openingHoursBlockHtml = data.studio.openingHours?.trim()
    ? `<p><strong>Orari di apertura al pubblico:</strong> ${escapeHtml(data.studio.openingHours.trim())}</p>`
    : `<p><strong>Orari di apertura al pubblico:</strong> <em>indicare nel campo «Orari» del modulo web o nella carta affissa in sede.</em></p>`;

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

  const fireCo = data.equipment.fireMaintenanceCompany?.trim();
  const fireMaintenanceContractClauseHtml = fireCo
    ? `con la ditta <strong>${escapeHtml(fireCo)}</strong>`
    : `con ditta specializzata di cui al contratto conservato in sede`;

  const wasteCo = ex.wasteCompanyName?.trim();
  const wasteVat = ex.wasteCompanyVat?.trim();
  const wasteDisposalContractClauseHtml = wasteCo
    ? `Di aver stipulato un contratto con la ditta <strong>${escapeHtml(wasteCo)}</strong>${wasteVat ? ` (P.IVA ${escapeHtml(wasteVat)})` : ""} specializzata per il ritiro e lo smaltimento dei rifiuti speciali. Il presente contratto è allegato alla presente documentazione ed è disponibile in sede.`
    : `Di aver stipulato contratti con centri autorizzati per il ritiro e lo smaltimento dei rifiuti speciali; estremi contrattuali e allegati sono conservati in sede e disponibili per il GdV (<em>indicare il gestore nel modulo — sezione fornitori esterni</em>).`;

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
    peripheralsSectionHtml,
    insuranceSectionHtml,
    premisesSectionHtml,
    externalSectionHtml,
    itProfileSectionHtml,
    fireMaintenanceContractClauseHtml,
    wasteDisposalContractClauseHtml,
    premisesLegalSectionHtml,
    studioPhone,
    studioEmail,
    openingHoursBlockHtml,
  };
}
