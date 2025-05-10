# SpeedQZ - Assessment Programmeren 4
Dit project is ontwikkeld als eindopdracht voor het vak Programmeren 4 (PROG4). Het is een snel-reactie quizspel waarin spelers 10 visuele opgaven zo snel mogelijk moeten oplossen. Het toont mijn ervaring met JavaFX, MVC-architectuur en het verwerken van input en media.

## Over het spel
Bij elke opgave krijgt de speler 4 afbeeldingen met een instructie zoals "van langzaam naar snel". De speler geeft de volgorde op met toetsen A–D. Voor elke goede reactie blijven de overgebleven seconden als punten staan, bij een fout worden ze afgetrokken.

### Spelelementen:
- 10 willekeurige opgaven uit een catalogus
- Invoer via A–D, [Backspace] en [Enter]
- Score op basis van snelheid en correctheid
- Automatisch doorgaan naar de volgende opgave
- Catalogus-ondersteuning via externe tekstbestanden

## Technische specificaties
- MVC-architectuur
- Gebruik van JavaFX voor alle GUI-functionaliteit
- Bestandsinvoer via Resource-map
- Timer geïmplementeerd via JavaFX Tasks
- Foutafhandeling bij incorrecte catalogus via custom Exception

## Bonusopties
- Splashscreens en score-overlay
- Meerdere categorieën combineren
- Grafische klok met kleurverloop (groen → rood)