# MineSweeper - Assessment Programmeren 2
Welkom bij mijn console-versie van het klassieke spelletje MineSweeper, ontwikkeld als assessmentopdracht voor het vak Programmeren 2 (PROG2). Dit project toont mijn vaardigheden in objectgeoriënteerd programmeren (OOP) en console-applicatieontwikkeling in Java.

## Over het spel
In deze versie van MineSweeper speel je op een dynamisch gegenereerd veld (grootte 5x5 t/m 20x20) waarin een willekeurig aantal bommen is verstopt. Je doel: ontdek alle veilige vakjes of markeer correct alle vakjes met een bom. Test je geluk en inzicht — maar pas op voor BOEM!

### Spelelementen:
- Instelbaar veldformaat en bomkans (%)
- Test vakjes op bommen (met cijferindicatie rondom)
- Markeer en demarkeer verdachte hokjes
- Verlies bij het raken van een bom
- Win als alle bommen correct gemarkeerd zijn
- Foutafhandeling bij ongeldige input
- Meerdere spelrondes mogelijk

## Technische specificaties
- Volledig objectgeoriënteerde structuur:
  - `Main` – startpunt en cheat-instelling
  - `MineSweeper` – spelcontroller en sessieloop
  - `Game` – representatie van een enkel spel
  - `MineField` – opslag en logica van het veld
  - `Square` – individuele vakjes met status
- Console-gebaseerde interactie

## Cheat mode
Voor test- en debugdoeleinden is er een ingebouwde cheat mode beschikbaar die alle bommen zichtbaar maakt in de console-output.