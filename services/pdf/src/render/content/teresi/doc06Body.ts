import type { BodyContext } from "../contextBuilder.js";

/** Documento 6 — Piano emergenze (1A.02.02.02), testo organico tipo modulo Teresi + dati contesto. */
export function teresiDoc06MainHtml(c: BodyContext): string {
  return `
<h2>Piano per la gestione delle emergenze</h2>
<p>Il presente piano si basa su istruzioni scritte rivolte a tutte le persone presenti nei locali della struttura <strong>${c.studioName}</strong>, sita in <strong>${c.address}</strong>. Definisce funzioni, responsabilità e comportamenti in caso di emergenza (incendio, fuga di gas o sostanze chimiche, guasti elettrici, evento sismico, malore o infortunio, minacce esterne o blackout).</p>

<h2>Premessa e riferimenti normativi</h2>
<p>La relazione è redatta in considerazione del D.M. 3 luglio 2021 (c.d. «Decreto minicodice») in attuazione dell’art. 46 del D.Lgs. 81/2008 s.m.i. per i criteri di valutazione dei rischi di incendio e, più in generale, delle emergenze, nonché delle misure di prevenzione e protezione. Per «emergenza» si intende il verificarsi di una situazione di pericolo che può coinvolgere persone e/o cose, arrecando danni.</p>
<p>Restano fatti salvi i rapporti con i servizi pubblici competenti in materia di pronto soccorso, salvataggio, lotta antincendio e gestione dell’emergenza, e l’obbligo di rendere edotti i soggetti esposti a pericolo grave e immediato circa le misure predisposte.</p>

<h2>Numeri di emergenza</h2>
<p><strong>112</strong> emergenza generale · <strong>113</strong> soccorso pubblico · <strong>115</strong> Vigili del Fuoco · <strong>118</strong> emergenza sanitaria. Comunicare sempre con chiarezza l’indirizzo completo: <strong>${c.address}</strong>.</p>

<h2>Scopo e campo di applicazione</h2>
<p>Il piano ha lo scopo di definire procedure e comportamenti per salvaguardare vite e salute, limitare danni a strutture e apparecchiature, consentire evacuazione ordinata e agevolare i soccorsi esterni. Si applica a tutti i locali ad uso studio, inclusi sale operative e sterilizzazione, sala d’attesa, uffici, servizi igienici e locali tecnici.</p>

<h2>Identificazione dei rischi di emergenza</h2>
<p>Tra i principali scenari: incendio o principio d’incendio; fuga di gas o sostanze chimiche (disinfettanti, ossigeno, anestetici ove presenti); corto circuito o guasti elettrici; evento sismico; malore o infortunio grave di pazienti o operatori; minaccia esterna o evento imprevisto (allagamento, vandalismo, blackout).</p>

<h2>Classificazione delle emergenze</h2>
<ul>
<li><strong>Livello lieve:</strong> affrontabile dal personale preposto senza evacuazione generale né intervento delle forze pubbliche.</li>
<li><strong>Livello medio:</strong> richiede dispiego interno rilevante; è opportuno avvisare le forze di pronto intervento.</li>
<li><strong>Livello grave:</strong> evacuazione dell’intera struttura e intervento immediato delle forze pubbliche.</li>
</ul>

<h2>Figure e responsabilità</h2>
<p>Il <strong>Responsabile dell’emergenza</strong> e il <strong>Responsabile delle chiamate</strong> sono individuati nella documentazione allegata e aggiornata in sede (in microstrutture possono coincidere con il titolare <strong>${c.ownerName}</strong> o essere formalizzati con atto interno). In stato di non emergenza il Responsabile dell’emergenza vigila sulla praticabilità delle vie di esodo, sulla completezza delle dotazioni, sull’addestramento del personale e collabora con il Servizio di prevenzione e protezione.</p>
<p>Gli <strong>addetti antincendio</strong> e gli <strong>addetti al primo soccorso</strong>, ove nominati e formati ai sensi del D.Lgs. 81/08, svolgono i compiti previsti dalla normativa e da questo piano. In assenza di sostituti, le funzioni sono assunte dal titolare o dal collaboratore presente, nei limiti delle competenze e della formazione ricevuta.</p>

<h2>Dotazioni e presidi</h2>
<p>Presidi antincendio mobili, segnaletica di sicurezza, illuminazione di emergenza ove prevista, cassette di pronto soccorso e planimetrie con vie di esodo devono essere mantenuti efficienti e accessibili. La manutenzione dei presidi è coordinata con il documento sulla protezione antincendio (requisito 1A.03.05.02) e con il piano manutenzioni (documento n. 11).</p>

<h2>Procedure generali</h2>
<p>In caso di allarme: valutare la gravità; attivare la squadra di emergenza; comunicare agli occupanti l’ordine di evacuazione se necessario; contattare i numeri di emergenza; raggiungere il punto di raccolta esterno; non sostare in zone pericolose né intralciare i soccorsi. In caso di incendio: non combattere il fuoco oltre le proprie possibilità; tenere libera una via di fuga; al primo malessere allontanarsi dalla zona di pericolo.</p>

<h2>Prova di evacuazione</h2>
<p>Con frequenza almeno biennale è opportuno effettuare una prova simulata di evacuazione, con verbale di esito conservato in sede, in coerenza con la normativa antincendio e il D.Lgs. 81/08.</p>
`;
}
