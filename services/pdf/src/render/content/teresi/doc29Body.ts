import type { BodyContext } from "../contextBuilder.js";

/** Documento 29 — Piano gestione rischio (1A.06.02.01), struttura tipo Teresi. */
export function teresiDoc29MainHtml(c: BodyContext): string {
  return `
<h2>Finalità e ambito</h2>
<p>Il presente piano descrive l’approccio di <strong>${c.studioName}</strong> (sede <strong>${c.address}</strong>) alla <strong>identificazione, valutazione e trattamento dei rischi</strong> per la salute e sicurezza dei lavoratori, dei pazienti e per la continuità del servizio, in coerenza con il D.Lgs. 81/2008 s.m.i. e con la documentazione di struttura (DVR o equivalente, protocolli clinici, piano emergenze).</p>

<h2>1. Ambiti e categorie di rischio</h2>
<p>I rischi sono considerati per <strong>mansione / soggetto esposto</strong> e per <strong>ambiente di lavoro</strong>, integrando la valutazione documentale con misure di prevenzione e protezione già adottate. Il titolare <strong>${c.ownerName}</strong> coordina l’aggiornamento del piano; il personale è coinvolto nella segnalazione e nell’osservanza delle procedure.</p>

<h2>2. Assistente alla poltrona e supporto clinico</h2>
<p>Sono considerati, tra gli altri, rischi legati a: posture prolungate e disturbi muscolo-scheletrici; uso di attrezzature elettriche; taglienti e materiali perforanti; <strong>contatto con materiale biologico</strong> (sangue, saliva); rischio biologico (HBV, HCV, HIV, agenti respiratori); esposizione a polveri, vapori e aerosol; sostanze chimiche per pulizia e disinfezione; microclima; incendio; radiazioni ottiche artificiali non coerenti ove presenti; movimentazione manuale dei carichi; ustioni da sterilizzazione.</p>
<p><strong>Misure principali:</strong> sostituzione di prodotti più nocivi ove possibile; ricambi d’aria; etichettatura sostanze; comandi di emergenza elettrici; formazione su chimico e biologico; DPI (guanti, camice, mascherina, visiera, occhiali ove necessario); ergonomia e ordine dei locali; procedure su sterilizzazione e smaltimento rifiuti.</p>

<h2>3. Collaboratori professionali (odontoiatra / igienista)</h2>
<p>Rischi analoghi sul fronte biologico, chimico, strumentale, elettrico e da ROA; stress da carichi di lavoro; radiazioni ionizzanti ove presenti apparecchiature radiogene (in tal caso integrare con radioprotezione).</p>
<p><strong>Misure:</strong> osservanza protocolli clinici, DPI, schede di sicurezza, formazione continua, manutenzione programmata, misure ergonomiche.</p>

<h2>4. Personale amministrativo e front office</h2>
<p>Rischi tipici: uso prolungato di videoterminali; stress lavoro-correlato; urti e cadute; rischio biologico limitato in area accoglienza; elettricità; incendio.</p>
<p><strong>Misure:</strong> ergonomia postazioni, pause, schermi, ordine e pulizia, prese e macchine conformi, formazione generale sulla sicurezza.</p>

<h2>5. Pazienti e utenti</h2>
<p>Rischi di caduta, urto, esposizione biologica incrociata, microclima, eventi elettrici o da ROA in sala; gestione attesa e comunicazione.</p>
<p><strong>Misure:</strong> pavimenti e percorsi sicuri, segnaletica, igiene ambientale, ventilazione e manutenzione filtri, procedure di biosicurezza, informazione all’utente.</p>

<h2>6. Ambienti di lavoro</h2>
<p>Pavimenti e rivestimenti lavabili e non scivolosi; pareti e soffitti idonei; porte e finestre che non creino intrappolamenti; servizi igienici con acqua calda/fredda e prodotti per l’igiene personale; passaggi illuminati e sgombri.</p>

<h2>7. Agenti biologici (quadro)</h2>
<p>La microflora orale e le attività invasive espongono a <strong>agenti biologici</strong> classificati per gruppo di pericolosità ai sensi del D.Lgs. 81/2008. Si applicano barriere (guanti, mascherine, visiere), catena di sterilizzazione, gestione dei rifiuti e formazione. In caso di introduzione di nuove procedure o epidemie, il piano è aggiornato con le circolari vigenti.</p>

<h2>8. Circuiti idrici, aerosol e Legionella (sintesi)</h2>
<p>È opportuna la <strong>valutazione del rischio legionellosi</strong> sui circuiti idrici e sui riuniti (adduzione, scarichi, stagnazione). Misure tipo: evitare ristagni, sanificare riserve e circuiti secondo protocollo, disinfezione inizio/fine giornata ove indicato dal fabbricante, campionamenti o controlli periodici se previsti dal piano di sorveglianza. I filtri degli impianti di climatizzazione sono mantenuti e sanificati con cadenza programmata.</p>

<h2>9. Collegamenti documentali</h2>
<p>Il piano si integra con: procedura pulizia e sanificazione (<strong>documento n. 30</strong>, 1A.06.02.02); esposizione biologica e sostanze pericolose (<strong>documento n. 31</strong>, 1A.06.02.03); near miss ed eventi avversi (<strong>documento n. 32</strong>, 1A.06.02.04); piano emergenze (<strong>documento n. 6</strong>, 1A.02.02.02); protocollo isolamento (<strong>documento n. 7</strong>, 1A.02.02.03); DVR e registri di formazione.</p>

<h2>10. Riesame</h2>
<p>Il piano è aggiornato in caso di eventi straordinari, modifiche organizzative o impiantistiche, e almeno con la periodicità definita in sede di revisione del sistema documentale (<strong>${c.revision}</strong>).</p>

<h2>Registro presa visione (modello)</h2>
<table class="data-table" style="width:100%;border-collapse:collapse;font-size:9.5pt;margin:0.55rem 0;">
<thead><tr>
<th style="border:1px solid #333;padding:0.28rem;">N.</th>
<th style="border:1px solid #333;padding:0.28rem;">Nome e cognome</th>
<th style="border:1px solid #333;padding:0.28rem;">Qualifica</th>
<th style="border:1px solid #333;padding:0.28rem;">Firma</th>
<th style="border:1px solid #333;padding:0.28rem;">Data</th>
</tr></thead>
<tbody>
<tr><td style="border:1px solid #333;padding:0.35rem;">1</td><td style="border:1px solid #333;padding:0.35rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.35rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.35rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.35rem;">&nbsp;</td></tr>
<tr><td style="border:1px solid #333;padding:0.35rem;">2</td><td style="border:1px solid #333;padding:0.35rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.35rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.35rem;">&nbsp;</td><td style="border:1px solid #333;padding:0.35rem;">&nbsp;</td></tr>
</tbody>
</table>
`;
}
