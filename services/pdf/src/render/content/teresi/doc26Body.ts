import type { BodyContext } from "../contextBuilder.js";

/** Documento 26 — Carta dei servizi (1A.05.03.01), struttura tipo modulo Teresi. */
export function teresiDoc26MainHtml(c: BodyContext): string {
  const tel =
    c.studioPhone !== ""
      ? `<p><strong>Telefono:</strong> ${c.studioPhone}</p>`
      : `<p><strong>Telefono:</strong> <em>indicare nel modulo web.</em></p>`;
  const mail =
    c.studioEmail !== ""
      ? `<p><strong>E-mail:</strong> ${c.studioEmail}</p>`
      : `<p><strong>E-mail:</strong> <em>indicare nel modulo web.</em></p>`;

  return `
<h2>Carta dei servizi</h2>
<p>Gentile utente, la presente carta è volta alla tutela dei diritti degli utenti della struttura e costituisce strumento di trasparenza su modalità di erogazione, standard di qualità e informazioni complete. Si richiede collaborazione attiva, anche tramite questionari di soddisfazione, per il miglioramento continuo del servizio.</p>

<h2>1. Presentazione</h2>
<p><strong>${c.studioName}</strong> eroga prestazioni odontoiatriche ambulatoriali in ambienti organizzati secondo criteri di qualità e sicurezza. Le prestazioni comprendono, in relazione alle competenze professionali presenti, ambiti quali odontoiatria conservativa e restaurativa, chirurgia orale, protesi, ortodonzia, igiene orale, implantologia, endodonzia e altre attività coerenti con l’autorizzazione.</p>
<p><strong>Sede:</strong> ${c.address}.<br />
<strong>Titolare:</strong> ${c.ownerName}.<br />
${tel}
${mail}
</p>
${c.openingHoursBlockHtml}

<h2>2. Fini istituzionali (sintesi)</h2>
<ul>
<li>Facilitare l’accesso ai servizi e ridurre tempi di attesa compatibilmente con le risorse.</li>
<li>Ricercare sicurezza ed efficienza nelle procedure cliniche e nell’accoglienza.</li>
<li>Garantire qualità delle prestazioni e personalizzazione ove possibile.</li>
<li>Informare correttamente su iter diagnostici-terapeutici e esiti attesi.</li>
<li>Collaborare con il territorio (medici di medicina generale, specialisti, strutture pubbliche) nei limiti della struttura ambulatoriale.</li>
</ul>

<h2>3. Principi fondamentali</h2>
<ul>
<li><strong>Eguaglianza:</strong> accesso alle prestazioni senza discriminazioni illecite.</li>
<li><strong>Imparzialità e correttezza</strong> nel rapporto con l’utente.</li>
<li><strong>Efficienza ed efficacia</strong> organizzativa e clinica.</li>
<li><strong>Partecipazione:</strong> diritto a informazioni sulla propria persona, accesso alla documentazione secondo legge, reclami e suggerimenti.</li>
</ul>

<h2>4. Organizzazione</h2>
<p>La struttura può essere organizzata in forma semplice, con il titolare che coordina le attività critiche; il personale presente è indicato nei documenti organizzativi dell’Allegato A1.</p>
${c.staffSectionHtml || "<p><em>Elenco personale: vedi documenti risorse / organizzazione.</em></p>"}

<h2>5. Prestazioni, accesso e standard indicativi</h2>
<p>L’accesso avviene su prenotazione telefonica, digitale o sportello secondo modalità esposte in sede. Le <strong>urgenze odontoiatriche</strong> sono gestite con priorità clinica. I tempi di attesa per prestazioni programmate dipendono dalla complessità e dalla disponibilità; la struttura si impegna a comunicare tempi congrui.</p>
<p><strong>Pagamento:</strong> secondo preventivo e piano di cura concordato; modalità (contanti nei limiti di legge, bonifico, POS, eventuali finanziamenti) comunicate in accettazione.</p>

<h2>6. Tutela degli utenti e qualità</h2>
<p>Il titolare supervisiona le attività, analizza reclami e questionari, promuove azioni correttive e preventive e riesamina periodicamente i servizi. Si osserva il Codice deontologico degli odontoiatri e la normativa vigente.</p>

<h2>7. Reclami e osservazioni</h2>
<p>Reclami, osservazioni e suggerimenti possono essere presentati per iscritto (modulo in sede, e-mail o posta), verbalmente in accettazione o con le modalità descritte nella procedura dedicata (1A.01.06.01). È prevista risposta motivata nei tempi indicati in procedura e in questa carta esposta in sede.</p>

<h2>8. Disponibilità e revisione</h2>
<p>Copia della carta dei servizi è disponibile in sala d’attesa e in segreteria. Revisione almeno annuale o quando mutano servizi o organizzazione.</p>
`;
}
