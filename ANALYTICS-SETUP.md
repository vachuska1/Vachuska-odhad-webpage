# GA4 přes GTM – nastavení a ověření

Skutečný kontejner: **GTM-M38L5KDC**. GA4 Measurement ID: **G-V5KHEG1Z4M**. Lokální `.env.local` obsahuje `NEXT_PUBLIC_GTM_ID=GTM-M38L5KDC`; tento soubor se neodesílá do GitHubu ani automaticky do Vercelu. Bez platného NEXT_PUBLIC_GTM_ID a analytického souhlasu se Google Tag Manager nestahuje. Tento dokument je v kořeni repozitáře, nikoliv veřejná stránka webu.

## 1. Google Analytics

Použijte již vytvořený webový datový stream **G-V5KHEG1Z4M** pro https://www.odhadyvachuska.cz (časové pásmo Praha, měna CZK). Nevytvářejte druhý stream ani službu. Nevkládejte další přímý gtag skript do webu.

Ve streamu vypněte Rozšířené měření (Enhanced measurement), zejména automatické zobrazení stránek / změny historie a interakce s formuláři. Web posílá vlastní události; automatické form_submit by neznamenalo úspěšné doručení. Ponechte Google Signals, sběr údajů poskytnutých uživatelem a personalizaci reklamy vypnuté. Doporučená retence podrobných událostí: 2 měsíce (agregované standardní přehledy mají jiný režim uchování).

## 2. Google Tag Manager

Použijte existující kontejner **GTM-M38L5KDC**. Do Vercel → Settings → Environment Variables ručně přidejte název `NEXT_PUBLIC_GTM_ID`, hodnotu `GTM-M38L5KDC`, prostředí **Production**, a proveďte nový deployment s aktuálním kódem. Lokální `.env.local` je již nastavený; běžící dev server je nutné restartovat. Do Preview proměnnou přidávejte pouze pokud chcete měřit i testovací nasazení. ID je veřejné, nejde o API klíč. GA4 ID se zadává pouze v GTM, další env proměnná není potřeba.

Nevkládejte dodatečný GTM snippet ani noscript iframe: načtení podle souhlasu již zajišťuje web.

### Proměnné a značky

Nejprve projděte existující značky kontejneru. Pokud již obsahuje Google tag nebo GA4 události pro tento stream, upravte je podle následujícího nastavení, nevytvářejte paralelní kopie. Nastavení v Google účtech a publikace kontejneru nebyly provedeny z tohoto projektu.

Vytvořte proměnné Data Layer Variable (verze 2), názvy klíčů přesně:

- page_location, page_referrer, page_title, page_path
- form_name, service_type, link_url, link_text
- campaign_source, campaign_medium, campaign_name, campaign_id, campaign_term, campaign_content

1. Značka **Google tag**: Tag ID = **G-V5KHEG1Z4M**. Trigger **Initialization – All Pages** (kontejner se fyzicky načte až po analytickém souhlasu). Configuration parameters:
   - send_page_view = boolean false
   - page_location a page_referrer = odpovídající Data Layer Variables (očištěné URL)
   - campaign_source / campaign_medium / campaign_name / campaign_id / campaign_term / campaign_content = odpovídající Data Layer Variables
   - allow_google_signals = boolean false
   - allow_ad_personalization_signals = boolean false
2. Značka **Google Analytics: GA4 Event**: Measurement ID **G-V5KHEG1Z4M**, event name `page_view`. Trigger Custom Event přesně `page_view`. Parametry page_location, page_referrer, page_title, page_path a campaign_* z výše uvedených proměnných.
3. Značka **Google Analytics: GA4 Event**: Measurement ID **G-V5KHEG1Z4M**, event name = vestavěná proměnná `{{Event}}`. Trigger Custom Event s regulárním výrazem `^(generate_lead|click_phone|click_email)$`. Parametry page_location, page_path, form_name, service_type, link_url, link_text = odpovídající proměnné.

U všech tří značek vyžadujte v Consent Settings navíc **analytics_storage**. Nepřidávejte další History Change, All Links ani Form Submission triggery, jinak by docházelo k duplicitám. Google tag nesmí sám posílat page_view. Consent default/update už před startem GTM posílá web: analytics_storage je granted jen po souhlasu, ad_storage, ad_user_data a ad_personalization zůstávají denied. Nepřidávejte další tag měnící souhlas ani reklamní značky.

Ověřte v Preview, poté kontejner **Submit → Publish**. Samotné vložení GTM ID bez publikovaných značek GA4 nic neměří.

## 3. Význam a pokrytí událostí

- page_view: první stránka po souhlasu a následné navigace Next.js, včetně jazyků a lokálních landing pages. Stejná URL se neopakuje při rerenderu. Pouhá změna fragmentu není další stránka.
- generate_lead: pouze úspěšná odpověď serverové akce po přijetí e-mailu poskytovatelem Resend. Nejde o potvrzení přečtení či doručení do inboxu. form_name = property_enquiry, page_path = stránka odeslání, service_type = inheritance / personal / settlement / other podle výběru. Jeden společný formulář pro všechny stránky. Žádné jméno, e-mail klienta, telefon, poznámky, parcely nebo přílohy v dataLayer.
- click_phone / click_email: jeden delegovaný click listener zahrnuje hlavičku, homepage CTA, service/area CTA, patičku, plovoucí kontakty, mobilní spodní lištu a odkazy v zásadách. Zachytí také kliknutí na vnořenou ikonu a aktivaci odkazu klávesnicí. WhatsApp se do těchto událostí nezapočítává. Kliknutí na telefon neprokazuje uskutečněný hovor.
- link_url obsahuje veřejný kontaktní odkaz bez query/fragmentu, link_text jeho viditelný text. URL pro analytiku obsahují jen UTM; ostatní query a fragmenty se neposílají. Do UTM nikdy nevkládejte osobní údaje.

