# KIRAFA — first working platform foundation

KIRAFA marketplace starter built with React + Vite and Supabase. It includes the bilingual (Swahili/English) interface, categories, region/district filtering, seller signup/sign-in, product listing form, plan information, WhatsApp contact, and draft legal/policy pages.

## Current status (read before using)
- The frontend can run locally and build.
- Live accounts and listing storage require a Supabase project and configuration.
- New listings are submitted as `pending`; a trusted admin review workflow is required before public publication.
- The plan prices are displayed, but checkout and automatic subscription activation are **not implemented yet**. Do not treat a button or notice as proof of payment.
- The launch trial is shown in the interface as a launch offer; automatic five-day enforcement and a launch start date still need a secure backend function before public launch.
- Legal pages are drafts, not legal advice or verified compliance.
- Do not put Supabase service-role keys, mobile-money PINs, OTPs, or secret payment credentials in the frontend.

## 1. Run locally
Install Node.js LTS, then in this folder:
```bash
npm install
cp .env.example .env
npm run dev
```
Open the local URL Vite prints.

## 2. Set up Supabase
1. Create a Supabase project.
2. Open SQL Editor and run `supabase/schema.sql`.
3. In Project Settings > API, copy the project URL and anon/public key.
4. Put them in `.env` as `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
5. Configure Auth email confirmation and password policies.
6. Add your local and deployed URLs to Auth redirect URL settings.
7. Run `npm run dev` again.

## 3. Deploy
You can deploy the built frontend to a static hosting provider such as Netlify or Vercel:
```bash
npm run build
```
Publish the `dist` folder and set the same `VITE_` environment variables in the hosting dashboard. A public URL and custom domain require you to create/authorize the hosting account. Supabase database/auth is a separate service.

## 4. Before real public launch
Must be completed and tested:
- Admin moderation for listings and reports.
- Subscription request screen and trusted payment verification process.
- Secure server-side logic for launch window, trial expiry, plan activation/expiry, listing limits and promotion expiry.
- Seller's phone and consent/privacy controls; avoid exposing private contact data unnecessarily.
- Image upload storage with file type/size validation; currently image URL is optional.
- Legal review of terms, privacy, marketplace responsibility, consumer protection, data protection, advertising and regulated categories under applicable Tanzanian law.
- Accessibility, mobile/low-data testing, backup and security checks.
- Add region/district controlled choices and language preference persistence.

## Business rules agreed so far
- Brand: KIRAFA; tagline: “Mahali fursa zinapokufikia”.
- Initial audience: rural and regional producers in Tanzania with quality products who lack exposure.
- Languages: Swahili and English only; Swahili is default.
- WhatsApp: 0769001784 (international link format: 255769001784).
- Launch offer: first 5 days of KIRAFA's initial launch are free; not a recurring offer for every new seller.
- KIRAFA WIKI: TSh 7,000 / 7 days / maximum 10 active listings.
- KIRAFA MWEZI: TSh 24,000 / 30 days / unlimited active listings while paid, plus one free 7-day promoted listing.
- No commission and no product transaction payments collected by KIRAFA; buyer and seller handle product payment and transport directly.
- Product categories: farm produce; agriculture inputs/equipment; livestock/products; handmade crafts; honey/bee products; processed foods; fishing/aquaculture; trades/services; seedlings/gardening; other local products.
- Policy pages should be available in both languages and reviewed before launch.
