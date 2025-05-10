package view;

import java.util.ArrayList;
import controller.MainController;
import javafx.scene.Scene;
import javafx.scene.input.KeyEvent;
import javafx.scene.layout.Pane;
import model.ClockModel;
import model.DataModel;
import model.Game;

public class GameScreen extends Scene {
	private GamePane root;
	private ArrayList<String> enteredLetters;
	private MainController mc;

	public GameScreen(MainController mc, ClockModel cm, DataModel dm, Game game) {
		super(new Pane(), 100, 100);
		root = new GamePane(mc, cm, dm, game);
		this.mc = mc;
		enteredLetters = new ArrayList<>();

		setRoot(root);
		setOnKeyPressed(this::handleKeyPress);
	}

	public void handleKeyPress(KeyEvent event) {
		String key = event.getCode().toString();

		if (isValidKey(key)) {
			if (key.equals("BACK_SPACE")) {
				removeLastEnteredLetter();
			} else if (key.equals("ENTER")) {
				if (enteredLetters.size() == 4) {
					mc.endQuestion(enteredLetters);
				}
			} else {
				if (!enteredLetters.contains(key)) {
					enteredLetters.add(key);
					root.updateInput(enteredLetters);
				}
			}
		}
	}

	private boolean isValidKey(String key) {
		return key.matches("[ABCD]") || key.equals("BACK_SPACE") || key.equals("ENTER");
	}

	private void removeLastEnteredLetter() {
		if (!enteredLetters.isEmpty()) {
			enteredLetters.remove(enteredLetters.size() - 1);
			root.updateInput(enteredLetters);
		}
	}
	
	public void clearInput() {
		enteredLetters.clear();
		root.updateInput(enteredLetters);
	}

	public void updatePicturesAndLabels(String itemName1, String itemName2, String itemName3, String itemName4) {
		root.updatePicturesAndLabels(itemName1, itemName2, itemName3, itemName4);
	}
	
	public void endInput() {
		root.endInput();
	}

}
