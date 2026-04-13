/** Questionario anonimo — testo allineato al modulo Teresi (doc. 4 e 28). */
export function customerSatisfactionQuestionnaireTeresiBlock(): string {
  return `
<h2>Questionario (modello)</h2>
<p>Gentile Signora/Gentile Signore</p>
<p>Il questionario a cui Lei, se vorrà, potrà rispondere è formulato in forma anonima con lo scopo di conoscere il grado di soddisfazione per le prestazioni e i servizi erogati da questo studio.</p>
<p>Le Sue risposte e gli eventuali suggerimenti serviranno a migliorare il livello delle prestazioni e dei servizi. È sufficiente che sbarri con una croce la risposta che ritiene più giusta.</p>
<ol style="font-size:10pt;">
<li>Come valuta l’ubicazione dell’ambulatorio per facilità di accesso, raggiungimento, e presenza di ostacoli?<br /><em>Buona &nbsp; Sufficiente &nbsp; Insufficiente &nbsp; Scarsa</em></li>
<li>Come giudica il sistema di prenotazione?<br /><em>Buono &nbsp; Sufficiente &nbsp; Insufficiente &nbsp; Scarso</em></li>
<li>Come giudica il sistema di accoglienza?<br /><em>Buono &nbsp; Sufficiente &nbsp; Insufficiente &nbsp; Scarso</em></li>
<li>Come giudica il sistema di accettazione?<br /><em>Buono &nbsp; Sufficiente &nbsp; Insufficiente &nbsp; Scarso</em></li>
<li>Come giudica la prestazione sanitaria?<br /><em>Buona &nbsp; Sufficiente &nbsp; Insufficiente &nbsp; Scarsa</em></li>
<li>Come valuta la disponibilità del front-office e l’atteggiamento mostrato nel venire incontro alle sue esigenze?<br /><em>Buona &nbsp; Sufficiente &nbsp; Insufficiente &nbsp; Scarsa</em></li>
<li>Come valuta nel suo insieme tutto il percorso dalla richiesta del suo medico all’esecuzione della prestazione?<br /><em>Buono &nbsp; Sufficiente &nbsp; Insufficiente &nbsp; Scarso</em></li>
</ol>
<p>Qualora avesse dei suggerimenti da proporre, La invitiamo a scriverle nello spazio sottostante.</p>
<p>Grazie per la collaborazione</p>
<p><strong>LA DIREZIONE</strong></p>
<p class="muted"><em>P.S. Dopo aver debitamente compilato questo stampato, affinché il tutto avvenga in modo anonimo, La invitiamo a depositarlo presso la segreteria in apposito contenitore.</em></p>
`;
}

/** @deprecated Usare {@link customerSatisfactionQuestionnaireTeresiBlock}; mantenuto per import esistenti. */
export function customerSatisfactionQuestionnaireBlock(): string {
  return customerSatisfactionQuestionnaireTeresiBlock();
}
