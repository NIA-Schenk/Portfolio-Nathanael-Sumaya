package minesweeper;

public class Main {
	public static final boolean CHEAT = true;
	public static final String RESET = "\u001B[0m";
    public static final String RED = "\u001B[31m";
    public static final String GREEN = "\u001B[32m";
    public static final String CYAN = "\u001B[36m";
    public static final String YELLOW = "\u001B[33m";
    public static final String BLUE = "\u001B[34m";
    public static final String MAGENTA = "\u001B[35m";
    public static final String BRIGHT_YELLOW = "\u001B[93m";
    public static final String BRIGHT_GREEN = "\u001B[92m";
    public static final String BRIGHT_BLUE = "\u001B[94m";
    public static final String WHITE_BG = "\u001B[47m";
    public static final String BLACK = "\u001B[30m";
    public static final String BOLD = "\u001B[1m";
    public static final String ITALIC = "\u001B[3m";
    public static final String UNDERLINE = "\u001B[4m";
    public static final String BLINKING = "\u001B[5m";

	public static void main(String[] args) {
		MineSweeper game = new MineSweeper();
		game.start();
	}
}