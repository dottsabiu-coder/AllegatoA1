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
  const { data, setStudio, setStaff, setEquipment, setExternal, setInsurance, setPremises, setFacility, setMeta } =
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
            <label className="field">
              Nome struttura
              <input
                value={data.studio.structureName}
                onChange={(e) => setStudio({ structureName: e.target.value })}
              />
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
              Etichetta revisione PDF
              <input
                value={data.meta.revisionLabel}
                onChange={(e) => setMeta({ revisionLabel: e.target.value })}
              />
            </label>
          </div>
        );
      case 1:
        return (
          <div className="list-editor">
            <p className="muted">Segreteria, ASO, pulizie: aggiungi una riga per persona (opzionale).</p>
            <PeopleBlock
              title="Segreteria"
              items={data.staff.secretarial}
              onChange={(items) => setStaff({ secretarial: items })}
            />
            <PeopleBlock title="ASO" items={data.staff.aso} onChange={(items) => setStaff({ aso: items })} />
            <PeopleBlock
              title="Pulizie"
              items={data.staff.cleaning}
              onChange={(items) => setStaff({ cleaning: items })}
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
        <header className="topbar">
          <div>
            <h1>Allegato A1 — compilazione</h1>
            <p>Struttura monopresidio — bozza tecnica (testi PDF da legalizzare su modulo ufficiale).</p>
          </div>
        </header>
        <Wizard />
      </div>
    </FormProvider>
  );
}
