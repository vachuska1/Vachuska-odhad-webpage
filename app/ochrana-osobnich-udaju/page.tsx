import Link from 'next/link';

export default function OchranaOsobnichUdaju() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <Link 
          href="/odhady" 
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="mr-1"
          >
            <path d="M15 18l-6-6 6-6"/>
          </svg>
          Zpět na stránku
        </Link>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-foreground">Ochrana osobních údajů (GDPR)</h1>
      
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Správce osobních údajů</h2>
          <div className="space-y-2">
            <p className="mb-0">Ing. Aleš Vachuška</p>
            <p className="mb-0">Slatina 68</p>
            <p className="mb-0">341 01 Slatina</p>
            <p className="mb-0">IČ: 14437830</p>
            <p className="mb-0">E-mail: <a href="mailto:odhadyvachuska@gmail.com" className="text-blue-600 hover:underline">odhadyvachuska@gmail.com</a></p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Informace o zpracování osobních údajů</h2>
          <p className="mb-6">
            Tímto vás v souladu s Nařízením Evropského parlamentu a Rady (EU) 2016/679 (GDPR) informuji o způsobu a rozsahu zpracování vašich osobních údajů.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Jaké údaje zpracovávám</h2>
          <p className="mb-4">
            Zpracovávám pouze údaje nezbytné pro poskytování mých služeb:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Identifikační údaje</strong> – jméno, příjmení, titul</li>
            <li><strong>Kontaktní údaje</strong> – e-mail, telefon, adresa</li>
            <li><strong>Údaje související se službami</strong> – informace nutné pro uzavření a plnění smlouvy</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Účely zpracování</h2>
          <p className="mb-4">
            Vaše osobní údaje zpracovávám pouze za následujícími účely:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Uzavření a plnění smluvních vztahů</li>
            <li>Komunikace ohledně objednávek a poskytovaných služeb</li>
            <li>Plnění právních povinností (např. daňové a účetní)</li>
            <li>Ochrana oprávněných zájmů správce (např. v případě vymáhání pohledávek)</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Právní základ zpracování</h2>
          <p className="mb-4">
            Zpracování probíhá na základě:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>plnění smlouvy dle čl. 6 odst. 1 písm. b) GDPR</li>
            <li>plnění právní povinnosti dle čl. 6 odst. 1 písm. c) GDPR</li>
            <li>oprávněného zájmu správce dle čl. 6 odst. 1 písm. f) GDPR</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Doba uchování údajů</h2>
          <p className="mb-4">
            Vaše osobní údaje uchovávám pouze po dobu nezbytně nutnou:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>po dobu trvání smluvního vztahu</li>
            <li>následně po dobu stanovenou právními předpisy (např. zákon o účetnictví, daňové zákony)</li>
            <li>nebo po dobu trvání oprávněného zájmu (např. vymáhání pohledávek)</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Vaše práva podle GDPR</h2>
          <p className="mb-4">
            Máte právo:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>požádat o přístup ke svým osobním údajům</li>
            <li>požadovat jejich opravu nebo výmaz (pokud k tomu existuje zákonný důvod)</li>
            <li>požadovat omezení zpracování</li>
            <li>uplatnit právo na přenositelnost údajů</li>
            <li>vznést námitku proti zpracování</li>
            <li>podat stížnost u Úřadu pro ochranu osobních údajů (<a href="https://www.uoou.cz" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.uoou.cz</a>), pokud se domníváte, že je s vašimi údaji nakládáno v rozporu s GDPR</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Kontakt pro uplatnění práv</h2>
          <p className="mb-4">
            Veškeré žádosti a dotazy ohledně ochrany osobních údajů můžete zasílat na:<br />
            <span className="text-lg">📧 <a href="mailto:odhadyvachuska@gmail.com" className="text-blue-600 hover:underline">odhadyvachuska@gmail.com</a></span>
          </p>
        </section>

        <p className="text-sm text-muted-foreground mt-12 border-t pt-4">
          Poslední aktualizace: 5. 8. 2025
        </p>
      </div>
    </main>
  );
}
