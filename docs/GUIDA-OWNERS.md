# Guida per i titolari (owners) — accesso e codici

Per chi **gestisce** il tool (studio, consulente, sviluppatore): generazione codici per gli utenti finali, variabili d’ambiente, emergenze.

Sostituire `https://TUO-DOMINIO` con il dominio reale (es. `https://www.dentalcontroller.it`).

## Ruoli delle pagine


| URL           | Chi la usa          | Scopo                                                                                                                             |
| ------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `/owner.html` | **Solo titolari**   | Generare **codici monouso** per gli utenti (serve `ACCESS_ADMIN_SECRET`). **Non** condividere questo link con i pazienti/clienti. |
| `/gate.html`  | **Utenti finali**   | Incollare il codice monouso e accedere all’app.                                                                                   |
| `/`           | Utenti dopo accesso | Wizard Allegato A1.                                                                                                               |


## Generare un codice (metodo consigliato)

1. Aprire `https://TUO-DOMINIO/owner.html` (da PC affidabile, browser aggiornato).
2. Nel campo **segreto amministratore** incollare il valore di `**ACCESS_ADMIN_SECRET`** (come configurato su Vercel).
3. Impostare **Validità (ore)** (es. `168` = 7 giorni; massimo configurato nel sistema: 720 ore).
4. Cliccare **Genera codice** e **copiare subito** il token mostrato: **non** sarà più recuperabile dall’interfaccia.
5. Inviare il token all’utente (canale sicuro a scelta). L’utente lo userà **una sola volta** su `/gate.html`.

## Variabili d’ambiente (Vercel — progetto frontend)


| Variabile             | Ruolo                                                                                                                                |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `ACCESS_GATE_ENABLED` | `true` per attivare il gate; assente o diverso da `true` = accesso libero (utile solo in dev con cautela).                           |
| `AUTH_SECRET`         | Segreto lungo per firmare il cookie di sessione (JWT). Se lo **cambi**, tutte le sessioni esistenti scadono.                         |
| `ACCESS_ADMIN_SECRET` | Segreto per **owner.html** e per l’API `POST /api/auth/mint` (stesso valore).                                                        |
| `ACCESS_MINT_ENABLED` | Opzionale: `false` per **bloccare solo** la creazione di nuovi codici (chi ha già sessione può restare dentro fino a scadenza).      |
| `SESSION_MAX_AGE_SEC` | Opzionale: durata cookie sessione in secondi (default circa 7 giorni).                                                               |
| Redis / KV            | `KV_REST_API_URL`, `KV_REST_API_TOKEN` oppure `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` (come fornito dall’integrazione). |
| `VITE_PDF_API_URL`    | URL pubblico del servizio PDF (senza `/` finale).                                                                                    |


Il gate **non** funziona senza Redis/KV collegato e senza `AUTH_SECRET` adeguato (vedi messaggi errore nelle API).

## Operazioni comuni

- **Revocare tutti gli accessi immediatamente:** cambiare `**AUTH_SECRET`** su Vercel e fare **redeploy**.  
- **Non dare più codici nuovi:** `ACCESS_MINT_ENABLED=false` oppure smettere di usare owner.html / mint.  
- **Logout utente:** l’app può esporre `POST /api/auth/logout` (cancella cookie); in alternativa l’utente cancella i cookie del sito.

## API tecnica (alternativa a owner.html)

`POST https://TUO-DOMINIO/api/auth/mint`  
Header: `Authorization: Bearer ACCESS_ADMIN_SECRET`  
Body JSON: `{"ttlHours":168}`  
Risposta: `token`, `ttlHours`, `expiresAt`.

## Sicurezza — buone pratiche

- Custodire `**ACCESS_ADMIN_SECRET`** e `**AUTH_SECRET`** come password forti (password manager).  
- **Non** inviare i segreti via email/chat non cifrata.  
- **Revocare** subito un token PAT o segreto se è stato esposto (screenshot, video, log).  
- Limitare la conoscenza dell’URL `/owner.html` al cerchio dei titolari.

## Deploy

Dopo modifiche al codice su GitHub, Vercel esegue il build del frontend (`apps/web`). Verificare che **Root Directory** sia `apps/web` e che le variabili siano definite per **Production** (e Preview se serve).

---

Per l’architettura tecnica e dove si modifica il PDF nel codice, vedere `docs/MEMO-SVILUPPO-PROGETTO.md` e il `README.md` in root.