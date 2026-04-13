import { customerSatisfactionQuestionnaireTeresiBlock } from "./teresiShared.js";
import type { BodyContext } from "../contextBuilder.js";

/** Documento 4 — reclami, osservazioni e suggerimenti (1A.01.06.01), modello Teresi. */
export function teresiDoc04MainHtml(c: BodyContext): string {
  return `
<p>La presentazione di un reclamo da parte di un cittadino che utilizzerà i servizi dello studio è un segnale sulla possibile esistenza nel sistema aziendale di disfunzioni che possono avere la loro causa nell’organizzazione, nella struttura tecnica dei servizi, nei comportamenti del personale.</p>
<p>Ai fini del mantenimento dei più alti livelli di qualità del servizio, che costituisce l’obiettivo strategico dello studio, tale segnale è di importanza fondamentale perché consente di intervenire per l’eliminazione delle disfunzioni e di riportare ai livelli attesi la qualità dei servizi.</p>
<p>Lo studio si dota di una procedura formalizzata per la trattazione dei reclami che mira non soltanto alla risoluzione del problema posto in evidenza ma anche ad agire come importante informazione di ritorno sull’efficacia ed efficienza del sistema qualità.</p>
<p>I cittadini utenti possono presentare eventuali reclami per disservizi subiti prima, durante e dopo l’esecuzione delle prestazioni erogate; il reclamo può essere inoltrato con le seguenti modalità:</p>
<ul>
<li>per iscritto, utilizzando il modulo predisposto disponibile presso l’ufficio di accettazione;</li>
<li>per iscritto su carta semplice o a mezzo mail;</li>
<li>verbalmente rivolgendosi al personale in servizio presso lo studio.</li>
</ul>
<p>Il titolare <strong>${c.ownerName}</strong> fornirà una risposta a tutti i reclami entro il termine massimo di <strong>8 giorni</strong>.</p>
<p>Si allega il modello che sarà utilizzato dallo studio:</p>
${customerSatisfactionQuestionnaireTeresiBlock()}
<p>Lo studio è tenuto ad aggiornare le informazioni su eventuali referenti per i rapporti con il pubblico (es. addetto alla segreteria) e a formare il personale sulla gestione di reclami, osservazioni e suggerimenti. Le schede di valutazione possono essere rese disponibili in sala d’attesa e si possono predisporre interviste a campione ai pazienti.</p>
<p>Riferimento revisione documentale: <strong>${c.revision}</strong>.</p>
`;
}
