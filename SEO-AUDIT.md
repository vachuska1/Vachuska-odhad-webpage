# Technický SEO audit — 1. 10. 2026

Audit vychází z aktuálního projektu a jeho produkčního sestavení. Nejde o audit dřívějšího živého webu. Změny zatím nebyly nasazeny do Vercelu ani odeslány do Search Console.

## Rozsah a obsah

- Zachovány současné služby, viditelné texty a jejich pořadí. Žádné nové lokální stránky nevznikly.
- Kontrola pokrývá 25 současných stránek ve třech jazycích: celkem 75 indexovatelných URL.
- Mezi nimi je 17 dosavadních lokálních stránek v každém jazyce. Zůstaly v hierarchii Působnost → lokalita, s původními konkrétními informacemi o okolních obcích a podkladech. Další lokality se automaticky negenerují.
- Patička odkazuje na služby, FAQ a Působnost. Neobsahuje seznam měst.
- Nikde nejsou přidávány pobočky, hodnocení, recenze, ceny ani nové provozovny. Jediné sídlo je Slatina 68, 341 01 Slatina.

## Metadata a indexace

- Každá z 75 URL má jedinečný title a meta description odpovídající stránce a jejímu jazyku.
- Každá má jeden H1. Služby mají H2 pro obsahové sekce; FAQ používá H2 pro otázky; karty homepage jsou pod H2 sekce služeb.
- Canonical směřuje na finální URL ve stejném jazyce. Jazykové alternativy cs/en/de a x-default jsou vzájemné, dostupné a shodné s mapou webu.
- Open Graph a Twitter metadata obsahují správnou URL, titulek, popis a existující portrétní fotografii s popisem a rozměry.
- Sitemap vzniká z registru skutečných jazykových cest. Obsahuje pouze finální veřejné stránky; žádné staré přesměrované adresy, technické URL nebo umělé lastModified.
- robots.txt veřejné stránky neblokuje a uvádí absolutní adresu sitemap.xml.
- Ověřovací soubor a meta tag Google zůstaly zachovány.

## Strukturovaná data

- LocalBusiness: skutečné jméno, adresa, telefon, e-mail, IČO, souřadnice sídla a Instagram.
- WebSite: název webu a jeho jazyky, s vazbou na provozovatele.
- Service: tři skutečné služby, jejich finální jazykové URL, popisy a působnost. Celorepubliková působnost dědických odhadů je v popisu podmíněna možností zpracování z podkladů.
- BreadcrumbList: Působnost a jednotlivé místní stránky v odpovídajícím jazyce.
- FAQPage: přesně sedm otázek a odpovědí shodných s HTML. Odpovědi jsou dostupné už v serverovém HTML před rozkliknutím.
- Kontrola ověřila parsování 141 JSON-LD bloků, jejich typy, požadované vazby a údaje, pořadí a cíle drobečkové navigace i shodu FAQ s obsahem stránky. Zobrazení rozšířeného výsledku ve vyhledávači se tím neslibuje.

## URL a přesměrování

Finální české služby:

- /odhad-pro-dedicke-rizeni
- /odhad-pro-vlastni-potrebu
- /odhad-vyporadani-majetku

Šest starších adres vrací přímé trvalé přesměrování 308 na příslušnou aktuální stránku. Všechny interní odkazy používají finální adresy. Odstraněný /webdesign a neexistující cizojazyčné stránky vracejí 404.

Middleware sjednocuje veřejné stránky z odhadyvachuska.cz a HTTP varianty www na https://www.odhadyvachuska.cz; zachovává cestu a query parametry. Lokální a náhledové domény nepřesměrovává. Ověřeno lokálně pomocí skutečné hlavičky Host a X-Forwarded-Proto. Nastavení primární domény a HTTPS u Vercelu je nutné zachovat i při nasazení, včetně obsluhy statických souborů mimo middleware.

## Úklid

- Odstraněno 63 nedostupných/nepoužívaných zdrojových souborů: ukázky tvorby webů, jejich slider, staré přepínače, nepoužívaná časová osa, staré formulářové ukázky a nepoužívané UI komponenty, hooks, stylesheet a e-mailová šablona.
- Odstraněno 16 nepotřebných veřejných souborů: staré reference a placeholder obrázky včetně zodborovany.png, superpricky.png a recyclesound.png; také browserconfig.xml odkazující na neexistující obrázky dlaždic.
- Úspora zdrojových a veřejných souborů přibližně 7 MB. Aktuální public má přibližně 2 MB.
- Odstraněno 39 nepoužívaných přímých knihoven. npm lockfile je sjednocený s přesnými verzemi, na kterých fungoval web; duplicitní pnpm lockfile byl odstraněn.
- Čistá instalace npm ci, testy a produkční sestavení prošly. Resend a odesílatel onboarding@resend.dev zůstaly zachovány.

## Mobil a výkon

- Vlajka je vedle hamburgeru; v přepínači jsou pouze vlajky, s přístupnými názvy jazyků pro čtečky obrazovky. Menu na menších zařízeních je vycentrované.
- Ověřeno v prohlížeči na šířkách 320, 390, 1200 a 1440 px ve všech třech jazycích, bez horizontálního přetékání. Ověřeno rozbalení, odkazy a zavření klávesou Escape.
- Přepínač již nepotřebuje obecnou knihovnu dropdown menu. First Load JS homepage podle sestavení klesl z přibližně 164 na 139 kB (asi o 15 %).
- Fonty Manrope jsou lokální, používají font-display: swap a preload. Fotografie má popisný alt, responzivní sizes a optimalizaci přes Next Image. Google Maps zůstává nenačtená do udělení souhlasu a poté má lazy loading.
- Lokální laboratorní měření Chromium proti produkčnímu náhledu, bez zpomalování CPU/sítě a s vypnutou cache prohlížeče: desktop 1440 px LCP přibližně 140 ms, CLS 0; mobilní viewport 390 px LCP přibližně 36 ms, CLS 0. Přenesené zdroje přibližně 265/238 kB. Jde o localhost, nikoli o reálnou mobilní síť nebo terénní Core Web Vitals. INP nebylo z těchto několika interakcí vyhodnocováno jako terénní metrika.

## Ověření a opakování

- npm ci
- npm test — 11 testů validace formuláře, příloh a jazykových vazeb
- npm run lint — TypeScript
- npm run build
- npm start -- --hostname 127.0.0.1 --port 3102
- npm run audit:seo — kontrola všech 75 stránek, metadat, H1, jazyků, canonical, JSON-LD, interních odkazů, obrázků, robots, 404 a 6 přesměrování

Pro jiný náhled lze nastavit SEO_BASE_URL. Audit pouze čte stránky, neposílá formulář ani e-maily.

Po nasazení: zkontrolovat primární doménu, spustit audit nad nasazeným webem, odeslat sitemap https://www.odhadyvachuska.cz/sitemap.xml do Search Console a ověřit klíčové URL nástrojem Kontrola adresy URL. Reálné Core Web Vitals a indexaci vyhodnocovat z dat nasazené verze. Tyto úkony v účtu Search Console nebyly součástí lokálního zásahu.

## Podklady

Jazykové alternativy a canonical byly řešeny podle [Google Search Central – localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions) a [canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls). Údaje o podnikání vycházejí ze skutečného obsahu webu a [dokumentace LocalBusiness](https://developers.google.com/search/docs/appearance/structured-data/local-business).
