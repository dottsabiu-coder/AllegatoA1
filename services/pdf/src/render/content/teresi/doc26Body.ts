import type { BodyContext } from "../contextBuilder.js";

/** Documento 26 — Carta dei servizi (1A.05.03.01), struttura tipo modulo Teresi. */
export function teresiDoc26MainHtml(c: BodyContext): string {
  return `
<h2>Presentazione al pubblico</h2>
<p>Gentile utente, la presente carta è volta alla tutela dei diritti degli utenti della struttura e costituisce strumento di trasparenza su modalità di erogazione, standard di qualità e informazioni complete. Si richiede collaborazione attiva, anche tramite questionari di soddisfazione, per il miglioramento continuo del servizio.</p>

<h2>1. Struttura e titolare</h2>
<p><strong>${c.studioName}</strong> eroga prestazioni odontoiatriche ambulatoriali in ambienti organizzati secondo criteri di qualità e sicurezza. Le prestazioni comprendono, in relazione alle competenze professionali presenti, ambiti quali odontoiatria conservativa e restaurativa, chirurgia orale, protesi, ortodonzia, igiene orale, implantologia, endodonzia e altre attività coerenti con l’autorizzazione.</p>
<p><strong>Sede:</strong> ${c.address}.<br />
<strong>Titolare:</strong> ${c.ownerName} (P.IVA / C.F. ${c.vat}).</p>
${c.openingLine}

<h2>2. Orari, accesso e prenotazione</h2>
<p>Gli <strong>orari di apertura al pubblico</strong>, i <strong>recapiti telefonici e di posta elettronica</strong> per prenotazioni e informazioni, le <strong>modalità di disdetta</strong> e le eventuali <strong>indicazioni su tempi di attesa</strong> sono quelli comunicati <strong>in sede</strong> (es. cartellonistica, segreteria, materiali informativi) e aggiornati dal titolare. Ove la struttura utilizzi canali digitali (sito, PEC, app), le stesse informazioni devono risultare coerenti con quanto applicato in studio.</p>

<h2>3. Prestazioni, limitazioni e urgenze</h2>
<p>Le prestazioni erogate sono coerenti con la classificazione della struttura e con le competenze professionali presenti. Eventuali <strong>limitazioni</strong> (es. urgenze, specialistica non erogata, temporanea indisponibilità) sono dichiarate in modo chiaro all’utente. Le <strong>urgenze odontoiatriche</strong> sono gestite secondo criteri di priorità e sicurezza definiti internamente e in linea con la procedura di erogazione dell’assistenza.</p>

<h2>4. Trasparenza economica e consenso</h2>
<p>Le informazioni su <strong>onorari</strong>, eventuali <strong>acconti</strong>, <strong>modalità di pagamento</strong> e <strong>note informative</strong> su prestazioni complesse sono rese in modo comprensibile <strong>prima o al momento</strong> della prestazione, nel rispetto della deontologia e della normativa applicabile, inclusa la privacy e il consenso informato ove richiesto.</p>

<h2>5. Reclami, osservazioni e miglioramento</h2>
<p>Reclami, osservazioni e suggerimenti sono accolti secondo la <strong>procedura dedicata</strong> (requisito <strong>1A.01.06.01</strong>) e costituiscono occasione di miglioramento. La carta è aggiornata a seguito di modifiche organizzative, tariffarie o dell’offerta assistenziale.</p>

<h2>6. Privacy e continuità</h2>
<p>Il trattamento dei dati personali e sanitari avviene nel rispetto del <strong>Regolamento (UE) 2016/679</strong> e della normativa applicabile; la documentazione sul sistema informativo è richiamata nel <strong>documento n. 2</strong> (1A.01.04.01). La struttura adotta misure organizzative per la continuità del servizio nei limiti della monopresidio ambulatoriale.</p>
`;
}
