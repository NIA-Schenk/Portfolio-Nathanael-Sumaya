package minesweeper;

import java.util.Scanner;

public class Game {
    private MineField field;
    private Scanner scanner;
    private int bombChance;
    private boolean gameOver;
    private boolean cheat;
    private int score;
    private boolean win;
    private boolean firstMoveMade;
    private boolean timerRunning;
    private long elapsedTime;
    private int playedTurns;
    
    public Game(int size, int bombChance, boolean cheat, Scanner scanner) {
        this.field = new MineField(size, cheat);
        this.scanner = scanner;
        this.gameOver = false;
        this.bombChance = bombChance;
        this.firstMoveMade = false;
        this.win = false;
        this.cheat = cheat;
        this.score = 0;
        this.timerRunning = false;
        this.elapsedTime = 0;
        this.playedTurns = 0;
    }
    
    // Main game loop - handles first move safety and subsequent moves
    public void play() {
        String firstMoveLocation = "";
        startTimer();
        while (!gameOver) {
            field.print();
            String move = getValidMove();

            if (firstMoveLocation.isEmpty()) {
                firstMoveLocation = move;
                field.placeBombs(bombChance, firstMoveLocation);
            }

            if (move.startsWith("*")) {
                handleMarkMove(move.substring(1));
            } else {
                handleTestMove(move);
            }
            playedTurns++;
        }
        stopTimer();
        displayScore();
    }
    
    // Validates move format and returns full move string (including * for marking)
    private String getValidMove() {
        while (true) {
            int bombs = field.getTotalBombs();
            if (bombs > 0) {
                System.out.println();
                System.out.println("There are " + field.getTotalBombs() + " bombs in the minefield.");
                System.out.print("Enter location to test or mark (" + Main.YELLOW + "*" + Main.RESET + " to mark): ");
            } else {
                System.out.println();
                System.out.print("Please select your first move.\nRest assured: Your first move will " + Main.ITALIC
                        + Main.UNDERLINE + Main.BOLD + "never" + Main.RESET + " contain a bomb.\nFirst move: ");
            }
            String move = scanner.next().toUpperCase();

            boolean isMarking = move.startsWith("*");

            if (isMarking) {
                move = move.substring(1);
            }

            if (isValidLocation(move)) {
                return isMarking ? "*" + move : move;
            }
            System.out.println(Main.RED + "*** Invalid location! Use format like A1 or *A1 ***" + Main.RESET);
        }
    }
    
    private boolean isValidLocation(String location) {
        if (!hasValidFormat(location)) {
            return false;
        }
        String columnStr = location.substring(0, 1);
        String rowStr = location.substring(1);

        char col = columnStr.charAt(0);
        int row = parseRow(rowStr);
        
        return isWithinBounds(col, row);
    }

    private boolean hasValidFormat(String location) {
        return location.length() > 1 && Character.isLetter(location.charAt(0)) 
               && Character.isDigit(location.charAt(location.length() - 1));
    }

    private int parseRow(String rowStr) {
        try {
            return Integer.parseInt(rowStr);
        } catch (NumberFormatException e) {
            return -1;
        }
    }

    private boolean isWithinBounds(char col, int row) {
        return col >= 'A' && col < ('A' + field.getSize()) &&
               row >= 1 && row <= field.getSize();
    }
    
    // Handles marking/unmarking of potential bomb locations
    private void handleMarkMove(String location) {
        Square square = field.getSquare(location);
        if (square.isTested()) {
            System.out.println(Main.YELLOW + "*** That location has already been tested ***" + Main.RESET);
            return;
        }
        
        boolean isNowMarked = square.toggleMark();
        
        if (isNowMarked) {
            field.incrementMarkedBombs(square.hasBomb());
        } else {
            field.decrementMarkedBombs(square.hasBomb());
        }
        
        if (field.areAllBombsMarked()) {
            System.out.println(Main.GREEN + "*** Congratulations, you've found all bombs! ***" + Main.RESET);
            gameOver = true;
            win = true;
            field.revealEntireField();
        }
    }
    
    // Handles testing a square and reveals adjacent squares if empty
    private void handleTestMove(String location) {
        Square square = field.getSquare(location);
        if (square.isTested()) {
            System.out.println(Main.YELLOW + "*** That location has already been tested ***" + Main.RESET);
            return;
        }

        if (square.hasBomb()) {
            System.out.println(Main.BOLD + Main.ITALIC + Main.RED + Main.BLINKING
                    + "BOOM! You stepped on a mine! You lost..." + Main.RESET);
            gameOver = true;
            win = false;
            field.revealEntireField();
            return;
        }

        revealSquares(location);
        
        if (!firstMoveMade) {
            firstMoveMade = true;
            return;
        }
        
        if (field.getRemainingNonBombSquares() == 0) {
            System.out.println(Main.GREEN + "*** Congratulations, you've tested all non-bomb squares! ***" + Main.RESET);
            gameOver = true;
            win = true;
            field.revealEntireField();
        }
    }

    // Recursively reveals empty squares and their neighbors
    private void revealSquares(String location) {
        Square square = field.getSquare(location);

        if (square == null || square.isTested() || square.isMarked()) {
            return;
        }

        int adjacentBombs = field.countAdjacentBombs(location);
        square.test(adjacentBombs);

        if (adjacentBombs == 0) {
            for (String neighbor : field.getAdjacentLocations(location)) {
                revealSquares(neighbor);
            }
        }
    }
    
    private void displayScore() {
    	System.out.println("You played this game for " + playedTurns + " turn" + (playedTurns == 1 ? "" : "s") + ".");
        System.out.println("You marked (" + Main.YELLOW + "*" + Main.RESET + ") " + field.getCorrectlyMarkedBombs() + " out of "
                + field.getTotalBombs() + " bombs (" + Main.WHITE_BG + Main.BLACK + Main.BOLD + "X" + Main.RESET + ").");
        System.out.println("You incorrectly marked " + (field.getMarkedSquares()-field.getCorrectlyMarkedBombs()) + " squares.");
        if (!cheat) {
            score = field.calculateScore() * 2;
        } else {
            score = field.calculateScore();
        }
        System.out.println("That leaves you with a score of: " + score);
        System.out.println();
    }
    
    public int getScore() {
        return this.score;
    }
    
    public boolean hasWon() {
        return win;
    }

    // Starts a background thread to track elapsed game time
    private void startTimer() {
        long startTime = System.currentTimeMillis();
        timerRunning = true;
        new Thread(() -> {
            while (timerRunning) {
                elapsedTime = (System.currentTimeMillis() - startTime) / 1000;
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        }).start();
    }

    private void stopTimer() {
        timerRunning = false;
        System.out.print("You spent ");
        if (elapsedTime > 60) {
            int minutes = (int)elapsedTime / 60;
            int remainingSeconds = (int)elapsedTime % 60;
            String minuteString = (minutes == 1) ? " minute and " : " minutes and ";
            String remainingSecondsString = (remainingSeconds == 1) ? " second." : " seconds.";
            System.out.println(minutes + minuteString + remainingSeconds + remainingSecondsString + " on this game.");
        } else {
            System.out.println(elapsedTime + " seconds on this game.");
        }
    }
    
    public int getElapsedTime() {
        return (int)elapsedTime;
    }
    
    public int getPlayedTurns() {
        return playedTurns;
    }
}