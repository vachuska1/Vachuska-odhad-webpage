# Nasazení

Projekt nadále používá Next.js a Resend.

- Sestavení: `npm run build`; spuštění: `npm start`.
- Na hostingu musí zůstat nastavený `RESEND_API_KEY`. Příjemce zůstává `odhadyvachuska@gmail.com`, odesílatel `onboarding@resend.dev`. Při změně účtu Resend ověřte, že tento odesílatel smí doručovat tomuto příjemci.
- Po nasazení odešlete jednu kontrolní poptávku a ověřte doručení včetně telefonu, služby, katastrálního území a čísla LV. Lokálně byla transportní vrstva testována simulací, bez odeslání skutečného e-mailu.
- Canonical, sitemap a robots používají jednotně `https://www.odhadyvachuska.cz`. Hosting má přesměrovat variantu bez www na tuto adresu.
- V Google Search Console odešlete `https://www.odhadyvachuska.cz/sitemap.xml`. Dosavadní ověřovací HTML soubor a meta tag zůstávají zachované. Přihlášení ani odeslání sitemap do účtu nebylo součástí lokální úpravy.
- Staré adresy služeb a `/odhady` mají trvalá přesměrování. `/webdesign` už nemá stránku a vrací 404.
- Lokální texty a jejich seznam jsou v `lib/areas.ts`. Každá oblast má jednu URL; všechny jsou propojené přes `/pusobnost` a sitemapu. Jediná firemní adresa je Slatina 68.

## Lokální vývoj

`npm run dev` používá vlastní adresář `.next-dev`. Produkční `npm run build` a `npm start` používají `.next`. Díky tomu produkční sestavení nepřepisuje chunky běžícího vývojového serveru. Pro běžné úpravy používejte vývojový server a jeho automatické obnovování.

## Formulář a přílohy

- Kontaktní jméno, typ odhadu, telefon, e-mail a souhlas jsou povinné. U každé nemovitosti lze zadat také čísla parcel oddělená čárkou. Údaje k až 10 nemovitostem a podklady jsou volitelné.
- Povoleny jsou PDF, JPG/JPEG, PNG, HEIC a WebP, nejvýše 20 souborů a celkem 4 MiB. Limit je kontrolován v prohlížeči i na serveru. Server navíc ověřuje základní podpis souboru.
- Limit serverové akce je 4,5 MiB; součet souborů nechává prostor pro multipart formulář. Pro větší podklady je nyní uveden kontakt e-mailem; neexistuje další úložiště ani veřejný adresář uploadů.
- Přílohy se předávají jako skutečné přílohy e-mailu přes Resend. `npm test` ověřuje validaci a předání údajů i souborů simulovanému transportu, bez odesílání skutečných zpráv.
- Reálné doručení je třeba ověřit s produkční konfigurací Resend po nasazení. Zachován původní odesílatel `onboarding@resend.dev` a příjemce `odhadyvachuska@gmail.com`.

## Soukromí a mapa

- Google Maps se načte pouze po souhlasu s externím obsahem. Před souhlasem se nevkládá iframe ani nespojuje prohlížeč s Google Maps.
- Volba se ukládá na 180 dní do localStorage pod klíčem `odhady-cookie-preferences-v1`. Odmítnutí a přijetí jsou ve stejné vrstvě lišty; nastavení a odvolání jsou dostupné v patičce. Odvolání odstraní iframe, dříve uložené cookies Google se mažou v prohlížeči.
- Web nemá zapnuté analytické ani reklamní nástroje. Pokud se později přidají, musí se zapojit do souhlasu a aktualizovat informace na `/cookies` a `/ochrana-osobnich-udaju`.
- Mapový bod zůstává 49.38561420779924, 13.741843739481293, přiblížení je nyní 18.

Podklady: [ÚOOÚ – cookies](https://uoou.gov.cz/verejnost/qa-otazky-a-odpovedi/cookies), [Resend – přílohy](https://resend.com/docs/dashboard/emails/attachments), [Vercel – limity požadavků](https://vercel.com/docs/functions/limitations).

## Jazykové verze a Instagram

- Čeština zůstává na původních adresách. Anglická a německá verze jsou pod `/en` a `/de`, s lokalizovanými cestami z `lib/i18n.ts`.
- Přepínač jazyků zachovává odpovídající stránku. Přeložené jsou služby, regionální stránky, formulář, FAQ, soukromí, cookies a společné ovládání. Slovníky jsou v `lib/translations/`.
- Middleware předává jazyk kořenovému layoutu pro správný `html lang` už v serverovém HTML. Nevypínejte middleware při nasazení; běžné nasazení Next.js na Vercelu jej zahrnuje.
- Stránky mají vlastní canonical a jazykové alternativy, všechny varianty jsou v sitemapě. Formulář ponechává původní interní hodnoty pro serverovou validaci a český e-mail příjemci. Odesílatel `onboarding@resend.dev` zůstává beze změny.
- Instagram v patičce odkazuje na `https://www.instagram.com/ocenovani_vachuska/` a nepoužívá externí vložený widget.

## SEO audit a čistá instalace (1. 10. 2026)

Podrobný rozsah, výsledky a limity měření jsou v `SEO-AUDIT.md`. Projekt používá jediný npm lockfile; instalační příkaz je `npm ci`. Po nasazení zkontrolujte primární doménu `www.odhadyvachuska.cz` a HTTPS také v nastavení Vercelu. Staré služby zachovávají přesměrování 308; odstraněný webdesign zůstává 404.

Read-only audit spustíte příkazem `npm run audit:seo`, výchozí náhled je `http://127.0.0.1:3102`. Pro jiný server nastavte `SEO_BASE_URL`. Skript nekontaktuje klienty ani neposílá formulář.
