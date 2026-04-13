import { useMemo, useState } from "react";
import { FormProvider, useFormCtx } from "./form/formContext";
import { generatePdfPayload } from "./api/generatePdf";
import { DOCUMENT_REGISTRY } from "@allegato-a1/shared";

const STEP_LABELS = [
  "Anagrafica",
  "Personale",
  "Attrezzature",
  "Fornitori",
  "Assicurazione",
  "Locali",
  "Profilo struttura",
  "Riepilogo",
] as const;

function Wizard() {
  const { data, setData, setStudio, setStaff, setEquipment, setExternal, setInsurance, setPremises, setFacility, setMeta } =
    useFormCtx();
  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const docCount = DOCUMENT_REGISTRY.length;

  const canNext = step < STEP_LABELS.length - 1;
  const canBack = step > 0;

  const downloadPdf = async () => {
    setErr(null);
    setBusy(true);
    try {
      const blob = await generatePdfPayload(data);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Allegato-A1.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Errore sconosciuto");
    } finally {
      setBusy(false);
    }
  };

  const body = useMemo(() => {
    switch (step) {
      case 0:
        return (
          <div className="field-grid">
            <label className="field" style={{ gridColumn: "1 / -1" }}>
              Ragione sociale / denominazione struttura
              <input
                value={data.studio.structureName}
                onChange={(e) => setStudio({ structureName: e.target.value })}
              />
              <span className="hint">
                Inserire il testo ufficiale completo (come in visura o insegna), senza abbreviazioni non previste da atti
                pubblici: sarà riportato identico nei frontespizi PDF.
              </span>
            </label>
            <label className="field">
              Titolare
              <input
                value={data.studio.ownerDisplayName}
                onChange={(e) => setStudio({ ownerDisplayName: e.target.value })}
              />
            </label>
            <label className="field" style={{ gridColumn: "1 / -1" }}>
              Indirizzo completo
              <input value={data.studio.addressLine} onChange={(e) => setStudio({ addressLine: e.target.value })} />
            </label>
            <label className="field">
              P.IVA / Codice fiscale
              <input
                value={data.studio.vatOrFiscalCode}
                onChange={(e) => setStudio({ vatOrFiscalCode: e.target.value })}
              />
            </label>
            <label className="field">
              Data apertura / autorizzazione
              <input
                type="text"
                placeholder="gg/mm/aaaa"
                value={data.studio.openingOrAuthDate ?? ""}
                onChange={(e) => setStudio({ openingOrAuthDate: e.target.value })}
              />
            </label>
            <label className="field">
              Telefono (carta dei servizi / PDF)
              <input
                value={data.studio.phone ?? ""}
                onChange={(e) => setStudio({ phone: e.target.value })}
              />
            </label>
            <label className="field">
              E-mail
              <input
                type="email"
                value={data.studio.email ?? ""}
                onChange={(e) => setStudio({ email: e.target.value })}
              />
            </label>
            <label className="field" style={{ gridColumn: "1 / -1" }}>
              Orari di apertura al pubblico (testo libero)
              <input
                placeholder="es. lun–gio 9:00–13:00, 15:00–19:00"
                value={data.studio.openingHours ?? ""}
                onChange={(e) => setStudio({ openingHours: e.target.value })}
              />
            </label>
            <label className="field">
              Etichetta revisione PDF
              <input
                value={data.meta.revisionLabel}
                onChange={(e) => setMeta({ revisionLabel: e.target.value })}
              />
            </label>
            <div style={{ gridColumn: "1 / -1", marginTop: "0.5rem" }}>
              <strong className="muted">Sistema informativo — documento 2 (privacy)</strong>
              <p className="muted" style={{ margin: "0.35rem 0 0.5rem", fontSize: "0.88rem" }}>
                Opzionale ma consigliato: dettagli su software, backup e analisi rischi per arricchire il PDF (requisito
                1A.01.04.01). Le <strong>periferiche hardware</strong> (PC fissi/portatili, marca, modello, matricola)
                alimentano il paragrafo «Hardware» dello stesso documento, separato dalle attrezzature cliniche.
              </p>
              <div className="field-grid">
                <label className="field" style={{ gridColumn: "1 / -1" }}>
                  Software cartella clinica / clinico
                  <input
                    value={data.itProfile.clinicalSoftware ?? ""}
                    onChange={(e) =>
                      setData((d) => ({
                        ...d,
                        itProfile: { ...d.itProfile, clinicalSoftware: e.target.value },
                      }))
                    }
                  />
                </label>
                <label className="field" style={{ gridColumn: "1 / -1" }}>
                  Software gestionale / amministrativo
                  <input
                    value={data.itProfile.managementSoftware ?? ""}
                    onChange={(e) =>
                      setData((d) => ({
                        ...d,
                        itProfile: { ...d.itProfile, managementSoftware: e.target.value },
                      }))
                    }
                  />
                </label>
                <label className="field" style={{ gridColumn: "1 / -1" }}>
                  Sistemi operativi e postazioni (riepilogo)
                  <input
                    placeholder="es. Windows 11 — 3 postazioni"
                    value={data.itProfile.osSummary ?? ""}
                    onChange={(e) =>
                      setData((d) => ({
                        ...d,
                        itProfile: { ...d.itProfile, osSummary: e.target.value },
                      }))
                    }
                  />
                </label>
                <label className="field" style={{ gridColumn: "1 / -1" }}>
                  Modalità di backup
                  <input
                    placeholder="es. incrementale notturno su NAS + cloud cifrato"
                    value={data.itProfile.backupModality ?? ""}
                    onChange={(e) =>
                      setData((d) => ({
                        ...d,
                        itProfile: { ...d.itProfile, backupModality: e.target.value },
                      }))
                    }
                  />
                </label>
                <label className="field" style={{ gridColumn: "1 / -1" }}>
                  Sintesi analisi rischi (privacy / sicurezza logica)
                  <textarea
                    value={data.itProfile.riskAnalysisSummary ?? ""}
                    onChange={(e) =>
                      setData((d) => ({
                        ...d,
                        itProfile: { ...d.itProfile, riskAnalysisSummary: e.target.value },
                      }))
                    }
                  />
                </label>
              </div>
              <PeripheralsBlock
                items={data.itProfile.peripherals ?? []}
                onChange={(items) =>
                  setData((d) => ({
                    ...d,
                    itProfile: { ...d.itProfile, peripherals: items },
                  }))
                }
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="list-editor">
            <p className="muted">
              Segreteria, ASO, collaboratori e commercialista: una riga per persona (opzionale). Il commercialista va
              indicato se ha credenziali dedicate per il gestionale (solo area contabile).
            </p>
            <PeopleBlock
              title="Segreteria"
              items={data.staff.secretarial}
              onChange={(items) => setStaff({ secretarial: items })}
            />
            <PeopleBlock title="ASO" items={data.staff.aso} onChange={(items) => setStaff({ aso: items })} />
            <PeopleBlock
              title="Collaboratori (ortodontisti)"
              items={data.staff.orthodontists}
              onChange={(items) => setStaff({ orthodontists: items })}
            />
            <PeopleBlock
              title="Commercialista / consulente fiscale"
              items={data.staff.accountant}
              onChange={(items) => setStaff({ accountant: items })}
            />
          </div>
        );
      case 2:
        return (
          <div className="list-editor">
            <EquipmentBlock items={data.equipment.items} onChange={(items) => setEquipment({ items })} />
            <div className="field-grid" style={{ marginTop: "0.75rem" }}>
              <label className="field">
                Ditta impianto elettrico
                <input
                  value={data.equipment.electricalInstaller ?? ""}
                  onChange={(e) => setEquipment({ electricalInstaller: e.target.value })}
                />
              </label>
              <label className="field">
                Ditta manutenzione antincendio
                <input
                  value={data.equipment.fireMaintenanceCompany ?? ""}
                  onChange={(e) => setEquipment({ fireMaintenanceCompany: e.target.value })}
                />
              </label>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="field-grid">
            <label className="field">
              Smaltimento rifiuti — ragione sociale
              <input
                value={data.external.wasteCompanyName ?? ""}
                onChange={(e) => setExternal({ wasteCompanyName: e.target.value })}
              />
            </label>
            <label className="field">
              Smaltimento rifiuti — P.IVA
              <input
                value={data.external.wasteCompanyVat ?? ""}
                onChange={(e) => setExternal({ wasteCompanyVat: e.target.value })}
              />
            </label>
            <label className="field">
              RSPP
              <input value={data.external.rsppName ?? ""} onChange={(e) => setExternal({ rsppName: e.target.value })} />
            </label>
            <label className="field">
              Medico competente
              <input
                value={data.external.occupationalPhysicianName ?? ""}
                onChange={(e) => setExternal({ occupationalPhysicianName: e.target.value })}
              />
            </label>
            <label className="field">
              Esperto fisica medica (se RX)
              <input
                value={data.external.medicalPhysicsExpertName ?? ""}
                onChange={(e) => setExternal({ medicalPhysicsExpertName: e.target.value })}
              />
            </label>
          </div>
        );
      case 4:
        return (
          <div className="field-grid">
            <label className="field">
              Compagnia
              <input value={data.insurance.company} onChange={(e) => setInsurance({ company: e.target.value })} />
            </label>
            <label className="field">
              Numero polizza
              <input
                value={data.insurance.policyNumber}
                onChange={(e) => setInsurance({ policyNumber: e.target.value })}
              />
            </label>
            <label className="field">
              Massimale
              <input
                value={data.insurance.coverageLimit ?? ""}
                onChange={(e) => setInsurance({ coverageLimit: e.target.value })}
              />
            </label>
            <label className="field">
              Scadenza
              <input
                type="text"
                placeholder="gg/mm/aaaa"
                value={data.insurance.expiryDate ?? ""}
                onChange={(e) => setInsurance({ expiryDate: e.target.value })}
              />
            </label>
          </div>
        );
      case 5:
        return (
          <div className="field-grid">
            <label className="field">
              Superficie (m²)
              <input
                type="number"
                min={0}
                value={data.premises.surfaceSqm ?? ""}
                onChange={(e) =>
                  setPremises({
                    surfaceSqm: e.target.value === "" ? undefined : Number(e.target.value),
                  })
                }
              />
            </label>
            <label className="field">
              N. sale operative
              <input
                type="number"
                min={0}
                value={data.premises.operativeRooms ?? ""}
                onChange={(e) =>
                  setPremises({
                    operativeRooms: e.target.value === "" ? undefined : Number(e.target.value),
                  })
                }
              />
            </label>
            <label className="field">
              N. servizi igienici
              <input
                type="number"
                min={0}
                value={data.premises.bathroomCount ?? ""}
                onChange={(e) =>
                  setPremises({
                    bathroomCount: e.target.value === "" ? undefined : Number(e.target.value),
                  })
                }
              />
            </label>
            <label className="row-check" style={{ gridColumn: "1 / -1" }}>
              <input
                type="checkbox"
                checked={data.premises.hasWaitingRoom}
                onChange={(e) => setPremises({ hasWaitingRoom: e.target.checked })}
              />
              Presenza sala d&apos;attesa
            </label>
            <label className="row-check" style={{ gridColumn: "1 / -1" }}>
              <input
                type="checkbox"
                checked={data.premises.hasSterilizationRoom}
                onChange={(e) => setPremises({ hasSterilizationRoom: e.target.checked })}
              />
              Locale / area sterilizzazione
            </label>
            <label className="field" style={{ gridColumn: "1 / -1" }}>
              Note sui locali
              <textarea value={data.premises.notes ?? ""} onChange={(e) => setPremises({ notes: e.target.value })} />
            </label>
            <p className="muted" style={{ gridColumn: "1 / -1", fontSize: "0.88rem", margin: "0.25rem 0 0" }}>
              Campi seguenti alimentano il <strong>documento 13</strong> (caratteristiche ambientali / titoli), se compilati.
            </p>
            <label className="field" style={{ gridColumn: "1 / -1" }}>
              Ubicazione e accessi (piano, ingresso da via, ecc.)
              <input
                value={data.premises.floorAndAccess ?? ""}
                onChange={(e) => setPremises({ floorAndAccess: e.target.value })}
              />
            </label>
            <label className="field" style={{ gridColumn: "1 / -1" }}>
              Catasto / NCEU (foglio, particella, sub, categoria…)
              <input
                value={data.premises.cadastralReference ?? ""}
                onChange={(e) => setPremises({ cadastralReference: e.target.value })}
              />
            </label>
            <label className="field" style={{ gridColumn: "1 / -1" }}>
              Titoli comunali (destinazione d’uso, agibilità, atti di concessione…)
              <textarea
                value={data.premises.municipalTitlesSummary ?? ""}
                onChange={(e) => setPremises({ municipalTitlesSummary: e.target.value })}
              />
            </label>
            <label className="field" style={{ gridColumn: "1 / -1" }}>
              Altre dichiarazioni ambientali / urbanistiche (scarichi, emissioni, VVF…)
              <textarea
                value={data.premises.environmentalExtraSummary ?? ""}
                onChange={(e) => setPremises({ environmentalExtraSummary: e.target.value })}
              />
            </label>
          </div>
        );
      case 6:
        return (
          <div className="field-grid">
            <label className="row-check" style={{ gridColumn: "1 / -1" }}>
              <input
                type="checkbox"
                checked={data.facility.hasIonizingRadiation}
                onChange={(e) => setFacility({ hasIonizingRadiation: e.target.checked })}
              />
              Presenza apparecchiature con radiazioni ionizzanti (RX)
            </label>
            <label className="row-check" style={{ gridColumn: "1 / -1" }}>
              <input
                type="checkbox"
                checked={data.facility.hasMedicalGas}
                onChange={(e) => setFacility({ hasMedicalGas: e.target.checked })}
              />
              Impianti gas medicali applicabili
            </label>
            <label className="row-check" style={{ gridColumn: "1 / -1" }}>
              <input
                type="checkbox"
                checked={data.facility.hasInterns}
                onChange={(e) => setFacility({ hasInterns: e.target.checked })}
              />
              Presenza tirocinanti
            </label>
            <p className="muted" style={{ gridColumn: "1 / -1" }}>
              Questi flag attivano testi dichiarativi per i requisiti 1A.03.05.06, 1A.03.05.10 e 1A.05.03.03 nel PDF.
            </p>
          </div>
        );
      default:
        return (
          <div>
            <p className="muted">
              Stai per generare un PDF con indice + <strong>{docCount}</strong> documenti. Controlla i dati anagrafici e
              assicurativi prima di scaricare.
            </p>
            <ul className="muted">
              <li>
                <strong>{data.studio.structureName || "—"}</strong> — {data.studio.addressLine || "indirizzo mancante"}
              </li>
              <li>
                Titolare: {data.studio.ownerDisplayName || "—"} · P.IVA/CF: {data.studio.vatOrFiscalCode || "—"}
              </li>
              <li>
                Polizza: {data.insurance.company || "—"} · n. {data.insurance.policyNumber || "—"}
              </li>
            </ul>
          </div>
        );
    }
  }, [data, setEquipment, setExternal, setFacility, setInsurance, setMeta, setPremises, setStaff, setStudio, docCount, step]);

  return (
    <div className="card">
      <div className="steps">
        {STEP_LABELS.map((label, i) => (
          <button key={label} type="button" className={i === step ? "active" : ""} onClick={() => setStep(i)}>
            {i + 1}. {label}
          </button>
        ))}
      </div>
      <h2 style={{ marginTop: 0, fontSize: "1.05rem" }}>{STEP_LABELS[step]}</h2>
      {body}
      {err ? <div className="error-banner">{err}</div> : null}
      <div className="nav-row">
        <button type="button" className="secondary" disabled={!canBack} onClick={() => setStep((s) => s - 1)}>
          Indietro
        </button>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {step === STEP_LABELS.length - 1 ? (
            <button type="button" className="primary" disabled={busy} onClick={() => void downloadPdf()}>
              {busy ? "Generazione…" : "Scarica PDF"}
            </button>
          ) : (
            <button type="button" className="primary" disabled={!canNext} onClick={() => setStep((s) => s + 1)}>
              Avanti
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function PeopleBlock({
  title,
  items,
  onChange,
}: {
  title: string;
  items: { name: string; role?: string }[];
  onChange: (next: { name: string; role?: string }[]) => void;
}) {
  const update = (idx: number, patch: Partial<{ name: string; role?: string }>) => {
    const next = items.map((it, i) => (i === idx ? { ...it, ...patch } : it));
    onChange(next);
  };
  const add = () => onChange([...items, { name: "", role: "" }]);
  const remove = (idx: number) => onChange(items.filter((_, i) => i !== idx));

  return (
    <div>
      <strong>{title}</strong>
      <div className="list-editor" style={{ marginTop: "0.5rem" }}>
        {items.map((row, idx) => (
          <div key={`${title}-${idx}`} className="list-row">
            <label className="field">
              Nome
              <input value={row.name} onChange={(e) => update(idx, { name: e.target.value })} />
            </label>
            <label className="field">
              Ruolo / note
              <input value={row.role ?? ""} onChange={(e) => update(idx, { role: e.target.value })} />
            </label>
            <button type="button" className="secondary" onClick={() => remove(idx)}>
              Rimuovi
            </button>
          </div>
        ))}
        <button type="button" className="secondary" onClick={add}>
          + Aggiungi
        </button>
      </div>
    </div>
  );
}

function PeripheralsBlock({
  items,
  onChange,
}: {
  items: { category: string; brand?: string; model?: string; serialNumber?: string; notes?: string }[];
  onChange: (next: typeof items) => void;
}) {
  const update = (idx: number, patch: Partial<(typeof items)[number]>) => {
    const next = items.map((it, i) => (i === idx ? { ...it, ...patch } : it));
    onChange(next);
  };
  const add = () => onChange([...items, { category: "", brand: "", model: "", serialNumber: "", notes: "" }]);
  const remove = (idx: number) => onChange(items.filter((_, i) => i !== idx));

  return (
    <div style={{ marginTop: "0.75rem" }}>
      <strong>Periferiche hardware (PC)</strong>
      <p className="muted" style={{ margin: "0.35rem 0 0.5rem", fontSize: "0.88rem" }}>
        Per il documento privacy: indicare se <strong>fisso o portatile</strong> nella colonna tipologia (es. «PC fisso —
        segreteria»), più marca, modello e matricola/S.N.
      </p>
      <div className="list-editor">
        {items.map((row, idx) => (
          <div key={`periph-${idx}`} className="list-row" style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr auto" }}>
            <label className="field">
              Tipologia (fisso/portatile, postazione)
              <input value={row.category} onChange={(e) => update(idx, { category: e.target.value })} />
            </label>
            <label className="field">
              Marca
              <input value={row.brand ?? ""} onChange={(e) => update(idx, { brand: e.target.value })} />
            </label>
            <label className="field">
              Modello
              <input value={row.model ?? ""} onChange={(e) => update(idx, { model: e.target.value })} />
            </label>
            <label className="field">
              Matricola / S.N.
              <input value={row.serialNumber ?? ""} onChange={(e) => update(idx, { serialNumber: e.target.value })} />
            </label>
            <button type="button" className="secondary" onClick={() => remove(idx)}>
              Rimuovi
            </button>
            <label className="field" style={{ gridColumn: "1 / -1" }}>
              Note
              <input value={row.notes ?? ""} onChange={(e) => update(idx, { notes: e.target.value })} />
            </label>
          </div>
        ))}
        <button type="button" className="secondary" onClick={add}>
          + Aggiungi periferica
        </button>
      </div>
    </div>
  );
}

function EquipmentBlock({
  items,
  onChange,
}: {
  items: { category: string; brand?: string; model?: string; serialNumber?: string; notes?: string }[];
  onChange: (next: typeof items) => void;
}) {
  const update = (idx: number, patch: Partial<(typeof items)[number]>) => {
    const next = items.map((it, i) => (i === idx ? { ...it, ...patch } : it));
    onChange(next);
  };
  const add = () => onChange([...items, { category: "", brand: "", model: "", serialNumber: "", notes: "" }]);
  const remove = (idx: number) => onChange(items.filter((_, i) => i !== idx));

  return (
    <div>
      <strong>Attrezzature</strong>
      <p className="muted">Esempi: riunito, autoclave, compressore, apparecchiatura radiologica…</p>
      <div className="list-editor">
        {items.map((row, idx) => (
          <div key={`eq-${idx}`} className="list-row" style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr auto" }}>
            <label className="field">
              Tipologia
              <input value={row.category} onChange={(e) => update(idx, { category: e.target.value })} />
            </label>
            <label className="field">
              Marca
              <input value={row.brand ?? ""} onChange={(e) => update(idx, { brand: e.target.value })} />
            </label>
            <label className="field">
              Modello
              <input value={row.model ?? ""} onChange={(e) => update(idx, { model: e.target.value })} />
            </label>
            <label className="field">
              Matricola / S/N
              <input value={row.serialNumber ?? ""} onChange={(e) => update(idx, { serialNumber: e.target.value })} />
            </label>
            <button type="button" className="secondary" onClick={() => remove(idx)}>
              Rimuovi
            </button>
            <label className="field" style={{ gridColumn: "1 / -1" }}>
              Note
              <input value={row.notes ?? ""} onChange={(e) => update(idx, { notes: e.target.value })} />
            </label>
          </div>
        ))}
        <button type="button" className="secondary" onClick={add}>
          + Aggiungi attrezzatura
        </button>
      </div>
    </div>
  );
}

export function App() {
  return (
    <FormProvider>
      <div className="shell">
        <header className="site-header">
          <div className="brand-card">
            <div className="brand-row">
              <img
                className="brand-logo"
                src="/aio-logo.png"
                alt="Associazione Italiana Odontoiatri — aio"
                decoding="async"
              />
              <div className="brand-copy">
                <h1>Allegato A1 — compilazione guidata</h1>
                <span className="brand-badge">Strumento AIO</span>
                <p className="brand-tagline">
                  Raccolta dati e generazione del fascicolo PDF per la struttura sanitaria monopresidio (contesto normativo
                  Sicilia / D.A. 20/2024).
                </p>
                <p className="brand-note">
                  I testi del PDF sono bozza tecnica: verificarli e adeguarli al modulo regionale ufficiale e al Manuale OTA
                  prima di ogni uso formale.
                </p>
              </div>
            </div>
          </div>
        </header>
        <Wizard />
      </div>
    </FormProvider>
  );
}
