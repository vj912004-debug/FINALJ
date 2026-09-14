# Architecture — TechStrota-aligned stack

```
finalj/
├── prisma/
│   └── schema.prisma          # ContactInquiry model (PostgreSQL / MySQL)
├── public/
│   └── brochure/              # Existing brand imagery (unchanged)
├── src/
│   ├── actions/
│   │   └── contact.ts         # Server Action (optional path)
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts   # POST /api/contact → Prisma
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── facilities/page.tsx
│   │   ├── products/page.tsx
│   │   ├── resources/page.tsx
│   │   ├── services/page.tsx
│   │   ├── layout.tsx         # Header + Footer shell
│   │   ├── page.tsx           # Home
│   │   └── globals.css
│   ├── components/
│   │   ├── motion/Motion.tsx  # Framer Motion primitives
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── InquiryForm.tsx    # Posts to /api/contact
│   │   └── …
│   ├── data/
│   │   └── site.ts            # Business copy (unchanged)
│   └── lib/
│       ├── prisma.ts
│       └── validators/
│           └── contact.ts
├── Dockerfile
├── docker-compose.yml
├── .env.example
└── package.json
```

## Stack
- Next.js App Router + TypeScript + Tailwind CSS
- Lucide React + Framer Motion
- Prisma ORM → PostgreSQL (MySQL-ready)
- API Route + Server Action for inquiries
- Docker Compose for VPS / AWS; Vercel-ready (`prisma generate` on build)
