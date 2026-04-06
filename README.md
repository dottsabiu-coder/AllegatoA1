# Allegato A1

Monorepo per la compilazione guidata e la generazione PDF dell’Allegato A1 (struttura monopresidio, contesto normativo Sicilia — vedi `.cursor/rules/`).

## Struttura

| Cartella | Ruolo |
|----------|--------|
| `packages/shared` | Registry dei 32 documenti, codici requisito, schema Zod condiviso |
| `apps/web` | Frontend React + Vite (wizard) |
| `services/pdf` | API Fastify + Playwright → PDF unico |
| `docs/normativa/` | PDF ufficiali **solo in locale** (gitignored) |

## Sviluppo locale

```powershell
cd C:\Users\Utente\Projects\AllegatoA1
npm install
npm run dev
```

- UI: `http://localhost:5173` (proxy verso il PDF su `http://127.0.0.1:8787` tramite `/api/pdf`)
- PDF: porta `8787`

La prima volta, se il servizio PDF non parte, esegui `npm run build -w @allegato-a1/shared`. Su Windows/macOS serve anche Chromium per Playwright: `npx playwright install` dalla root (o solo sotto `services/pdf`).

## Deploy: Vercel (frontend) + container PDF

Il **frontend** resta su **Vercel** (Root Directory `apps/web`, variabile `VITE_PDF_API_URL` = URL pubblico del PDF, senza slash finale).

Il **servizio PDF** è un **container Docker** (`Dockerfile` nella root del repo). Se **Railway** non è disponibile (limiti account, deploy in pausa, ecc.), stesse immagine e stesse variabili su un altro host.

### Opzione A — Render

1. [render.com](https://render.com) → **New** → **Blueprint** (o **Web Service** con **Docker**).
2. Collega il repo; contesto build = **root**; `Dockerfile` = `./Dockerfile`.
3. Nel repo c’è un esempio **`render.yaml`**: puoi importarlo come blueprint (verifica sul sito se il tuo piano supporta **Docker** — a volte serve piano a pagamento).
4. Variabili: `CORS_ORIGIN` = URL Vercel (es. `https://tuo-progetto.vercel.app`). `PORT` è impostato da Render.
5. Dopo il deploy: prova `https://<host-render>/health`.

### Opzione B — Fly.io

1. Installa [flyctl](https://fly.io/docs/hands-on/install-flyctl/), poi `fly auth login`.
2. Dalla root del repo: `fly launch` → scegli **Dockerfile** esistente (c’è anche un **`fly.toml`** di partenza; se il nome `app` è già preso, Fly ne propone un altro).
3. Playwright/Chromium in container richiede **RAM sufficiente** (es. 1–2 GB): in `fly.toml` regola `[[vm]] memory` se il deploy crasha per OOM.
4. Variabile: `CORS_ORIGIN` come sopra. `fly secrets set CORS_ORIGIN=https://tuo-progetto.vercel.app`
5. URL pubblico tipo `https://<app>.fly.dev` → usalo in `VITE_PDF_API_URL` su Vercel.

### Opzione C — Railway (se riparte)

Stesso `Dockerfile`, root repo, variabili `CORS_ORIGIN` (e `PORT` se richiesto). Utile quando l’account torna attivo.

**Perché non tutto su Vercel:** Playwright + Chromium non sono adatti alle serverless tipiche di Vercel; il PDF va su un **servizio container** (Render, Fly, Railway, Cloud Run, ecc.).

### Chiusura CORS

Sul servizio PDF (Render, ecc.):

- **`CORS_ORIGIN`**: origini extra consentite (es. dominio custom), separate da **virgola**, senza slash finale. Può restare vuota: il servizio PDF accetta comunque **tutti** i siti su **`https://*.vercel.app`** (produzione e **preview** tipo `*-git-*-*.vercel.app`), così non devi elencare ogni URL di preview.
- Se `CORS_ORIGIN` è **vuota o assente**, il backend accetta qualsiasi origine (riflessa nella risposta).
- Per disattivare il wildcard Vercel e usare **solo** la lista: **`CORS_NO_VERCEL_WILDCARD=true`**.

## Scalabilità

- Aggiungi template per documento in `services/pdf/src/render/` (o spezza in file per `order`) senza toccare il registry se i codici restano gli stessi.
- Il registry e lo schema in `packages/shared` sono la singola fonte di verità per ordine, codici e validazione (web + PDF).

## Nota legale

I testi nel PDF sono **placeholder tecnici**: sostituirli con redazioni validate rispetto al modulo regionale e al manuale OTA prima di ogni uso ufficiale.
