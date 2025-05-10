import java.util.ArrayList;

public class Square {
    private String name;
    private boolean hasMine;
    private boolean isMarked;
    private boolean isRevealed;

    public Square(String name, boolean isMarked) {
        this.name = name;
        this.isMarked = isMarked;
    }

    public void setHasMine(boolean hasMine) {
        this.hasMine = hasMine;
    }

    public String getName() {
        return name;
    }

    public boolean getHasMine() {
        return hasMine;
    }

    public boolean getIsMarked() {
        return isMarked;
    }

    public boolean getIsRevealed() {
        return isRevealed;
    }	
    
    public void setIsRevealed(boolean isRevealed) {
    	this.isRevealed = isRevealed;
    }

    public int countSurroundingBombs(int playerFieldLength, Square square, ArrayList<Square> squares) {
        int bombCount = 0;
        String name = square.getName();
        char col = name.charAt(0);
        int row = Integer.parseInt(name.substring(1));

        for (int dRow = -1; dRow <= 1; dRow++) {
            for (int dCol = -1; dCol <= 1; dCol++) {
                if (dRow == 0 && dCol == 0) continue;

                char newCol = (char) (col + dCol);
                int newRow = row + dRow;

                if (newCol >= 'A' && newCol < 'A' + playerFieldLength && newRow >= 1 && newRow <= playerFieldLength) {
                    String neighborName = newCol + "" + newRow;
                    
                    MineSweeper mineSweeper = new MineSweeper();
                    Square neighbor = mineSweeper.findSquareByName(squares, neighborName);

                    if (neighbor != null && neighbor.getHasMine()) {
                        bombCount++;
                    }
                }
            }
        }
        return bombCount;
    }

    
    public ArrayList<String> getAdjacentSquares(String squareName, int playerFieldLength) {
        char col = squareName.charAt(0);
        int row = Integer.parseInt(squareName.substring(1));

        ArrayList<String> adjacentSquares = new ArrayList<>();

        for (int dRow = -1; dRow <= 1; dRow++) {
            for (int dCol = -1; dCol <= 1; dCol++) {
                if (dRow == 0 && dCol == 0) continue;

                char newCol = (char) (col + dCol);
                int newRow = row + dRow;

                if (newCol >= 'A' && newCol < 'A' + playerFieldLength && newRow >= 1 && newRow <= playerFieldLength) {
                    String neighborName = "" + newCol + newRow;
                    adjacentSquares.add(neighborName);
                }
            }
        }
        return adjacentSquares;
    }
}

