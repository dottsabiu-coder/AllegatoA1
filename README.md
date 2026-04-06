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

## Deploy: Vercel + Railway (consigliato)

- **Vercel** → ospita lo **static bundle** di `apps/web` (React/Vite). Imposta **Root Directory** su `apps/web`. Il file `apps/web/vercel.json` esegue install/build dalla root del monorepo.
- **Variabile su Vercel:** `VITE_PDF_API_URL` = URL pubblico del servizio PDF (es. `https://tuoi-pdf.up.railway.app`), **senza** slash finale.

- **Railway** → ospita **`services/pdf`** (Node + Playwright + Chromium). Usa il `Dockerfile` in root del repo (contesto di build = intero monorepo). Imposta:
  - `PORT` (spesso assegnato automaticamente da Railway)
  - `CORS_ORIGIN` = origine del frontend Vercel (es. `https://tuo-progetto.vercel.app`), oppure più origini separate da virgola.

**Perché non tutto su Vercel:** Playwright e Chromium superano i limiti tipici delle funzioni serverless; un container su Railway è l’approccio più stabile per generare PDF in produzione.

## Scalabilità

- Aggiungi template per documento in `services/pdf/src/render/` (o spezza in file per `order`) senza toccare il registry se i codici restano gli stessi.
- Il registry e lo schema in `packages/shared` sono la singola fonte di verità per ordine, codici e validazione (web + PDF).

## Nota legale

I testi nel PDF sono **placeholder tecnici**: sostituirli con redazioni validate rispetto al modulo regionale e al manuale OTA prima di ogni uso ufficiale.
