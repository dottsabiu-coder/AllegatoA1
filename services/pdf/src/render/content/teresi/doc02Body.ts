import type { BodyContext } from "../contextBuilder.js";

/**
 * Documento 2 — testo base allineato al modulo Teresi (1A.01.04.01), con dati struttura dal wizard.
 * Schede hardware / banche dati dettagliate: riepilogo tramite sezioni gestionale.
 */
export function teresiDoc02MainHtml(c: BodyContext): string {
  return `
<h2>Premessa</h2>
<p>Il Codice sulla privacy impone a chiunque tratta informazioni relative ad altre persone, imprese, enti od associazioni di rispettare alcuni principi fondamentali a garanzia della riservatezza dei dati stessi.</p>
<p>Il Codice prescrive precisi obblighi e comportamenti da attuare nel trattare i dati; questi obblighi sono sanzionati anche penalmente: è necessario, pertanto, procedere all’adeguamento dell’organizzazione dello studio al fine di rispettare gli obblighi imposti dal Codice.</p>
<p>Con il presente documento si definisce, ai sensi delle disposizioni di legge, le procedure che definiscono le modalità con cui è garantita l’integrità dei dati adottate dallo studio odontoiatrico <strong>${c.studioName}</strong>, con titolare <strong>${c.ownerName}</strong>, sito in <strong>${c.address}</strong>.</p>
<p>Il documento procede, innanzi tutto, all’Identificazione delle Risorse da proteggere, risorse che in diverso modo operano o comunque svolgono un ruolo significativo nei processi di trattamento dei dati personali, si passa poi all’analisi ed all’elenco dei trattamenti e quindi alla distribuzione dei compiti e delle responsabilità nell’ambito della struttura organizzativa. Poi, tramite l’Analisi dei Rischi, sono state analizzate le minacce e le vulnerabilità a cui le risorse sono sottoposte, in modo da potere valutare gli elementi che possono insidiare la protezione, l’integrità e la conservazione di ogni singolo dato personale trattato.</p>
<p>Valutati i rischi, si è redatto un Piano di Sicurezza tramite il quale si è provveduto a definire l’insieme delle misure fisiche, logiche ed organizzative adottate per tutelare le strutture e le risorse preposte al trattamento dei dati e le misure da adottare per garantire l’integrità e la disponibilità dei dati stessi.</p>
<p>Inoltre, è stato definito un Piano di Verifiche delle misure adottate tramite il quale si provvederà ad accertare, periodicamente, la bontà delle misure individuate e ad apportare gli accorgimenti che si riveleranno necessari ed opportuni.</p>
<p>Parallelamente alla stesura del Piano di Verifiche è stato redatto un Piano di Formazione degli Incaricati tramite il quale si renderanno edotti gli incaricati del trattamento dei rischi e dei modi per prevenire i danni.</p>
<p>Il documento, inoltre, fornisce idonee informazioni relative alla tipologia di dati sensibili trattati e all’analisi dei rischi connessi all’utilizzo degli strumenti mediante i quali viene effettuato il trattamento.</p>
<p>Il Documento si applica al trattamento di tutti i dati personali per mezzo di:</p>
<ul>
<li>Strumenti elettronici di elaborazione</li>
<li>Altri strumenti di elaborazione (es. cartacei, audio, visivi e audiovisivi, ecc.)</li>
</ul>
<p>Il Documento deve essere conosciuto ed applicato da tutti i componenti e collaboratori dello studio.</p>

<h2>Risorse hardware</h2>
<p>Le risorse hardware utilizzate per trattare i dati personali sono analizzate nelle seguenti schede riepilogative (dati dichiarati nel modulo):</p>
${c.peripheralsSectionHtml}

<h2>Banche dati</h2>
<p>Gli archivi e le banche dati contenenti i dati personali trattati includono, a titolo esemplificativo:</p>
<ul>
<li>banca dati clienti / pazienti;</li>
<li>banca dati fornitori;</li>
<li>banca dati dipendenti / collaboratori.</li>
</ul>
<p>La configurazione effettiva, le ubicazioni e le modalità di backup sono descritte nelle sezioni seguenti e nei dati inseriti nel gestionale.</p>
${c.itProfileSectionHtml}

<h2>Analisi dei rischi sulle aree e sui locali</h2>
<p>Per ciascuna area in cui si svolge il trattamento si valutano accessi, eventi estremi (allagamento, incendio, guasti elettrici) e misure organizzative di mitigazione. La sintesi operativa è aggiornata con la revisione documentale <strong>${c.revision}</strong>.</p>
<table class="data-table" style="width:100%;border-collapse:collapse;font-size:9.5pt;margin:0.55rem 0;">
<thead><tr>
<th style="border:1px solid #333;padding:0.28rem;">Risorsa</th>
<th style="border:1px solid #333;padding:0.28rem;">Elemento di rischio</th>
<th style="border:1px solid #333;padding:0.28rem;">Soglia individuata</th>
<th style="border:1px solid #333;padding:0.28rem;">Motivazione</th>
</tr></thead>
<tbody>
<tr><td style="border:1px solid #333;padding:0.28rem;vertical-align:top;">Tutte</td><td style="border:1px solid #333;padding:0.28rem;vertical-align:top;">Accesso nei locali ove si svolge il trattamento (furti, atti vandalici)</td><td style="border:1px solid #333;padding:0.28rem;">Bassa</td><td style="border:1px solid #333;padding:0.28rem;vertical-align:top;">Accesso controllato durante l’attività.</td></tr>
<tr><td style="border:1px solid #333;padding:0.28rem;vertical-align:top;">Tutte</td><td style="border:1px solid #333;padding:0.28rem;vertical-align:top;">Allagamenti</td><td style="border:1px solid #333;padding:0.28rem;">Bassa</td><td style="border:1px solid #333;padding:0.28rem;vertical-align:top;">Area non esposta a rischi idraulici rilevanti o misure di contenimento documentate.</td></tr>
<tr><td style="border:1px solid #333;padding:0.28rem;vertical-align:top;">Tutte</td><td style="border:1px solid #333;padding:0.28rem;vertical-align:top;">Incendio</td><td style="border:1px solid #333;padding:0.28rem;">Bassa</td><td style="border:1px solid #333;padding:0.28rem;vertical-align:top;">Presidi antincendio e manutenzioni secondo documentazione di sede.</td></tr>
<tr><td style="border:1px solid #333;padding:0.28rem;vertical-align:top;">Tutte</td><td style="border:1px solid #333;padding:0.28rem;vertical-align:top;">Cortocircuito / guasti elettrici</td><td style="border:1px solid #333;padding:0.28rem;">Bassa</td><td style="border:1px solid #333;padding:0.28rem;vertical-align:top;">Impianti a norma e verifiche documentate.</td></tr>
</tbody></table>

<h2>Analisi dei rischi sulle risorse hardware e sulle banche dati</h2>
<p>Sono considerate minacce tipiche: uso non autorizzato, manomissione, guasti, rischi elettrici, perdita di dati. Le misure adottate includono credenziali d’accesso gestite dal titolare, firewall e antivirus aggiornati, backup periodici verificati e conservazione sicura dei supporti.</p>

<h2>Misure di sicurezza adottate (sintesi)</h2>
<p>Custodia dei supporti di backup; integrità dei dati tramite backup e controlli logici; continuità elettrica ove presente; verifica periodica dell’esito del backup; dispositivi antincendio; raccolta, archiviazione e custodia di atti e documenti secondo policy interna e normativa privacy.</p>

<h2>Criteri e modalità di ripristino dei dati</h2>
<p>Per fronteggiare le ipotesi in cui i dati siano danneggiati o distrutti, sono previste modalità di ripristino in termini congrui rispetto alla criticità dei dati. I documenti cartacei possono essere duplicati; per i dati elettronici si attuano procedure di backup su supporti distinti e verifiche di integrità.</p>

<h2>Piano di verifica delle misure adottate</h2>
<p>Il titolare provvede ad aggiornare le misure di sicurezza al progresso tecnico e verifica periodicamente l’efficacia dei controlli (accessi fisici, correttezza di archiviazione e custodia, integrità dei backup, sicurezza delle trasmissioni, smaltimento supporti non riutilizzabili). Almeno semestralmente si verifica l’uso di credenziali e profili di autorizzazione.</p>

<h2>Ruoli, incaricati e personale autorizzato</h2>
${c.staffSectionHtml}
`;
}