Při povolení analytiky po vnitřní navigaci se původní UTM zachovají pouze v paměti aktuálního dokumentu pro přiřazení kampaně. Před souhlasem se návštěvy ani kliknutí nezaznamenávají zpětně. Při novém načtení jiné stránky bez UTM a bez dřívějšího souhlasu nelze původní kampaň obnovit. Adresa v prohlížeči se nijak nemění, přesměrování domény UTM zachovává.

## 4. Consent a testování

Cookie preference zůstávají pod stejným localStorage klíčem, ale mají verzi 2 a samostatná pole maps/analytics. Starý souhlas s mapou není souhlasem s analytikou; návštěvník znovu dostane nabídku. Povolení mapy nikdy nezapíná analytiku. Odmítnutí analytiky nebrání odeslání formuláře. Při odvolání analytiky dojde k uložení nové volby, aktualizaci consent na denied, odstranění dostupných _ga/_gid/_gat cookies a obnovení stránky pro úplné ukončení již načtených skriptů. Synchronizuje se změna z jiné záložky; preference expirují po 180 dnech.

V GTM Preview / Tag Assistant připojte web, potom výslovně povolte analytiku. GTM Preview / Tag Assistant aktivuje ladění. Pokud se zařízení v DebugView neobjeví, přidejte do obou GA4 Event značek dočasně `debug_mode = true` a ověřte v Preview; před publikováním tento parametr úplně odstraňte. Nenastavujte jej na false, protože vypnutí vyžaduje jeho vynechání. V GA4 → Admin → DebugView sledujte:

1. Bez souhlasu / při odmítnutí žádné GTM/GA požadavky ani analytické cookies. Samotné povolení mapy nesmí spustit Analytics. Tag Assistant může do udělení souhlasu hlásit, že kontejner nebyl nalezen; to je očekávané.
2. Po souhlasu právě jeden page_view; po interním přechodu další právě jeden. Testujte návrat tlačítkem Zpět a přepnutí jazyka, desktop i mobil.
3. Jeden click_phone / click_email při aktivaci odkazu, včetně ikon a mobilního menu.
4. Neplatný formulář a neúspěšný serverový požadavek: žádný generate_lead. Skutečně úspěšná testovací poptávka: právě jeden generate_lead, správný page_path a service_type. Tento test pošle skutečný e-mail; nepoužívejte osobní údaje třetích osob.
5. Odvolejte analytiku v patičce: po obnovení žádné další měření. Ověřte odděleně volbu mapy a analytiky a změnu souhlasu v jiné záložce.
6. Sklik URL níže: page_location obsahuje UTM, první campaign_source=seznam, campaign_medium=cpc, campaign_name=dedictvi.

Lokální automatické testy: `npm test`; typová kontrola: `npm run lint`; produkční sestavení: `npm run build`. Testy analytiky používají izolované stuby, neposílají Google požadavky ani e-maily. Koncové ověření v GA4 je nutné až se skutečnými ID a publikovaným kontejnerem. Adblock nebo odmítnutí souhlasu může měření blokovat; počty odpovídají měřeným návštěvníkům, nikoli všem skutečným poptávkám.

## 5. Klíčová událost a vyhodnocení Skliku

V GA4 → Admin → Events označte generate_lead hvězdičkou jako klíčovou událost (Key event); pokud ještě není v seznamu, nejprve odešlete testovací poptávku. Neoznačujte automatické form_submit jako konverzi. Volitelně založte event-scoped custom dimensions form_name a service_type (případně page_path/link_text pro průzkumy).

V přehledu Traffic acquisition filtrujte Session source / medium = `seznam / cpc`, kampaň `dedictvi`. Zobrazte sessions, users, event count filtrovaný na click_phone/click_email, key events generate_lead a Session key event rate pro generate_lead. V Landing page přehledu se stejným filtrem ověřte vstupní stránku. Míra klíčové události relací = podíl relací s poptávkou, nikoliv počet poptávek dělený uživateli. Standardní přehledy se zpracovávají se zpožděním, pro test použijte DebugView/Realtime.

Finální URL pro Sklik (zachovejte jednotně malá písmena):

https://www.odhadyvachuska.cz/odhad-pro-dedicke-rizeni?utm_source=seznam&utm_medium=cpc&utm_campaign=dedictvi

Volitelně rozlišujte reklamy pomocí utm_content. Jde o měření v GA4, nikoli přímé odesílání konverzí do reklamního účtu Sklik; jeho konverzní pixel není součástí této implementace.

## Oficiální dokumentace

- https://developers.google.com/tag-platform/security/guides/consent
- https://developers.google.com/tag-platform/security/concepts/consent-mode
- https://developers.google.com/analytics/devguides/collection/ga4/views
- https://support.google.com/analytics/answer/7201382
- https://support.google.com/analytics/answer/9322688
- https://support.google.com/analytics/answer/11397207
