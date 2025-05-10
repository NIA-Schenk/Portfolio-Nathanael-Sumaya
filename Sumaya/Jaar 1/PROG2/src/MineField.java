import java.util.ArrayList;
import java.util.Random;

public class MineField {
	
	private int numberOfMines;
	public static final boolean CHEAT = true; 
	
	public MineField(int numberOfMines) {
		this.numberOfMines = numberOfMines;
	}
	
	public int getNumberOfMines() {	
		return numberOfMines; 
	}
	
	public static ArrayList<Square> CreateSquares(int playerfield) {
	    ArrayList<Square> squares = new ArrayList<>();
	    char letter = 'A';

	    for (int i = 1; i <= playerfield; i++) {
	        for (int j = 1; j <= playerfield; j++) {
	            String squareName = letter + String.valueOf(i);
	            squares.add(new Square(squareName, false));
	            letter++;
	        }
	        letter = 'A';
	    }
	    return squares;
	}

	
	   public void MakePlayerField(int playerfield, ArrayList<Square> squares, ArrayList<Square> markedSquares) {
	        String[][] playerField = new String[playerfield][playerfield];
	        char startRow = 'A';

	        for (int row = 0; row < playerfield; row++) {
	            for (int col = 0; col < playerfield; col++) {
	                String name = (char) (startRow + col) + "" + (row + 1);
	                
	                MineSweeper mineSweeper = new MineSweeper();
	                Square square = mineSweeper.findSquareByName(squares, name);

	                if (!square.getIsRevealed()) {
	                    playerField[row][col] = "."; 
	                } 
	                else if (square.getHasMine()) {
	                    playerField[row][col] = "*"; 
	                } 
	                else {
	                    int bombCount = square.countSurroundingBombs(playerfield, square, squares);
	                    playerField[row][col] = String.valueOf(bombCount);  
	                }	                
	                if (markedSquares.contains(square)) {
	                    playerField[row][col] = "*";  
	                }
	            }
	        }
	        printPlayerField(playerField, playerfield);
	        
	        if(CHEAT) {
	        	cheatPrint(playerField, playerfield, squares);
	        }
	    }

	private void printPlayerField(String[][] playerField, int playerfield) {
	    for (int row = 0; row < playerfield; row++) {
	        System.out.print((row + 1) + " ");
	        for (int col = 0; col < playerfield; col++) {
	            System.out.print(playerField[row][col] + " ");
	        }
	        System.out.println();
	    }
	    System.out.print("  ");
	    for (int col = 0; col < playerfield; col++) {
	        System.out.print((char) ('A' + col) + " ");
	    }
	    System.out.println();
	}
	
	private void cheatPrint(String[][] playerField, int playerfield, ArrayList<Square> squares) {
		
	    System.out.println("Cheatmodus:");
	    for (int row = 0; row < playerfield; row++) {
	        System.out.print((row + 1) + " ");  
	        for (int col = 0; col < playerfield; col++) {
	            String name = (char) ('A' + col) + "" + (row + 1);  
	            MineSweeper mineSweeper = new MineSweeper();
	            Square square = mineSweeper.findSquareByName(squares, name);

	            if (square.getHasMine()) {
	                System.out.print("* ");  
	            } else {
	                System.out.print("~ "); 
	            }
	        }
	        System.out.println();
	    }

	    System.out.print("  ");
	    for (int col = 0; col < playerfield; col++) {
	        System.out.print((char) ('A' + col) + " ");  
	    }
	    System.out.println();
	}

	public void MakeMines(ArrayList<Square> squares, int difficultyPercentage, Square firstMoveSquare) {
	    int totalSquares = squares.size();
	    int totalMines = (totalSquares * difficultyPercentage) / 100;
	    int placedMines = 0;

	    while (placedMines < totalMines) {
	    	Random rand = new Random();
	    	int randomIndex = rand.nextInt(totalSquares); 
	        Square square = squares.get(randomIndex);

	        if (!square.getHasMine() && square != firstMoveSquare && !isNeighbor(firstMoveSquare, square)) {
	            square.setHasMine(true);
	            placedMines++;
	        }
	    }
	}
	
	private boolean isNeighbor(Square firstMoveSquare, Square square) {
	    ArrayList<String> neighbors = firstMoveSquare.getAdjacentSquares(firstMoveSquare.getName(), numberOfMines);
	    return neighbors.contains(square.getName());
	}
}

