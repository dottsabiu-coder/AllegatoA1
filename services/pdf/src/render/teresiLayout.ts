/**
 * Parametri di impaginazione per avvicinare il PDF generato al modulo di riferimento
 * **12_Mod. ALL. A1** (studio Teresi), così da poter confrontare/sovrapporre le pagine
 * con output Word → PDF, mantenendo i soli contenuti compilati dall’utente (anagrafica,
 * elenchi, tabelle da form) variabili.
 *
 * Non replica pixel-perfect ogni box Word (motori di layout diversi), ma riduce
 * sistematicamente scostamenti da margini e corpo carattere molto larghi.
 */
export const TERESI_LAYOUT = {
  /** @page e Playwright devono coincidere. Valori prossimi a stampa Word A4 tipica. */
  pageMarginTop: "25mm",
  pageMarginRight: "20mm",
  pageMarginBottom: "25mm",
  pageMarginLeft: "20mm",
  /** Times New Roman 11 pt come nel modulo. */
  bodyFontSize: "11pt",
  /** Interlinea prossima al singolo 1,0–1,15 di Word in stampa. */
  bodyLineHeight: 1.28,
  /** Niente rientro aggiuntivo sul corpo: la colonna utile coincide con l’area @page. */
  docBodyHorizontalPadding: "0",
  docBodyVerticalMarginRem: { top: "0.85rem", bottom: "1.1rem" },
  docSectionPaddingBottom: "6mm",
  coverMarginTop: "2cm",
  /** Footer Playwright: inset orizzontale allineato ai margini laterali pagina. */
  footerPaddingHorizontal: "20mm",
} as const;

export function teresiPageMarginCss(): string {
  const { pageMarginTop, pageMarginRight, pageMarginBottom, pageMarginLeft } = TERESI_LAYOUT;
  return `${pageMarginTop} ${pageMarginRight} ${pageMarginBottom} ${pageMarginLeft}`;
}

export function playwrightPdfMargins(): {
  top: string;
  bottom: string;
  left: string;
  right: string;
} {
  const L = TERESI_LAYOUT;
  return {
    top: L.pageMarginTop,
    bottom: L.pageMarginBottom,
    left: L.pageMarginLeft,
    right: L.pageMarginRight,
  };
}
