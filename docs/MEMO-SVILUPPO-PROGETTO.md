# Memo sviluppo — Allegato A1

Documento di **memoria tecnica** per chi mantiene il progetto (te o altri sviluppatori). Complementare al `README.md` in root.

## Cosa fa il sistema

- **Web (Vite + React):** wizard a più passi che raccoglie i dati della struttura e invia il payload al servizio PDF.
- **Shared (`packages/shared`):** **unica fonte di verità** per:
  - elenco dei **32 documenti** Allegato A1 (ordine, codice requisito, titolo) — `documentRegistry.ts`;
  - **schema Zod** dei campi form — `schema.ts`;
  - logica **varianti** di testo (es. assenza RX, gas, tirocinanti) — `resolveDocuments()`.
- **PDF (`services/pdf`):** API **Fastify** che riceve il JSON, costruisce HTML (template + blocchi per ordine) e genera il file con **Playwright** (Chromium headless).

Il PDF **non** è generato su Vercel: gira in **container Docker** (vedi `Dockerfile` in root) su un host tipo Render / Fly / Railway, con **CORS** verso il dominio del frontend.

## Architettura deploy (tipica)

| Componente | Dove | Note |
|------------|------|------|
| Frontend | **Vercel** | Root directory progetto: `apps/web` (monorepo). |
| PDF | **Container** (es. Render) | Build dalla **root** repo, stesso `Dockerfile`. |
| Redis / KV | **Vercel + Upstash** | Codici monouso gate (opzionale). |

Variabili chiave:

- **Vercel (`apps/web`):** `VITE_PDF_API_URL` = URL pubblico servizio PDF (senza `/` finale).
- **Servizio PDF:** `CORS_ORIGIN` = dominio/i del sito (virgola, senza `/` finale), vedi `README.md`.
- **Gate (opzionale):** `ACCESS_GATE_ENABLED`, `AUTH_SECRET`, `ACCESS_ADMIN_SECRET`, variabili KV/Redis — vedi `docs/GUIDA-OWNERS.md`.

## Dove intervenire per modifiche “solo PDF”

1. **Testi / layout sezioni documento**  
   Cartella `services/pdf/src/render/` — in particolare:
   - `content/longFormBodies.ts`, `blocksForms.ts`, `articulatedRouter.ts`, `normativePreamble.ts`, `contextBuilder.ts`, `htmlAssembly.ts`, `boilerplate.ts`.

2. **Ordine o codici dei 32 requisiti**  
   Solo `packages/shared/src/documentRegistry.ts` (e allineare eventuali riferimenti per `order` in `resolveDocuments` e nei template PDF).

3. **Campi che l’utente compila nel wizard**  
   - Schema e default: `packages/shared/src/schema.ts`  
   - UI passi: `apps/web/src/App.tsx` (etichette passi in `STEP_LABELS` + JSX per campo).  
   Dopo aver cambiato lo schema, aggiornare il PDF se quei dati devono comparire nel render (`contextBuilder` / template).

4. **Margini, CSS, impaginazione PDF**  
   Stili e assemblaggio HTML in `services/pdf` (e eventuali regole nel boilerplate). Ricompilare e **ridistribuire il container** PDF.

Flusso consigliato dopo una modifica al PDF: `npm run build -w @allegato-a1/pdf-service` in locale, test con `npm run dev`, poi deploy immagine.

## Accesso riservato (gate) — ricordo tecnico

- `apps/web/middleware.ts` — protegge solo `/` e `index.html`; esclude `gate.html`, `owner.html`, `/api/auth/*`, `/assets/*`.
- `apps/web/api/auth/mint.ts`, `redeem.ts`, `logout.ts` — Edge su Vercel.
- `apps/web/lib/auth-jwt.ts`, `kv-client.ts`, `otp-token.ts`.

## Sviluppo locale

```powershell
cd C:\Users\Utente\Projects\AllegatoA1
npm install
npm run dev
```

- UI: `http://localhost:5173` (proxy verso PDF su `127.0.0.1:8787`).
- Primo avvio PDF: `npx playwright install` se manca Chromium.

Per disattivare il gate in locale: non impostare `ACCESS_GATE_ENABLED=true` (o non impostare `AUTH_SECRET`).

## Nota legale (da `README`)

I testi nel PDF sono stati trattati come **placeholder tecnici** rispetto al modulo regionale / manuale OTA: per uso ufficiale serve **validazione legale** dei contenuti.

## Repository e Git

Aprire in GitHub Desktop **sempre** la cartella corretta del monorepo (es. `...\AllegatoA1`), altrimenti si vedono branch/commit diversi da quelli su disco.

---

*Ultimo aggiornamento memo: allineato allo stato del progetto con gate Vercel, `owner.html` e deploy su `main`.*
