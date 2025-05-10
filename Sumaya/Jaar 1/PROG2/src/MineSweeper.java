import java.util.ArrayList;
import java.util.Scanner;

public class MineSweeper {
	
	private int playerFieldLength; 
	private int difficultyPercentage;
	private String playAgain; 
	
    public MineSweeper(int playerFieldLength, int difficultyPercentage, String playAgain) {	
		this.playerFieldLength = playerFieldLength;
		this.difficultyPercentage = difficultyPercentage;
		this.playAgain = playAgain;
	}
	
	public MineSweeper() {
		
	}

	public int getPlayerFieldLength() {
		return playerFieldLength; 
	}
	
	public int getDifficultyPercentage() {
		return difficultyPercentage; 
	}
	
	public String getPlayAgain() {
		return playAgain;
	}
	
	Scanner sc = new Scanner(System.in);
	
	public void Start() {
		
		PrintWelcome();
		
		System.out.println("Geef de grootte van het veld (5-20): ");			
		playerFieldLength = sc.nextInt();	
		
		CheckPlayerFieldLength(playerFieldLength);	
		
		MineField mineField = new MineField(0);
		ArrayList<Square> squares = MineField.CreateSquares(playerFieldLength);
		
		System.out.println("Dit is het speelveld: ");	
		mineField.MakePlayerField(playerFieldLength, squares, squares);
		
		System.out.println("Geef de kans aan dat een veld een bom bevat als % (10-25): ");
		difficultyPercentage = sc.nextInt();
		
		CheckDifficultyPercentage(difficultyPercentage);
        
		Game game = new Game(playerFieldLength, difficultyPercentage, squares, null);
		game.Play(); 
		
        System.out.println("Wil je opnieuw spelen (Ja/Nee): ");
        playAgain = sc.next(); 
        CheckInput(playAgain);
        
		if(playAgain.equalsIgnoreCase("Ja")) {
		    game.Play();  
		} else {
		    System.out.println("Het spel is gestopt. Bedankt voor het spelen :)");
		    sc.close();  
		}	
	}
	
	private void PrintWelcome() {		
		System.out.println("Welkom bij het spelletje Mijnenveger!");
		System.out.println("Probeer alle mijnen te vinden in het mijnenveld");
		System.out.println("");		
	}
	
    public void CheckPlayerFieldLength(int playerfield) {   	
        while (playerfield < 5 || playerfield > 20) {
            System.out.println("*** De grootte moet tussen 5 en 20 liggen! ***");
    		System.out.println("Geef de grootte van het veld (5-20): ");
            playerfield = sc.nextInt(); 
        }
        
        System.out.println("Je hebt een geldig speelveld gekozen: " + playerfield + "x" + playerfield);
        playerFieldLength = playerfield; 
    }
    
    public void CheckDifficultyPercentage(int difficulty) {    	
        while (difficulty < 10 || difficulty > 25) {
            System.out.println("*** De kant moet tussen de 10 en 25 liggen! ***");
            System.out.println("Geef de kans aan dat een veld een bom bevat als % (10-25): ");
            difficulty = sc.nextInt(); 
        }        
        System.out.println("Je hebt een geldig kans gekozen: " + difficulty);
        difficultyPercentage = difficulty;    	
    }
    
    public Square findSquareByName(ArrayList<Square> squares, String name) {
        for (Square square : squares) {
            if (square.getName().equalsIgnoreCase(name)) {
                return square;
            }
        }
        return null;
    }
    
    private void CheckInput(String playGameAgain) {    
        while (!playGameAgain.equalsIgnoreCase("Ja") && !playGameAgain.equalsIgnoreCase("Nee")) {
            System.out.println("*** Onjuiste invoer. Voer 'Ja' of 'Nee' in ***");
            System.out.println("Probeer opnieuw: ");
            playGameAgain = sc.next(); 
        }
        System.out.println("Je hebt een geldige keuze gemaakt: " + playGameAgain);
        playAgain = playGameAgain; 
    }
}