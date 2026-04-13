/**
 * Parità di **contenuto** con il modulo di riferimento `12_Mod. ALL. A1` (modello Teresi):
 * l’obiettivo è che ogni paragrafo “fisso” del PDF generato coincida con quello del modulo,
 * sostituendo **solo** i dati di contesto raccolti nel wizard (`BodyContext` / AllegatoFormData).
 *
 * Il file PDF Teresi non è versionato (vedi `.gitignore`); senza estrazione testuale dal PDF
 * non si può verificare né garantire uguaglianza letterale su tutti i 32 documenti.
 *
 * **Allineamento esplicito al testo-modello oggi nel codice**
 * - Documento **1**: `doc01Organization` in `longFormBodies.ts`
 * - Documento **5**: `doc05ErogazioneAssistenzaTeresi` in `longFormBodies.ts`
 * - Questionario in documento **28**: `customerSatisfactionQuestionnaireBlock` in `teresiShared.ts`
 * - Premessa copertina indice: `indexCoverPremessaModuloRegionale` in `normativePreamble.ts`
 *
 * **Documenti ancora con redazione estesa “app”** (da sostituire con estratti letterali dal PDF Teresi
 * se si richiede parità totale anche di formulazione): 2–4, 6–27, 29–32 e blocchi in `articulatedRouter.ts`.
 * Mantenere gli insert dinamici (tabelle personale, inventario, IT, assicurazioni, fornitori, locali).
 */
export {};
