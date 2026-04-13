import type { BodyContext } from "../contextBuilder.js";

/** Documento 7 — Isolamento pazienti contagiosi (1A.02.02.03), modello Teresi sintetico. */
export function teresiDoc07MainHtml(c: BodyContext): string {
  return `
<h2>Protocollo per l’isolamento di pazienti con patologie contagiose o potenzialmente tali</h2>
<p>Il protocollo definisce raccomandazioni e misure proporzionate per <strong>${c.studioName}</strong> (sede <strong>${c.address}</strong>) al fine di contenere la diffusione di infezioni, nel rispetto delle linee guida di riferimento (inclusi principi tipo CDC) e della normativa vigente.</p>

<h2>Definizioni</h2>
<p><strong>Isolamento:</strong> misura per contenere la diffusione delle infezioni, separando la fonte di infezione dai soggetti suscettibili. In ambiente ambulatoriale può consistere nella gestione organizzativa del paziente (ultimo appuntamento, area dedicata temporaneamente, DPI rafforzati).</p>
<p><strong>Serbatoio / fonte di infezione:</strong> soggetto infetto o portatore, oppure ambiente o oggetto contaminato da cui può originarsi la trasmissione.</p>
<p><strong>Ospite suscettibile:</strong> soggetto che, a contatto con un agente infettivo, può sviluppare malattia, anche in relazione a età, terapie o condizioni cliniche.</p>

<h2>Modalità di trasmissione (sintesi)</h2>
<ul>
<li><strong>Contatto diretto o indiretto</strong> (mani, superfici, strumenti contaminati).</li>
<li><strong>Goccioline</strong> (droplet): distanza ravvicinata, tosse, starnuti, alcune manovre con strumentazione rotante.</li>
<li><strong>Via aerea</strong> (nuclei di goccioline / aerosol): patogeni che possono restare sospesi e diffondersi, ove applicabile.</li>
</ul>

<h2>Precauzioni standard</h2>
<p>Si applicano a tutti i pazienti: igiene delle mani (prima/dopo ogni contatto, dopo guanti, dopo fluidi biologici); <strong>guanti</strong> quando si prevede contatto con mucose, sangue o altri fluidi; <strong>mascherina, occhiali o visiera</strong> quando si prevedono schizzi; <strong>camice</strong> per proteggere gli indumenti; gestione sicura di aghi e taglienti; decontaminazione e sterilizzazione dello strumentario riutilizzabile; pulizia e disinfezione ambientale tra un paziente e l’altro.</p>

<h2>Precauzioni basate sulla trasmissione</h2>
<p><strong>Aerea:</strong> oltre alle standard, valutazione di mascherine a filtro appropriato per il personale e organizzazione dei tempi/ambienti secondo rischio e linee guida.</p>
<p><strong>Goccioline:</strong> mascherina per il personale a distanza ravvicinata; differimento di prestazioni non urgenti fino a guarigione o chiarimento clinico; in urgenza, programmare a fine giornata ove possibile.</p>
<p><strong>Contatto:</strong> guanti e camice; disinfezione accurata delle superfici; attenzione al trasporto di biancheria e materiali.</p>

<h2>Gestione del paziente con sospetta contagiosità in sede</h2>
<p>In presenza di febbre o sintomi respiratori o gastrointestinali acuti non spiegati altrimenti, o altre condizioni indicative: valutare <strong>differimento</strong> delle prestazioni non urgenti; se il paziente è già in studio, collocarlo in <strong>area separata</strong> ove disponibile, con <strong>DPI</strong> per paziente e personale secondo protocollo; aerazione e <strong>sanificazione</strong> straordinaria delle superfici e degli ambienti interessati dopo uscita del paziente; informare il <strong>118</strong> se necessario per condizioni gravi.</p>
<p>Gli altri utenti in attesa vanno gestiti in modo da ridurre il rischio di esposizione (tempi di attesa, aerazione, sanificazione programmata).</p>

<h2>Formazione e aggiornamento</h2>
<p>Il personale è informato sul protocollo e aggiornato quando cambiano circolari regionali o nazionali. Riferimento revisione documentale: <strong>${c.revision}</strong>.</p>

<h2>Sintesi locali (dati modulo)</h2>
${c.premisesSectionHtml}
`;
}
