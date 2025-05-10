package minesweeper;

import java.util.InputMismatchException;
import java.util.Scanner;

public class MineSweeper {
    private Scanner scanner;
    private int totalScore;
    private int totalTurns;
    private int totalWins;
    private int totalLosses;
    private int totalTime;
    
    public MineSweeper() {
        this.scanner = new Scanner(System.in);
    }

    public void start() {
        printWelcome();
        playGames();
        printGameSummary();
        scanner.close();
    }

    private void playGames() {
        boolean playAgain = true;
        while (playAgain) {
            Game game = createGame();
            game.play();
            updateStats(game);
            playAgain = askPlayAgain();
        }
    }

    private void updateStats(Game game) {
        totalScore += game.getScore();
        totalWins += (game.hasWon() ? 1 : 0);
        totalLosses += (game.hasWon() ? 0 : 1);
        totalTime += game.getElapsedTime();
        totalTurns += game.getPlayedTurns();
    }

    private Game createGame() {
        boolean cheat = askCheat();
        int size = getValidSize();
        int bombChance = getValidBombChance();
        return new Game(size, bombChance, cheat, scanner);
    }

    private void printGameSummary() {
        try {
			Thread.sleep(1000);
            System.out.println("Thank you for playing MineSweeper!");
            Thread.sleep(1000);
            System.out.println("You played " + totalTurns + " turn" + (totalTurns != 1 ? "s." : "."));
            Thread.sleep(1000);
            System.out.println("You won " + totalWins + " time" + (totalWins != 1 ? "s " : " ")
                    + "and lost " + totalLosses + " time" + (totalLosses != 1 ? "s" : "") + ".");
            Thread.sleep(1000);
            printTotalTime();
            Thread.sleep(1000);
            int totalGames = totalWins + totalLosses;
            System.out.println("After " + totalGames + " game" + (totalGames != 1 ? "s" : "")
            		+ ", your total score was: " + totalScore + ".");
            Thread.sleep(1000);
            System.out.println("Goodbye! We hope to see you soon!");
            Thread.sleep(10000);
        } catch (InterruptedException e) {
        	System.out.println("Thank you for playing MineSweeper!");
            System.out.println("You played " + totalTurns + " turn" + (totalTurns != 1 ? "s " : " "));
            System.out.println("You won " + totalWins + " time" + (totalWins != 1 ? "s " : " ")
                    + "and lost " + totalLosses + " time" + (totalLosses != 1 ? "s" : "") + ".");
            printTotalTime();
            System.out.println("After " + (totalWins + totalLosses) + " games, your total score was: " + totalScore);
            System.out.println("Goodbye!");
        }
    }

    private void printTotalTime() {
        if (totalTime <= 60) {
            System.out.println("Your total time was: " + totalTime + " seconds.");
        } else {
            int minutes = totalTime / 60;
            int remainingSeconds = totalTime % 60;
            String minuteString = (minutes == 1) ? " minute and " : " minutes and ";
            String remainingSecondsString = (remainingSeconds == 1) ? " second." : " seconds.";
            System.out.println("Your total time was: " + minutes + minuteString + remainingSeconds + remainingSecondsString);
        }
    }
    
    private void printWelcome() {
    	System.out.println(Main.BOLD + Main.ITALIC + Main.UNDERLINE + "Welcome to Minesweeper!" + Main.RESET);
    	System.out.println();
    	System.out.println("Minesweeper is a timeless puzzle game where players uncover safe squares on a grid");
    	System.out.println("while avoiding hidden " + Main.RED + Main.BLINKING + "mines" + Main.RESET
    			+ ". Each revealed square provides clues / numbers that");
    	System.out.println("indicate how many mines are adjacent. Success in Minesweeper requires logic,");
    	System.out.println("deduction, and a touch of bravery as you balance careful planning with calculated risks.");
    	System.out.println();
    	System.out.println(Main.CYAN + "This Java implementation enhances the classic Minesweeper "
    			+ "experience with several exciting features:" + Main.RESET);
    	System.out.println("- " + Main.GREEN + "Timer" + Main.RESET + " to track how quickly you can solve the puzzle.");
    	System.out.println("- " + Main.GREEN + "Turn Counter" + Main.RESET + " to measure the number of moves you make.");
    	System.out.println("- " + Main.GREEN + "Scoring System" + Main.RESET + " that rewards efficiency.");
    	System.out.println("- " + Main.GREEN + "Colored Text and Numbers" + Main.RESET + " for an " + Main.ITALIC
    	        + "immersive, visually appealing experience" + Main.RESET + ".");
    	System.out.println();
    	System.out.println(Main.BOLD + "Ready to test your logic and strategy skills? Let the game begin!" + Main.RESET);
		System.out.println();
		for (int i = 0; i < 100; i++) {
			System.out.print("-");
		}
		System.out.println();
		System.out.println();
    }
    
    private boolean askCheat() {
		while (true) {
			System.out.print("Would you like to cheat (" + Main.RED + "YES" + Main.RESET + "/" + Main.GREEN + "NO" + Main.RESET + ")? "
					+ Main.RED + Main.ITALIC + "(Points will be halved if you choose \"YES\") " + Main.RESET + ": ");
			String answer = scanner.next().toLowerCase();
			if (answer.equals("yes") || answer.equals("y")) {
				return true;
			}
			if (answer.equals("no") || answer.equals("n")) {
				return false;
			}
			System.out.println(Main.RED + "*** Please answer with yes or no ***" + Main.RESET);
		}
	}
    
    private int getValidSize() {
        while (true) {
            System.out.print("How big should the minefield be? (5-20): ");
            int size = 0;
            try {
            	size = scanner.nextInt();
            } catch (InputMismatchException e) {
            	System.out.println(Main.RED + "*** Size must be a valid number! ***" + Main.RESET);
				scanner.next();
				continue;
            }
            
            if (size >= 5 && size <= 20) {
                return size;
            }
            System.out.println(Main.RED + "*** Size must be between 5 and 20! ***" + Main.RESET);
        }
    }
    
    private int getValidBombChance() {
        while (true) {
            System.out.print("What percentage of the squares should contain a bomb? (10-25): ");
            int chance = scanner.nextInt();
            if (chance >= 10 && chance <= 25) {
               System.out.println();
               return chance;
            }
            System.out.println(Main.RED + "*** Chance must be between 10 and 25! ***" + Main.RESET);
        }
    }
    
    private boolean askPlayAgain() {
        while (true) {
        	System.out.print("Would you like to play again (" + Main.GREEN + "YES" + Main.RESET + "/"
        			+ Main.RED + "NO" + Main.RESET + ")? ");
            String answer = scanner.next().toLowerCase();
            if (answer.equals("yes") || answer.equals("y")) {
                return true;
            }
            if (answer.equals("no") || answer.equals("n")) {
                return false;
            }
            System.out.println(Main.RED + "*** Please answer with yes or no ***" + Main.RESET);
        }
    }
}
