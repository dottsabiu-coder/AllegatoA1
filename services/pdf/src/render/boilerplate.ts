import type { AllegatoFormData, ResolvedDocument } from "@allegato-a1/shared";
import { buildArticulatedBody } from "./content/articulatedRouter.js";

/**
 * Corpo del documento: testi articolati (stile modulo ALL. A1) con dati utente.
 * Verificare sempre con il PDF ufficiale e con consulenza legale/sanitaria prima di deposito.
 */
export function sectionBody(doc: ResolvedDocument, data: AllegatoFormData): string {
  return buildArticulatedBody(doc, data);
}
