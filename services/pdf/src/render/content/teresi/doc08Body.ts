import type { BodyContext } from "../contextBuilder.js";

/** Documento 8 — Documentazione sanitaria (1A.02.05.01), modello Teresi. */
export function teresiDoc08MainHtml(c: BodyContext): string {
  return `
<h2>Procedura per la documentazione sanitaria</h2>
<p><strong>Scopo:</strong> definire requisiti e modalità operative per la corretta <strong>redazione, aggiornamento, conservazione e verifica</strong> della documentazione sanitaria dei pazienti, garantendo tracciabilità, riservatezza e conformità alle normative vigenti.</p>

<h2>Documentazione compresa</h2>
<p>Può essere in formato cartaceo o elettronico e su diversi supporti. Comprende in particolare: <strong>cartella clinica</strong>; <strong>consensi informati</strong>; documenti di posta elettronica e allegati pertinenti; gestione di <strong>database informatici</strong> per radiografie digitali o imaging; documentazione necessaria alle attività (fotografie, esami strumentali, piani di cura).</p>

<h2>Struttura e intestazione dei documenti</h2>
<p>La documentazione riporta in intestazione, ove applicabile, la denominazione della struttura, il titolo del documento o modulo, eventuale codice e numerazione delle pagine. Nei documenti articolati è raccomandato l’indice. Il piede può riportare percorso di conservazione, data e indice di revisione.</p>

<h2>Responsabilità della redazione</h2>
<p>La redazione della documentazione sanitaria è coordinata dal titolare <strong>${c.ownerName}</strong> per <strong>${c.studioName}</strong>, nel rispetto della normativa privacy, del contenuto obbligatorio della cartella e delle norme radioprotezionistiche ove rilevanti.</p>

<h2>Riesame e aggiornamento</h2>
<p>Ad ogni incontro con il paziente la cartella clinica (cartacea o informatica) e la documentazione correlata sono richiamate e, ove necessario, aggiornate con note datate e attribuite al professionista che esegue la prestazione (firma o credenziali informatiche personali). Gli aggiornamenti riflettono l’evoluzione del piano di cura o la chiusura del caso; la conservazione segue i termini di legge.</p>

<h2>Conservazione</h2>
<p>La documentazione digitale è protetta da password e backup secondo quanto descritto nel documento sul sistema informativo (1A.01.04.01). La documentazione cartacea è custodita in locali chiusi a chiave. L’integrità è garantita da copie di sicurezza, antivirus e misure fisiche idonee. La consultazione degli archivi digitali è consentita solo a operatori con credenziali personali.</p>

<h2>Copie e accesso dell’interessato</h2>
<p>Copia della cartella o degli esami può essere richiesta dall’interessato con le modalità previste dalla legge (anche per delega), con tempi congrui e rispetto della privacy. Le modalità operative sono documentate in sede.</p>

<h2>Personale e formazione</h2>
<p>Gli eventuali collaboratori coinvolti nella redazione sono formati sulle procedure e sulle rispettive responsabilità al momento dell’avvio della collaborazione.</p>
<p>Riferimento revisione documentale: <strong>${c.revision}</strong>.</p>
`;
}
