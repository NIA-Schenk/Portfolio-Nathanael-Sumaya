package minesweeper;

public class Square {
    private String location;  // Add location field
    private boolean hasBomb;
    private boolean isMarked;
    private boolean isTested;
    private int adjacentBombs;

    public Square(String location) {  // Constructor now takes location
        this.location = location;
        this.hasBomb = false;
        this.isMarked = false;
        this.isTested = false;
        this.adjacentBombs = 0;
    }

    public void setBomb(boolean hasBomb) {
        this.hasBomb = hasBomb;
    }

    public boolean hasBomb() {
        return hasBomb;
    }

    public boolean toggleMark() {
        isMarked = !isMarked;
        return isMarked; // Return the new state
    }

    public boolean isMarked() {
        return isMarked;
    }

    public void test(int adjacentBombs) {
        this.isTested = true;
        this.adjacentBombs = adjacentBombs;
    }

    public boolean isTested() {
        return isTested;
    }

    public String getDisplay() {
        if (isMarked) {
        	return Main.YELLOW + "*" + Main.RESET; // Yellow for marked squares
        } else if (!isTested) {
        	return "."; // Unrevealed squares remain as "."
        } else {
        return getColoredAdjacentBombs();
        }
    }

    private String getColoredAdjacentBombs() {
        switch (adjacentBombs) {
        case 1: return Main.BLUE + "1" + Main.RESET;
        case 2: return Main.GREEN + "2" + Main.RESET;
        case 3: return Main.RED + "3" + Main.RESET;
        case 4: return Main.MAGENTA + "4" + Main.RESET;
        case 5: return Main.CYAN + "5" + Main.RESET;
        case 6: return Main.BRIGHT_YELLOW + "6" + Main.RESET;
        case 7: return Main.BRIGHT_GREEN + "7" + Main.RESET;
        case 8: return Main.BRIGHT_BLUE + "8" + Main.RESET;
        default: return "0"; // No bombs
        }
    }

    // Getter for location
    public String getLocation() {
        return location;
    }
}