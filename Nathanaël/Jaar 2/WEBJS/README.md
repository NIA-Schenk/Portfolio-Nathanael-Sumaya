# Future Color - JavaScript simulatie applicatie (Assessment)
Welkom bij mijn duo-assessmentproject "Future Color", een complexe simulatie-applicatie ontwikkeld zonder externe frameworks of libraries — volledig in vanilla JavaScript. Deze opdracht demonstreert mijn kennis van OOP, DOM-manipulatie, drag & drop interacties, animaties, en API-integratie binnen een browsergebaseerde omgeving.

## Over de applicatie
Future Color is een simulatie waarin je verschillende verfingrediënten kunt creëren, mengen, en visueel testen. De simulatie weerspiegelt het interne proces van een duurzaam verfbedrijf dat probeert met minimale chemicaliën verf te produceren. De focus ligt op intuïtieve bediening, realistische menglogica en dynamische visualisatie — inclusief weersinvloeden.

### Functionaliteiten:
- Dynamisch aanmaken van ingrediënten met eigenschappen:
  - Minimale mengtijd (ms)
  - Mengsnelheid
  - Kleur in RGB of HSL
  - Structuur (korrel, glad, slijmerig, etc.)
- Dynamisch toevoegen van lege potten
- Drag & drop ingrediënten naar potten (alleen combineerbaar bij gelijke mengsnelheid)
- Meerdere mengmachines met variabele snelheid/tijd
- Drag & drop potten in machines
- Automatische verwerking van potten na langste mengtijd
- Visuele animatie van het mengproces
- Meerdere menghallen (2), los navigeerbaar zonder reload
- Ingrediënten zijn overal zichtbaar, hallen zijn instelbaar per machine

## Weersimulatie via API
Mengtijd wordt dynamisch beïnvloed door het weer in de gekozen stad:
- Regen/Sneeuw: +10% mengtijd
- >35°C: max. 1 machine actief
- <10°C: +15% mengtijd

Locatie is eenvoudig instelbaar, de simulatie past zich automatisch aan.

## Kleuren testen
Een extra kleurentestmodule is inbegrepen:
- Zelf gegenereerd grid (bijv. 6x6)
- Invullen van vierkanten met gemengde verf
- Klik op een kleur toont triadisch kleuradvies in popup
- Advieskleuren worden weergegeven in RGB/HSL + visuele weergave

## Gebruikte technieken
- Alles geschreven in vanilla JavaScript (geen frameworks of packages)
- Modulaire opbouw met OOP in JS
- Dynamische DOM-manipulatie
- Drag & Drop API
- Local storage (optioneel)
- Fetch/async integratie voor actuele weerdata
- Canvas of CSS-gebaseerde animaties