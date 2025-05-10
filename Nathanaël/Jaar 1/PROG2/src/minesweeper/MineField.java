package minesweeper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Random;

public class MineField {
    private HashMap<String, Square> squares;
    private int size;
    private int totalBombs;
    private int totalBombsToPlace;
    private int totalNonBombSquares;
    private int markedSquares;
    private int correctlyMarkedBombs;
    private boolean cheat;
    private int testedNonBombCount;
    private int totalSquares;

    public MineField(int size, boolean cheat) {
        this.size = size;
        this.squares = new HashMap<>();
        this.cheat = cheat;
        this.markedSquares = 0;
        this.correctlyMarkedBombs = 0;
        this.totalNonBombSquares = size * size;
        this.totalSquares = size * size;
        this.testedNonBombCount = 0;

        initializeField();
    }

    // Field Initialization
    private void initializeField() {
        for (char col = 'A'; col < 'A' + size; col++) {
            for (int row = 1; row <= size; row++) {
                String location = "" + col + row;
                squares.put(location, new Square(location));
            }
        }
    }

    // Bomb Handling
    public void placeBombs(int bombChance, String firstMoveLocation) {
        Random random = new Random();
        totalBombsToPlace = (int) Math.round(totalSquares * (bombChance / 100.0));
        totalBombsToPlace = Math.min(totalBombsToPlace, totalSquares - 1);
        totalBombs = 0;

        while (totalBombsToPlace > 0) {
            int row = random.nextInt(size);
            int col = random.nextInt(size);

            String location = "" + (char) (col + 'A') + (row + 1);
            if (!firstMoveLocation.equals(location)) {
                if (!squares.get(location).hasBomb()) {
	            	squares.get(location).setBomb(true);
	                totalBombs++;
	                totalBombsToPlace--;
                }
            }
        }
    }

    // Square Access and Modification
    public Square getSquare(String location) {
        return squares.get(location);
    }

    // Bomb Count and Scoring
    public int countAdjacentBombs(String location) {
        int count = 0;
        char col = location.charAt(0);
        int row = Integer.parseInt(location.substring(1));

        for (int dr = -1; dr <= 1; dr++) {
            for (int dc = -1; dc <= 1; dc++) {
                if (dr == 0 && dc == 0) continue;

                char newCol = (char) (col + dc);
                int newRow = row + dr;
                String newLoc = "" + newCol + newRow;

                Square square = squares.get(newLoc);
                if (square != null && square.hasBomb()) {
                    count++;
                }
            }
        }
        return count;
    }

    // Square State Management
    public void incrementMarkedBombs(boolean wasActuallyBomb) {
        markedSquares++;
        if (wasActuallyBomb) {
            correctlyMarkedBombs++;
        }
    }

    public void decrementMarkedBombs(boolean wasActuallyBomb) {
        markedSquares--;
        if (wasActuallyBomb) {
            correctlyMarkedBombs--;
        }
    }

    public boolean areAllBombsMarked() {
        return correctlyMarkedBombs == totalBombs;
    }

    public List<String> getAdjacentLocations(String location) {
        List<String> neighbors = new ArrayList<>();
        char col = location.charAt(0);
        int row = Integer.parseInt(location.substring(1));

        for (int dr = -1; dr <= 1; dr++) {
            for (int dc = -1; dc <= 1; dc++) {
                if (dr == 0 && dc == 0) continue;

                char newCol = (char) (col + dc);
                int newRow = row + dr;

                String newLoc = "" + newCol + newRow;
                if (squares.containsKey(newLoc)) {
                    neighbors.add(newLoc);
                }
            }
        }
        return neighbors;
    }

    // Printing
    public void print() {
        System.out.println();
        nonCheatPrint();
        if (cheat) {
            cheatPrint();
        }
    }

    private void nonCheatPrint() {
        System.out.print("   ");
        for (char col = 'A'; col < 'A' + size; col++) {
            System.out.print(col + " ");
        }
        System.out.println();

        for (int row = size; row >= 1; row--) {
            System.out.printf("%2d", row);
            for (char col = 'A'; col < 'A' + size; col++) {
                String location = "" + col + row;
                System.out.print(" " + squares.get(location).getDisplay());
            }
            System.out.println();
        }
    }

    private void cheatPrint() {
        System.out.println("\nCHEAT VIEW:");
        System.out.print("   ");
        for (char col = 'A'; col < 'A' + size; col++) {
            System.out.print(col + " ");
        }
        System.out.println();

        for (int row = size; row >= 1; row--) {
            System.out.printf("%2d", row);
            for (char col = 'A'; col < 'A' + size; col++) {
                String location = "" + col + row;
                Square square = squares.get(location);
                System.out.print(" " + (square.hasBomb() ? "B" : "~"));
            }
            System.out.println();
        }
    }

    // Field Completion
    public void revealEntireField() {
        System.out.println("Final Field:");
        System.out.print("   ");
        for (char c = 'A'; c < 'A' + size; c++) {
            System.out.print(c + " ");
        }
        System.out.println();

        for (int row = size; row >= 1; row--) {
            System.out.print((row < 10 ? " " : "") + row + " ");
            for (char col = 'A'; col < 'A' + size; col++) {
                String location = col + String.valueOf(row);
                Square square = getSquare(location);

                if (square.hasBomb()) {
                    if (square.isMarked()) {
                        System.out.print(Main.YELLOW + "* " + Main.RESET);
                    } else {
                        System.out.print(Main.WHITE_BG + Main.BLACK + Main.BOLD + "X" + Main.RESET + " ");
                    }
                } else if (square.isTested()) {
                    System.out.print(square.getDisplay() + " ");
                } else {
                    System.out.print(". ");
                }
            }
            System.out.println();
        }
    }

    // Score Calculation
    public int calculateScore() {
        return correctlyMarkedBombs - (markedSquares - correctlyMarkedBombs);
    }

    public int getCorrectlyMarkedBombs() {
        return correctlyMarkedBombs;
    }

    public int getMarkedSquares() {
        return markedSquares;
    }

    public int getTotalBombs() {
        return totalBombs;
    }

    public int getTotalNonBombSquares() {
        return totalNonBombSquares;
    }

    // Non-Bomb Counting
    public void incrementTestedNonBombCount() {
        testedNonBombCount++;
    }

    public int getRemainingNonBombSquares() {
        return totalSquares - totalBombs - testedNonBombCount;
    }
    
    public int getSize() {
		return size;
	}
}
