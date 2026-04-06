import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { defaultAllegatoFormData, type AllegatoFormData } from "@allegato-a1/shared";

export type FormCtx = {
  data: AllegatoFormData;
  setData: (patch: Partial<AllegatoFormData> | ((prev: AllegatoFormData) => AllegatoFormData)) => void;
  setStudio: (patch: Partial<AllegatoFormData["studio"]>) => void;
  setStaff: (patch: Partial<AllegatoFormData["staff"]>) => void;
  setEquipment: (patch: Partial<AllegatoFormData["equipment"]>) => void;
  setExternal: (patch: Partial<AllegatoFormData["external"]>) => void;
  setInsurance: (patch: Partial<AllegatoFormData["insurance"]>) => void;
  setPremises: (patch: Partial<AllegatoFormData["premises"]>) => void;
  setFacility: (patch: Partial<AllegatoFormData["facility"]>) => void;
  setMeta: (patch: Partial<AllegatoFormData["meta"]>) => void;
};

const Ctx = createContext<FormCtx | null>(null);

export function FormProvider({ children }: { children: ReactNode }) {
  const [data, setDataState] = useState<AllegatoFormData>(defaultAllegatoFormData);

  const setData = useCallback(
    (patch: Partial<AllegatoFormData> | ((prev: AllegatoFormData) => AllegatoFormData)) => {
      setDataState((prev) => (typeof patch === "function" ? patch(prev) : { ...prev, ...patch }));
    },
    []
  );

  const setStudio = useCallback(
    (patch: Partial<AllegatoFormData["studio"]>) =>
      setDataState((p) => ({ ...p, studio: { ...p.studio, ...patch } })),
    []
  );
  const setStaff = useCallback(
    (patch: Partial<AllegatoFormData["staff"]>) =>
      setDataState((p) => ({ ...p, staff: { ...p.staff, ...patch } })),
    []
  );
  const setEquipment = useCallback(
    (patch: Partial<AllegatoFormData["equipment"]>) =>
      setDataState((p) => ({ ...p, equipment: { ...p.equipment, ...patch } })),
    []
  );
  const setExternal = useCallback(
    (patch: Partial<AllegatoFormData["external"]>) =>
      setDataState((p) => ({ ...p, external: { ...p.external, ...patch } })),
    []
  );
  const setInsurance = useCallback(
    (patch: Partial<AllegatoFormData["insurance"]>) =>
      setDataState((p) => ({ ...p, insurance: { ...p.insurance, ...patch } })),
    []
  );
  const setPremises = useCallback(
    (patch: Partial<AllegatoFormData["premises"]>) =>
      setDataState((p) => ({ ...p, premises: { ...p.premises, ...patch } })),
    []
  );
  const setFacility = useCallback(
    (patch: Partial<AllegatoFormData["facility"]>) =>
      setDataState((p) => ({ ...p, facility: { ...p.facility, ...patch } })),
    []
  );
  const setMeta = useCallback(
    (patch: Partial<AllegatoFormData["meta"]>) =>
      setDataState((p) => ({ ...p, meta: { ...p.meta, ...patch } })),
    []
  );

  const value = useMemo(
    () => ({
      data,
      setData,
      setStudio,
      setStaff,
      setEquipment,
      setExternal,
      setInsurance,
      setPremises,
      setFacility,
      setMeta,
    }),
    [data, setData, setStudio, setStaff, setEquipment, setExternal, setInsurance, setPremises, setFacility, setMeta]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useFormCtx(): FormCtx {
  const v = useContext(Ctx);
  if (!v) throw new Error("FormProvider mancante");
  return v;
}
