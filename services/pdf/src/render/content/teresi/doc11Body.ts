import type { BodyContext } from "../contextBuilder.js";

/** Documento 11 — Piano manutenzione strutture e apparecchiature (1A.03.02.02). */
export function teresiDoc11MainHtml(c: BodyContext): string {
  return `
<h2>Piano per la gestione e la manutenzione</h2>
<p>Il piano riguarda strutture, impianti, attrezzature e apparecchiature biomediche di <strong>${c.studioName}</strong> (sede <strong>${c.address}</strong>) e definisce verifiche periodiche e responsabilità, nel rispetto delle indicazioni dei fabbricanti e della normativa.</p>

<h2>Verifiche periodiche — sintesi tipo</h2>
<p><strong>Strutture:</strong> ispezione visiva almeno annuale; manutenzione ordinaria di finiture secondo programma interno.</p>
<p><strong>Apparecchiature di sterilizzazione (autoclave):</strong> controlli giornalieri (es. vacuum test ove previsto); test chimici a ogni ciclo; controlli periodici tipo Bowie-Dick / Helix secondo protocollo del fabbricante e normativa di riferimento.</p>
<p><strong>Impianto elettrico:</strong> verifiche di sicurezza elettrica delle apparecchiature mediche secondo periodicità indicata in sede; controllo differenziali e illuminazione di emergenza come da documentazione di impianto.</p>
<p><strong>Presidi antincendio:</strong> controlli semestrali o secondo contratto di manutenzione; riferimento al documento 1A.03.05.02 e ai dati sui fornitori esterni.</p>
<p><strong>Impianto idrico / riserve:</strong> manutenzione e sanificazione secondo valutazione del rischio (es. legionella) e contratti con ditte specializzate ove affidati.</p>

<h2>Schede tipo — riunito odontoiatrico</h2>
<table class="data-table" style="width:100%;border-collapse:collapse;font-size:9pt;margin:0.5rem 0;">
<thead><tr>
<th style="border:1px solid #333;padding:0.25rem;">Tipologia controlli</th>
<th style="border:1px solid #333;padding:0.25rem;">Frequenza</th>
</tr></thead>
<tbody>
<tr><td style="border:1px solid #333;padding:0.28rem;">Verifiche di sicurezza elettrica</td><td style="border:1px solid #333;padding:0.28rem;">Come da programma / norma</td></tr>
<tr><td style="border:1px solid #333;padding:0.28rem;">Controllo funzionamento manipoli, aria/acqua, lampada</td><td style="border:1px solid #333;padding:0.28rem;">Giornaliera</td></tr>
<tr><td style="border:1px solid #333;padding:0.28rem;">Controllo aspirazione</td><td style="border:1px solid #333;padding:0.28rem;">Settimanale / secondo protocollo</td></tr>
</tbody>
</table>

<h2>Schede tipo — sterilizzatrice</h2>
<table class="data-table" style="width:100%;border-collapse:collapse;font-size:9pt;margin:0.5rem 0;">
<thead><tr>
<th style="border:1px solid #333;padding:0.25rem;">Tipologia controlli</th>
<th style="border:1px solid #333;padding:0.25rem;">Frequenza</th>
</tr></thead>
<tbody>
<tr><td style="border:1px solid #333;padding:0.28rem;">Verifiche di sicurezza elettrica</td><td style="border:1px solid #333;padding:0.28rem;">Programmata</td></tr>
<tr><td style="border:1px solid #333;padding:0.28rem;">Controllo vacuum / tenuta</td><td style="border:1px solid #333;padding:0.28rem;">Giornaliero o secondo fabbricante</td></tr>
<tr><td style="border:1px solid #333;padding:0.28rem;">Test Bowie-Dick / biologici / chimici</td><td style="border:1px solid #333;padding:0.28rem;">Come da protocollo interno</td></tr>
</tbody>
</table>

<h2>Fornitori e contratti</h2>
<p>Estremi di contratti di manutenzione, pulizie specialistiche o sanificazione impianti sono richiamati nella sezione fornitori del fascicolo e nel documento tecnico antincendio ove pertinente.</p>
${c.externalSectionHtml}
<p>Riferimento revisione documentale: <strong>${c.revision}</strong>.</p>
`;
}
