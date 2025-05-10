import java.util.ArrayList;
import java.util.Scanner;

public class Game {
	
	private int playerFieldLength; 
	private String chosenSquareName; 
	private int difficultyPercentage;
	private ArrayList<Square> squares = new ArrayList<>();
    public boolean gameOver = false;
    private ArrayList<Square> markedSquares = new ArrayList<>();

    public MineField mineField;
    public MineSweeper mineSweeper;
 	
	public Game(int playerFieldLength, int difficultyPercentage, ArrayList<Square> squares, String chosenSquareName) {	
		this.playerFieldLength = playerFieldLength;
		this.chosenSquareName = chosenSquareName;
		this.difficultyPercentage = difficultyPercentage;
		this.squares = squares;
	}

	public int getPlayerFieldLength() {
		return playerFieldLength; 
	}
	
	public String getChosenSquareName() {
		return chosenSquareName;
	}
	
	public int getDifficultyPercentage() {
		return difficultyPercentage; 
	}
	
	Scanner sc = new Scanner(System.in);
	
	public void Play() {
	    boolean gameOver = false;
	    boolean gameWon = false;
	    boolean isFirstMove = true; 
	    Square firstMoveSquare = null;

	    while (!gameOver && !gameWon) {
	        MineField mineField = new MineField(difficultyPercentage);
	        mineField.MakePlayerField(playerFieldLength, squares, markedSquares);

	        System.out.println("Kies een veld om te testen (bijv. A1) of markeer/demarkeer een veld (bijv. *A1)");
	        System.out.println("Of typ 'stop' om het spel te stoppen: ");
	        chosenSquareName = sc.next();

	        if (chosenSquareName.equalsIgnoreCase("stop")) {
	            System.out.println("Het spel is gestopt. Bedankt voor het spelen!");
	            break;
	        }

	        Square selectedSquare = null;
	        
	        if (chosenSquareName.startsWith("*")) {
	            String markedSquareName = chosenSquareName.substring(1);

	            boolean found = false;
	            for (Square square : squares) {
	                if (square.getName().equalsIgnoreCase(markedSquareName)) {
	                    found = true;
	                    if (markedSquares.contains(square)) {
	                        markedSquares.remove(square);
	                    } else {
	                        markedSquares.add(square);
	                    }
	                    break;
	                }
	            }

	            if (!found) {
	                System.out.println("Ongeldig vakje. Probeer opnieuw.");
	            }
	        } else {
	            for (Square square : squares) {
	                if (square.getName().equalsIgnoreCase(chosenSquareName)) {
	                    selectedSquare = square;
	                    break;
	                }
	            }

	            if (selectedSquare == null) {
	                System.out.println("Ongeldige keuze. Probeer opnieuw.");
	                continue;
	            }

	            if (markedSquares.contains(selectedSquare)) {
	                continue;
	            }

	            if (isFirstMove) {
	                firstMoveSquare = selectedSquare;
	                mineField.MakeMines(squares, difficultyPercentage, firstMoveSquare);
	                isFirstMove = false;
	            }

	            if (selectedSquare.getHasMine()) {
	                System.out.println("BOEM! Je hebt een bom geraakt. GAME OVER");
	                gameOver = true;
	            } else {
	                revealSafeSquare(selectedSquare);
	            }
	        }

	        gameWon = checkIfGameWon();

	        if (gameWon) {
	            System.out.println("Gefeliciteerd! Je hebt alle bommen gemarkeerd en gewonnen!");
	        }
	    }

	    if (gameOver) {
	        System.out.println("Helaas, je hebt verloren. Probeer het opnieuw!");
	    }
	}

	private boolean checkIfGameWon() {
	    int bombCount = 0;
	    int markedBombCount = 0;

	    for (Square square : squares) {
	        if (square.getHasMine()) {
	            bombCount++;
	            if (markedSquares.contains(square)) {
	                markedBombCount++;
	            }
	        }
	    }
	    return bombCount == markedBombCount && markedBombCount == markedSquares.size();
	}
	
	public void revealSafeSquare(Square square) {
	    if (square.getIsRevealed() || square.getHasMine()) {
	        return;
	    }
	    
	    square.setIsRevealed(true);

	    int surroundingBombs = square.countSurroundingBombs(playerFieldLength, square, squares);

	    if (surroundingBombs == 0) {
	        for (String neighborName : square.getAdjacentSquares(square.getName(), playerFieldLength)) {
	        	mineSweeper = new MineSweeper();
	            Square neighbor = mineSweeper.findSquareByName(squares, neighborName);
	            if (neighbor != null && !neighbor.getIsRevealed() && !neighbor.getHasMine()) {
	                revealSafeSquare(neighbor);
	            }
	        }
	    }
	}
}

