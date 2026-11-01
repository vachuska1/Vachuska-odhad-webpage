// Czech paths are stable identifiers; foreign paths are shared by routing and language switching.
export const articleRoutes: Record<string, [string, string]> = {
 '/clanky': ['articles', 'artikel'],
 '/clanky/odhad-nemovitosti-pro-dedicke-rizeni': ['articles/property-valuation-inheritance', 'artikel/immobilienbewertung-nachlass'],
 '/clanky/kolik-stoji-odhad-pro-dedicke-rizeni': ['articles/inheritance-valuation-cost', 'artikel/kosten-nachlassbewertung'],
 '/clanky/odhad-pro-dedictvi-bez-prohlidky': ['articles/inheritance-valuation-without-inspection', 'artikel/nachlassbewertung-ohne-besichtigung'],
 '/clanky/podklady-pro-odhad-nemovitosti-dedictvi': ['articles/documents-inheritance-valuation', 'artikel/unterlagen-nachlassbewertung'],
 '/clanky/odhad-nebo-znalecky-posudek-dedictvi': ['articles/valuation-or-expert-report-inheritance', 'artikel/bewertung-oder-sachverstaendigengutachten-nachlass'],
 '/clanky/odhad-pozemku-pro-dedicke-rizeni': ['articles/land-valuation-inheritance', 'artikel/grundstuecksbewertung-nachlass'],
 '/clanky/cena-nemovitosti-ke-dni-umrti': ['articles/property-value-date-of-death', 'artikel/immobilienwert-todestag'],
 '/clanky/odhad-nemovitosti-pri-rozvodu': ['articles/property-valuation-divorce', 'artikel/immobilienbewertung-scheidung'],
 '/clanky/vyplaceni-spoluvlastnickeho-podilu': ['articles/buying-out-co-owner', 'artikel/auszahlung-miteigentumsanteil'],
 '/clanky/rozdeleni-nemovitosti-mezi-spoluvlastniky': ['articles/dividing-property-co-owners', 'artikel/immobilienaufteilung-miteigentuemer'],
 '/clanky/za-kolik-prodat-nemovitost': ['articles/property-selling-price', 'artikel/verkaufspreis-immobilie'],
 '/clanky/odhad-ceny-nemovitosti-pred-koupi': ['articles/property-valuation-before-buying', 'artikel/immobilienbewertung-vor-kauf'],
 '/clanky/jak-zjistit-hodnotu-nemovitosti': ['articles/current-property-value', 'artikel/aktueller-immobilienwert'],
}
