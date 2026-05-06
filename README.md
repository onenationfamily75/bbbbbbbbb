# Luxe Noir Beauty 🖤

Premium Women's Beauty & Skincare dropshipping store. Built with Vite + React + TypeScript + Tailwind CSS. Deployed on Cloudflare Pages.

## Tech Stack
- **Vite** — build tool
- **React 18** — UI framework
- **TypeScript** — type safety
- **Tailwind CSS** — styling
- **React Router** — routing
- **shadcn/ui** — UI components
- **Lucide React** — icons

## Local Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

## Cloudflare Pages Deployment

**Build settings in Cloudflare Dashboard:**

| Setting | Value |
|---|---|
| Framework preset | None (Vite) |
| Build command | `pnpm run build` |
| Output directory | `dist` |
| Node version | `20` |

**Environment variables to add in Cloudflare Pages → Settings:**
```
VITE_APP_TITLE = Luxe Noir Beauty
VITE_WHATSAPP_NUMBER = 254786781665
VITE_SITE_URL = https://luxe-noir-3im.pages.dev
```

## File Structure

```
├── public/
│   ├── robots.txt
│   ├── sitemap.xml
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ProductCard.tsx
│   ├── pages/
│   │   └── Index.tsx      ← Main homepage
│   ├── lib/
│   │   └── utils.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## WhatsApp Orders
All orders are confirmed via WhatsApp: **+254 786 781 665**
