export const articlesPublishedAt = "2026-11-01"
export const articleCategories = [
 { id: 'inheritance', title: 'Dědické řízení', servicePath: '/odhad-pro-dedicke-rizeni', serviceLabel: 'Ocenění pro dědické řízení', enquiryType: 'Dědictví' },
 { id: 'settlement', title: 'Vypořádání a rozdělení majetku', servicePath: '/odhad-vyporadani-majetku', serviceLabel: 'Ocenění pro vypořádání majetku', enquiryType: 'Vypořádání majetku' },
 { id: 'sale', title: 'Koupě a prodej nemovitosti', servicePath: '/odhad-pro-vlastni-potrebu', serviceLabel: 'Ocenění pro vlastní potřebu', enquiryType: 'Pro vlastní potřebu' },
 { id: 'personal', title: 'Ocenění pro vlastní potřebu', servicePath: '/odhad-pro-vlastni-potrebu', serviceLabel: 'Ocenění pro vlastní potřebu', enquiryType: 'Pro vlastní potřebu' },
] as const
export type ArticleCategory = typeof articleCategories[number]['id']
export type ArticleBlock = { type: 'heading' | 'paragraph'; text: string } | { type: 'list'; items: string[] }
export type Article = { slug: string; title: string; seoTitle: string; description: string; cardDescription: string; intro: string; category: ArticleCategory; blocks: ArticleBlock[] }
export const articles: Article[] = [
  {
    "slug": "odhad-nemovitosti-pro-dedicke-rizeni",
    "title": "Potřebuji odhad nemovitosti pro dědické řízení. Jak postupovat?",
    "seoTitle": "Odhad nemovitosti pro dědické řízení | Ing. Aleš Vachuška",
    "description": "Potřebujete odhad nemovitosti pro notáře? Zjistěte, jak probíhá ocenění pro dědictví a jaké podklady potřebujete.",
    "intro": "Pokud je součástí dědictví nemovitost (rodinný dům, chata či chalupa, byt nebo pozemky), bude notář požadovat doložení její obvyklé ceny. K tomu zpravidla slouží písemný odhad nemovitosti.",
    "category": "inheritance",
    "blocks": [
      {
        "type": "heading",
        "text": "Co je potřeba k odhadu?"
      },
      {
        "type": "paragraph",
        "text": "Pro začátek stačí základní identifikace nemovitosti:"
      },
      {
        "type": "list",
        "items": [
          "**Rodinný dům nebo byt:** adresa, případně číslo listu vlastnictví (LV) a katastrální území.",
          "**Pozemky:** číslo LV a příslušné katastrální území.",
          "**Ostatní nemovitosti:** například zemědělské stavby, dílny nebo jiné objekty lze identifikovat pomocí parcelního čísla a katastrálního území.",
          "**Více nemovitostí:** například rodinný dům společně se zemědělskými nebo lesními pozemky. V tomto případě je nejvhodnější uvést čísla jednotlivých LV a příslušná katastrální území."
        ]
      },
      {
        "type": "paragraph",
        "text": "Další potřebné informace a podklady se případně upřesní."
      },
      {
        "type": "paragraph",
        "text": "Ocenění pro dědické řízení se vždy zpracovává ke dni úmrtí zůstavitele."
      },
      {
        "type": "heading",
        "text": "Jak odhad zpracovávám?"
      },
      {
        "type": "paragraph",
        "text": "Při ocenění vycházím ze skutečně realizovaných prodejů srovnatelných nemovitostí, nikoliv pouze z nabídkových cen uvedených v realitních inzerátech."
      },
      {
        "type": "paragraph",
        "text": "Odhad pro dědické řízení má oproti klasickému ocenění stručnější strukturu. **Samotný výpočet hodnoty však obvykle zůstává stejný.** Zjednodušuji především rozsah dokumentu, nikoliv způsob ocenění."
      },
      {
        "type": "paragraph",
        "text": "Cena odhadu je individuální podle rozsahu ocenění a dostupných podkladů. Konkrétní cenu si vždy odsouhlasíme před zahájením zpracování."
      },
      {
        "type": "paragraph",
        "text": "Stačí vyplnit kontaktní formulář níže a já se Vám ozvu, nebo zavolejte."
      }
    ],
    "cardDescription": "Co připravit a jak celý odhad probíhá."
  },
  {
    "slug": "kolik-stoji-odhad-pro-dedicke-rizeni",
    "title": "Kolik stojí odhad nemovitosti pro dědické řízení?",
    "seoTitle": "Kolik stojí odhad pro dědické řízení? | Ing. Aleš Vachuška",
    "description": "Cena odhadu pro notáře je individuální. Zjistěte, na čem závisí a jak získat konkrétní cenu před zahájením zpracování.",
    "intro": "Cena odhadu se stanovuje individuálně podle druhu nemovitosti a rozsahu ocenění. Jinak náročné je ocenění běžného bytu a jinak rodinného domu s více pozemky nebo souboru zemědělských nemovitostí.",
    "category": "inheritance",
    "blocks": [
      {
        "type": "heading",
        "text": "Jak se stanovuje cena odhadu?"
      },
      {
        "type": "paragraph",
        "text": "Pro stanovení ceny mi pro začátek stačí vědět, o jakou nemovitost se jedná, kde se nachází a k jakému datu má být oceněna (datum úmrtí zůstavitele). U většího počtu nemovitostí je nejvhodnější zaslat čísla listů vlastnictví (LV) a příslušná katastrální území."
      },
      {
        "type": "paragraph",
        "text": "Na základě těchto informací posoudím rozsah práce a sdělím konkrétní cenu, kterou si **vždy odsouhlasíme před zahájením zpracování**."
      },
      {
        "type": "heading",
        "text": "Co odhad obsahuje?"
      },
      {
        "type": "paragraph",
        "text": "Odhad pro dědické řízení má oproti klasickému ocenění stručnější strukturu. Samotný výpočet hodnoty však obvykle zůstává stejný a vychází ze skutečně realizovaných prodejů srovnatelných nemovitostí."
      }
    ],
    "cardDescription": "Co ovlivňuje rozsah práce a cenu odhadu."
  },
  {
    "slug": "odhad-pro-dedictvi-bez-prohlidky",
    "title": "Lze zpracovat odhad nemovitosti pro dědictví bez osobní prohlídky?",
    "seoTitle": "Odhad nemovitosti pro dědictví bez prohlídky",
    "description": "Je možné zpracovat odhad nemovitosti pro notáře bez osobní prohlídky? Kdy postačí fotografie a další podklady?",
    "intro": "Ano, v řadě případů lze odhad pro dědické řízení zpracovat i bez osobní prohlídky nemovitosti. Záleží především na jejím charakteru a dostupných podkladech.",
    "category": "inheritance",
    "blocks": [
      {
        "type": "heading",
        "text": "Jaké podklady jsou potřeba?"
      },
      {
        "type": "paragraph",
        "text": "**Rodinné domy, byty, chaty, chalupy a další stavby**"
      },
      {
        "type": "paragraph",
        "text": "U těchto nemovitostí má na výslednou hodnotu významný vliv také jejich technický stav. Proto klientům zasílám stručný formulář k vyplnění a požádám o vybrané fotografie nemovitosti. Na základě těchto podkladů lze v řadě případů ocenění zpracovat bez osobní prohlídky."
      },
      {
        "type": "paragraph",
        "text": "**Pozemky**"
      },
      {
        "type": "paragraph",
        "text": "U pozemků lze zpravidla vycházet z údajů katastru nemovitostí, územně plánovací dokumentace příslušné obce a veřejného registru půdy (LPIS). Podle charakteru pozemků mohou být potřebné i další informace."
      },
      {
        "type": "heading",
        "text": "Kdy je osobní prohlídka potřebná?"
      },
      {
        "type": "paragraph",
        "text": "Především v případech, kdy dostupné podklady neumožňují dostatečně posoudit technický stav, rozsah staveb nebo jejich skutečné využití."
      },
      {
        "type": "paragraph",
        "text": "Pokud podklady nestačí, domluvíme se na jejich doplnění nebo osobní prohlídce."
      },
      {
        "type": "heading",
        "text": "Kdy zvolit podrobnější odhad?"
      },
      {
        "type": "paragraph",
        "text": "Pokud potřebujete ocenění pouze pro účely dědického řízení, snažím se celý postup co nejvíce zjednodušit. Odhad má stručnější strukturu a omezuje zbytečně rozsáhlé popisy. **Samotný výpočet hodnoty a porovnání se skutečně realizovanými prodeji však zůstávají zachovány.**"
      },
      {
        "type": "paragraph",
        "text": "Pokud ale víte, že budete nemovitost po skončení dědického řízení například prodávat, vyplácet další spoluvlastníky, rozdělovat majetek nebo ji využijete při jiném majetkovém rozhodování, doporučuji zvážit klasický, podrobnější odhad včetně osobní prohlídky."
      },
      {
        "type": "paragraph",
        "text": "Ten umožňuje lépe posoudit skutečný technický stav, vybavení a případné nedostatky nemovitosti. Výsledný dokument pak může sloužit nejen pro dědické řízení, ale také jako podklad pro další rozhodování."
      },
      {
        "type": "paragraph",
        "text": "Konkrétní rozsah ocenění je proto vhodné domluvit předem podle toho, k čemu budete odhad potřebovat."
      }
    ],
    "cardDescription": "Kdy lze nemovitost ocenit pouze z dostupných podkladů."
  },
  {
    "slug": "podklady-pro-odhad-nemovitosti-dedictvi",
    "title": "Jaké podklady potřebuji k odhadu nemovitosti pro dědictví?",
    "seoTitle": "Co potřebuji k odhadu nemovitosti pro dědictví?",
    "description": "Jaké podklady jsou potřeba pro odhad nemovitosti pro notáře? Fotografie, parcely, list vlastnictví a datum úmrtí.",
    "intro": "Pro první domluvu stačí základní údaje o nemovitosti. Ostatní podklady si případně upřesníme.",
    "category": "inheritance",
    "blocks": [
      {
        "type": "heading",
        "text": "Co je potřeba?"
      },
      {
        "type": "list",
        "items": [
          "**Rodinný dům nebo byt:** adresa, případně číslo listu vlastnictví (LV) a katastrální území.",
          "**Pozemky:** číslo LV a příslušné katastrální území.",
          "**Ostatní stavby:** parcelní číslo a katastrální území.",
          "**Více nemovitostí:** čísla jednotlivých LV a příslušná katastrální území.",
          "**Datum úmrtí** zůstavitele."
        ]
      },
      {
        "type": "paragraph",
        "text": "U rodinných domů, bytů a dalších staveb zasílám stručný formulář pro zjištění technického stavu a požádám o vybrané fotografie."
      },
      {
        "type": "paragraph",
        "text": "Další potřebné informace si případně dohledám nebo je společně doplníme."
      }
    ],
    "cardDescription": "Jaké údaje a dokumenty jsou pro ocenění důležité."
  },
  {
    "slug": "odhad-nebo-znalecky-posudek-dedictvi",
    "title": "Je pro dědické řízení nutný znalecký posudek?",
    "seoTitle": "Odhad, nebo znalecký posudek pro dědictví?",
    "description": "Stačí notáři běžný odhad nemovitosti, nebo je nutný znalecký posudek? Vysvětlení rozdílu a doporučený postup.",
    "intro": "**Pro běžné dědické řízení zpravidla není nutné nechávat zpracovat znalecký posudek.** K doložení obvyklé ceny nemovitosti může postačovat písemný odhad od odhadce nemovitostí.",
    "category": "inheritance",
    "blocks": [
      {
        "type": "heading",
        "text": "Jaký je rozdíl?"
      },
      {
        "type": "paragraph",
        "text": "Znalecký posudek je dokument zpracovaný znalcem podle zákonných pravidel pro znaleckou činnost. Jeho vypracování může být požadováno například ve složitějších nebo sporných případech."
      },
      {
        "type": "paragraph",
        "text": "Písemný odhad od odhadce nemovitostí je odborným oceněním, které může sloužit jako podklad pro stanovení obvyklé ceny v dědickém řízení."
      },
      {
        "type": "heading",
        "text": "Jak odhad zpracovávám?"
      },
      {
        "type": "paragraph",
        "text": "Při ocenění vycházím ze skutečně realizovaných prodejů srovnatelných nemovitostí a zohledňuji rozdíly, které mají vliv na jejich hodnotu."
      },
      {
        "type": "paragraph",
        "text": "Odhad pro dědické řízení má oproti klasickému ocenění stručnější strukturu, **samotný výpočet hodnoty však obvykle zůstává stejný**."
      },
      {
        "type": "paragraph",
        "text": "Nejde tedy pouze o orientační částku, ale o písemný odhad s doloženým výpočtem a zdůvodněním výsledné hodnoty."
      }
    ],
    "cardDescription": "Rozdíl mezi odhadem od odhadce a znaleckým posudkem."
  },
  {
    "slug": "odhad-pozemku-pro-dedicke-rizeni",
    "title": "Odhad pozemků pro dědické řízení",
    "seoTitle": "Odhad pozemků pro dědické řízení | Ing. Aleš Vachuška",
    "description": "Ocenění polí, luk, zahrad, stavebních pozemků a spoluvlastnických podílů pro notáře.",
    "intro": "Součástí dědictví mohou být také pozemky, například orná půda, louky, zahrady, stavební nebo lesní pozemky. Často se jedná o větší počet parcel, případně pouze o spoluvlastnické podíly.",
    "category": "inheritance",
    "blocks": [
      {
        "type": "heading",
        "text": "Jak se stanovuje cena pozemků?"
      },
      {
        "type": "paragraph",
        "text": "Při ocenění vycházím ze skutečně realizovaných prodejů srovnatelných pozemků. Zohledňuji především jejich polohu, výměru, přístup a možnosti využití."
      },
      {
        "type": "paragraph",
        "text": "Důležitý je také územní plán. Pozemek evidovaný v katastru jako orná půda může být například určen k budoucí výstavbě, což má na jeho hodnotu zásadní vliv."
      },
      {
        "type": "heading",
        "text": "Co když je pozemků více?"
      },
      {
        "type": "paragraph",
        "text": "V rámci jednoho odhadu lze ocenit i větší soubor pozemků vedených na několika listech vlastnictví, včetně spoluvlastnických podílů."
      },
      {
        "type": "paragraph",
        "text": "Pro začátek mi stačí **čísla listů vlastnictví (LV) a příslušná katastrální území**. Z těchto údajů si dohledám jednotlivé parcely a jejich základní informace."
      },
      {
        "type": "paragraph",
        "text": "Ocenění pro dědické řízení se zpracovává ke dni úmrtí zůstavitele."
      }
    ],
    "cardDescription": "Ocenění polí, zahrad, stavebních pozemků i podílů."
  },
  {
    "slug": "cena-nemovitosti-ke-dni-umrti",
    "title": "Jak se stanovuje cena nemovitosti ke dni úmrtí?",
    "seoTitle": "Cena nemovitosti ke dni úmrtí pro dědické řízení",
    "description": "Proč se nemovitost při dědictví oceňuje ke dni úmrtí a jak se zohledňují skutečné prodeje a vývoj cen?",
    "intro": "Při dědickém řízení se nemovitosti oceňují ke dni úmrtí zůstavitele. Toto datum je rozhodující pro stanovení jejich obvyklé ceny, bez ohledu na to, kdy se samotný odhad zpracovává.",
    "category": "inheritance",
    "blocks": [
      {
        "type": "heading",
        "text": "Jak ocenění probíhá?"
      },
      {
        "type": "paragraph",
        "text": "Při stanovení obvyklé ceny vycházím ze skutečně realizovaných prodejů srovnatelných nemovitostí. Zohledňuji jejich polohu, velikost, technický stav a další vlastnosti, které mají vliv na výslednou hodnotu."
      },
      {
        "type": "paragraph",
        "text": "Pokud je odhad zpracováván s větším časovým odstupem od úmrtí, zohledňuji také vývoj cen nemovitostí v daném období."
      },
      {
        "type": "heading",
        "text": "Co potřebuji k odhadu?"
      },
      {
        "type": "paragraph",
        "text": "Pro začátek mi stačí základní identifikace nemovitosti a datum úmrtí zůstavitele."
      },
      {
        "type": "paragraph",
        "text": "U rodinných domů, bytů a dalších staveb si případně vyžádám informace o jejich technickém stavu a vybrané fotografie. Další potřebné údaje si upřesníme podle konkrétní nemovitosti."
      }
    ],
    "cardDescription": "Proč se hodnota stanovuje k rozhodnému datu."
  },
  {
    "slug": "odhad-nemovitosti-pri-rozvodu",
    "title": "Odhad nemovitosti při rozvodu a vypořádání společného jmění",
    "seoTitle": "Odhad nemovitosti při rozvodu a vypořádání SJM",
    "description": "Potřebujete ocenit dům nebo byt při rozvodu? Odhad jako podklad pro vypořádání společného jmění manželů.",
    "intro": "Pokud je součástí společného jmění (SJ, dříve v katastru označovaného jako SJM) rodinný dům, byt, pozemky nebo jiné nemovitosti, je při rozvodu důležité stanovit jejich hodnotu.\n\nPísemný odhad může sloužit jako podklad pro dohodu o rozdělení majetku, vyplacení jednoho z manželů nebo další jednání o majetkovém vypořádání.",
    "category": "settlement",
    "blocks": [
      {
        "type": "heading",
        "text": "Jak stanovuji hodnotu nemovitosti?"
      },
      {
        "type": "paragraph",
        "text": "Při ocenění vycházím především ze skutečně realizovaných prodejů srovnatelných nemovitostí, nikoliv pouze z nabídkových cen v realitních inzerátech."
      },
      {
        "type": "paragraph",
        "text": "U rodinných domů a bytů posuzuji zejména jejich polohu, velikost, dispozici, technický stav a případné rekonstrukce."
      },
      {
        "type": "paragraph",
        "text": "U pozemků je důležitá především lokalita, výměra, přístup a možnosti využití podle územního plánu."
      },
      {
        "type": "paragraph",
        "text": "Výsledkem je písemný odhad s výpočtem a zdůvodněním stanovené hodnoty."
      },
      {
        "type": "heading",
        "text": "Jak může odhad pomoci při vypořádání majetku?"
      },
      {
        "type": "paragraph",
        "text": "Pokud si například jeden z manželů ponechá rodinný dům a druhý má být finančně vyrovnán, je důležité znát hodnotu nemovitosti, ze které se při vzájemné dohodě vychází."
      },
      {
        "type": "paragraph",
        "text": "Ocenění lze zpracovat také pro více nemovitostí současně, například rodinný dům, rekreační objekt a samostatné pozemky."
      },
      {
        "type": "paragraph",
        "text": "Samotný odhad neurčuje způsob rozdělení majetku. Poskytuje však odborně podloženou hodnotu pro další jednání a případnou dohodu."
      },
      {
        "type": "heading",
        "text": "Co potřebuji k vypracování odhadu?"
      },
      {
        "type": "paragraph",
        "text": "Pro začátek stačí základní identifikace nemovitostí:"
      },
      {
        "type": "list",
        "items": [
          "**Rodinný dům nebo byt:** adresa, případně číslo listu vlastnictví (LV) a katastrální území.",
          "**Pozemky:** číslo LV a příslušné katastrální území.",
          "**Více nemovitostí:** čísla jednotlivých LV a příslušná katastrální území."
        ]
      },
      {
        "type": "paragraph",
        "text": "Důležité je také upřesnit, zda odhad potřebujete pro vzájemnou dohodu, finanční vyrovnání nebo probíhající soudní řízení. Podle účelu společně stanovíme vhodný rozsah ocenění a rozhodné datum."
      },
      {
        "type": "paragraph",
        "text": "U rodinných domů, bytů a dalších staveb doporučuji osobní prohlídku, která umožňuje lépe posoudit jejich skutečný technický stav."
      },
      {
        "type": "paragraph",
        "text": "Konkrétní cenu odhadu si vždy odsouhlasíme před zahájením zpracování."
      }
    ],
    "cardDescription": "Ocenění jako podklad pro majetkové vypořádání."
  },
  {
    "slug": "vyplaceni-spoluvlastnickeho-podilu",
    "title": "Vyplacení spoluvlastnického podílu na nemovitosti",
    "seoTitle": "Vyplacení spoluvlastnického podílu na nemovitosti",
    "description": "Jak určit hodnotu nemovitosti při vyplacení spoluvlastníka? Odhad domu, bytu nebo pozemku pro majetkové vyrovnání.",
    "intro": "Pokud nemovitost vlastní více osob a jeden ze spoluvlastníků chce ostatní vyplatit, je důležité nejprve stanovit její hodnotu.\n\nTypicky se jedná o rodinný dům, byt, rekreační nemovitost nebo pozemky ve spoluvlastnictví sourozenců či dalších příbuzných.",
    "category": "settlement",
    "blocks": [
      {
        "type": "heading",
        "text": "Jak se stanovuje částka k vyplacení?"
      },
      {
        "type": "paragraph",
        "text": "Při vypořádání mezi spoluvlastníky se obvykle vychází z hodnoty celé nemovitosti a velikosti jednotlivých spoluvlastnických podílů."
      },
      {
        "type": "paragraph",
        "text": "Pokud má například rodinný dům hodnotu 4 000 000 Kč a vlastní jej dva sourozenci, každý s podílem jedné poloviny, odpovídá hodnota každého podílu částce 2 000 000 Kč."
      },
      {
        "type": "paragraph",
        "text": "Jiná situace nastává při samostatném prodeji spoluvlastnického podílu třetí osobě. Jeho tržní hodnota může být nižší než odpovídající část hodnoty celé nemovitosti, protože kupující nezískává nemovitost do výlučného vlastnictví."
      },
      {
        "type": "paragraph",
        "text": "Proto je důležité předem upřesnit, k jakému účelu odhad potřebujete."
      },
      {
        "type": "heading",
        "text": "Jak nemovitost oceňuji?"
      },
      {
        "type": "paragraph",
        "text": "Při stanovení hodnoty vycházím ze skutečně realizovaných prodejů srovnatelných nemovitostí."
      },
      {
        "type": "paragraph",
        "text": "U rodinných domů, bytů a rekreačních objektů posuzuji jejich polohu, velikost, technický stav a další vlastnosti ovlivňující cenu."
      },
      {
        "type": "paragraph",
        "text": "U pozemků zohledňuji zejména lokalitu, výměru, přístup a možnosti využití."
      },
      {
        "type": "paragraph",
        "text": "Výsledkem je písemný odhad s výpočtem a zdůvodněním stanovené hodnoty."
      },
      {
        "type": "heading",
        "text": "Co potřebuji k vypracování odhadu?"
      },
      {
        "type": "paragraph",
        "text": "Pro začátek stačí základní identifikace nemovitosti:"
      },
      {
        "type": "list",
        "items": [
          "**Rodinný dům nebo byt:** adresa, případně číslo listu vlastnictví (LV) a katastrální území.",
          "**Pozemky:** číslo LV a příslušné katastrální území.",
          "**Více nemovitostí:** čísla jednotlivých LV a příslušná katastrální území."
        ]
      },
      {
        "type": "paragraph",
        "text": "Dále je vhodné uvést, zda se jedná o vyplacení mezi spoluvlastníky, nebo ocenění podílu pro samostatný prodej."
      },
      {
        "type": "paragraph",
        "text": "Konkrétní rozsah a cenu odhadu si vždy odsouhlasíme před zahájením zpracování."
      }
    ],
    "cardDescription": "Jak ocenit nemovitost a určit hodnotu podílu."
  },
  {
    "slug": "rozdeleni-nemovitosti-mezi-spoluvlastniky",
    "title": "Rozdělení nemovitostí mezi spoluvlastníky",
    "seoTitle": "Rozdělení nemovitostí mezi spoluvlastníky",
    "description": "Potřebujete rozdělit domy, byty nebo pozemky mezi spoluvlastníky? Odhad pomůže stanovit jejich hodnotu pro dohodu.",
    "intro": "Při vypořádání společného majetku se často řeší více nemovitostí současně, například rodinný dům, byt, rekreační objekt nebo několik pozemků.\n\nPísemný odhad umožňuje stanovit hodnotu jednotlivých nemovitostí a poskytuje podklad pro jejich rozdělení mezi spoluvlastníky.",
    "category": "settlement",
    "blocks": [
      {
        "type": "heading",
        "text": "Jak může odhad pomoci?"
      },
      {
        "type": "paragraph",
        "text": "Každou nemovitost oceňuji samostatně podle jejího charakteru a na základě skutečně realizovaných prodejů srovnatelných nemovitostí."
      },
      {
        "type": "paragraph",
        "text": "Výsledkem je přehled hodnot jednotlivých nemovitostí i jejich celková hodnota."
      },
      {
        "type": "paragraph",
        "text": "Odhad lze využít například při dohodě, kdy jeden spoluvlastník převezme rodinný dům a druhý pozemky nebo jinou nemovitost. Pokud se hodnoty převáděného majetku liší, může být součástí dohody také finanční vyrovnání."
      },
      {
        "type": "heading",
        "text": "Co potřebuji k ocenění?"
      },
      {
        "type": "paragraph",
        "text": "Pro začátek stačí adresy nemovitostí, případně **čísla listů vlastnictví (LV) a příslušná katastrální území**."
      },
      {
        "type": "paragraph",
        "text": "Dále si upřesníme, které nemovitosti se mají ocenit a zda odhad slouží pro vzájemnou dohodu nebo jiný účel."
      }
    ],
    "cardDescription": "Jak stanovit hodnotu více nemovitostí pro vzájemnou dohodu."
  },
  {
    "slug": "za-kolik-prodat-nemovitost",
    "title": "Za kolik prodat nemovitost?",
    "seoTitle": "Za kolik prodat nemovitost? | Odhad tržní ceny",
    "description": "Chcete prodat dům, byt nebo pozemek? Zjistěte, proč nestačí porovnat realitní inzeráty a jak určit tržní cenu.",
    "intro": "Pokud plánujete prodej rodinného domu, bytu nebo pozemku, jednou z prvních otázek bývá, za jakou cenu nemovitost nabídnout.",
    "category": "sale",
    "blocks": [
      {
        "type": "heading",
        "text": "Jak zjistit skutečnou hodnotu nemovitosti?"
      },
      {
        "type": "paragraph",
        "text": "Při stanovení ceny se často vychází z podobných nemovitostí nabízených na realitních portálech. Ty však ukazují především požadované ceny prodávajících, nikoliv částky, za které se nemovitosti skutečně prodaly."
      },
      {
        "type": "paragraph",
        "text": "Při ocenění proto vycházím ze skutečně realizovaných prodejů srovnatelných nemovitostí."
      },
      {
        "type": "paragraph",
        "text": "U rodinných domů a bytů zohledňuji zejména jejich polohu, velikost, technický stav a vybavení. U pozemků pak především lokalitu, výměru, přístup a možnosti využití."
      },
      {
        "type": "heading",
        "text": "K čemu odhad využít?"
      },
      {
        "type": "paragraph",
        "text": "Výsledkem je písemný odhad s výpočtem a zdůvodněním stanovené hodnoty."
      },
      {
        "type": "paragraph",
        "text": "Odhad může sloužit jako podklad pro nastavení nabídkové ceny a pomoci předejít situaci, kdy je nemovitost nabízena za nepřiměřeně vysokou nebo naopak zbytečně nízkou cenu."
      },
      {
        "type": "paragraph",
        "text": "Konečná prodejní cena se může lišit podle aktuální poptávky, způsobu prodeje a výsledného jednání se zájemci."
      }
    ],
    "cardDescription": "Proč při stanovení ceny nestačí realitní inzeráty."
  },
  {
    "slug": "odhad-ceny-nemovitosti-pred-koupi",
    "title": "Kupujete nemovitost? Jak poznat, zda není cena příliš vysoká?",
    "seoTitle": "Odhad ceny nemovitosti před koupí",
    "description": "Kupujete dům, byt nebo pozemek? Nezávislý odhad Vám pomůže posoudit, zda nabídková cena odpovídá trhu.",
    "intro": "Při koupi rodinného domu, bytu nebo pozemku nemusí být jednoduché posoudit, zda požadovaná cena odpovídá jeho skutečné hodnotě.",
    "category": "sale",
    "blocks": [
      {
        "type": "heading",
        "text": "Jak zjistit, zda je cena přiměřená?"
      },
      {
        "type": "paragraph",
        "text": "Realitní inzeráty mohou posloužit pro základní orientaci. Rozdíly mezi nabídkovými a skutečně realizovanými cenami však mohou dosahovat 10 %, v některých případech i 20 % nebo více."
      },
      {
        "type": "paragraph",
        "text": "Při ocenění proto vycházím především ze skutečně realizovaných prodejů srovnatelných nemovitostí. Ty poskytují spolehlivější podklad pro stanovení hodnoty než samotné nabídkové ceny."
      },
      {
        "type": "paragraph",
        "text": "U rodinných domů a bytů zohledňuji především polohu, velikost, dispozici, technický stav a vybavení. U pozemků pak lokalitu, výměru, přístup a možnosti využití."
      },
      {
        "type": "heading",
        "text": "K čemu odhad využít?"
      },
      {
        "type": "paragraph",
        "text": "Výsledkem je písemný odhad, který umožňuje porovnat požadovanou kupní cenu s odborně stanovenou hodnotou nemovitosti."
      },
      {
        "type": "paragraph",
        "text": "Pokud se tyto částky výrazně liší, může odhad posloužit také jako podklad pro jednání s prodávajícím o ceně."
      }
    ],
    "cardDescription": "Porovnání požadované ceny se skutečnými prodeji."
  },
  {
    "slug": "jak-zjistit-hodnotu-nemovitosti",
    "title": "Jak zjistit současnou hodnotu své nemovitosti?",
    "seoTitle": "Jak zjistit skutečnou hodnotu nemovitosti?",
    "description": "Zajímá Vás aktuální hodnota domu, bytu nebo pozemku? Odhad na základě skutečně realizovaných prodejů.",
    "intro": "Nemovitost nemusíte hned prodávat, abyste potřebovali znát její hodnotu. Odhad může posloužit například při rozdělování majetku mezi děti nebo další členy rodiny ještě za vašeho života, při rodinných dohodách, rozhodování o investicích nebo jednoduše pro vlastní přehled.",
    "category": "personal",
    "blocks": [
      {
        "type": "heading",
        "text": "Online kalkulačka, nebo individuální odhad?"
      },
      {
        "type": "paragraph",
        "text": "Online kalkulačky obvykle pracují s omezeným množstvím údajů o nemovitosti. Zpravidla zohledňují její polohu, výměru, typ a několik dalších základních informací. Skutečný technický stav, provedené rekonstrukce, vybavení nebo další specifické vlastnosti však nemusí dokázat dostatečně posoudit."
      },
      {
        "type": "paragraph",
        "text": "Výsledkem proto často bývá poměrně široké cenové rozpětí, které poskytuje pouze orientační představu o hodnotě nemovitosti."
      },
      {
        "type": "paragraph",
        "text": "Některé online kalkulačky navíc slouží především jako rychlé předběžné nacenění, na které následně navazuje nabídka zprostředkování prodeje."
      },
      {
        "type": "heading",
        "text": "V čem je rozdíl při individuálním ocenění?"
      },
      {
        "type": "paragraph",
        "text": "Při zpracování odhadu vycházím ze skutečně realizovaných prodejů srovnatelných nemovitostí, nikoliv pouze z cen uvedených v realitních inzerátech."
      },
      {
        "type": "paragraph",
        "text": "U rodinných domů, bytů, chat a chalup umožňuje osobní prohlídka podrobněji posoudit skutečný technický stav, kvalitu provedení, vybavení a případné rekonstrukce. Díky tomu lze jednotlivé rozdíly mezi oceňovanou nemovitostí a srovnatelnými prodeji přesněji vyhodnotit."
      },
      {
        "type": "paragraph",
        "text": "U pozemků zohledňuji především jejich polohu, výměru, přístup a možnosti využití podle územně plánovací dokumentace."
      },
      {
        "type": "paragraph",
        "text": "Výsledkem je **písemný odhad s konkrétní stanovenou hodnotou, přehledným výpočtem a zdůvodněním**, nikoliv pouze automaticky vytvořené cenové rozpětí."
      }
    ],
    "cardDescription": "Kdy se hodí znát hodnotu vlastní nemovitosti."
  }
]
export const articlePath = (article: Article) => `/clanky/${article.slug}`
export const articleCategory = (article: Article) => articleCategories.find(c => c.id === article.category)!
export function relatedArticles(article: Article) {
 const others = articles.filter(a => a.slug !== article.slug)
 const order: Record<ArticleCategory, ArticleCategory[]> = {
  inheritance: ['inheritance', 'settlement', 'personal', 'sale'],
  settlement: ['settlement', 'personal', 'inheritance', 'sale'],
  sale: ['sale', 'personal', 'settlement', 'inheritance'],
  personal: ['personal', 'sale', 'settlement', 'inheritance'],
 }
 return order[article.category].flatMap(category => others.filter(a => a.category === category)).slice(0, 3)
}
