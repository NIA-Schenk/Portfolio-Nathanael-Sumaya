package controller;

import java.awt.Toolkit;
import java.util.ArrayList;

import dal.IncorrectCatFileException;
import javafx.application.Platform;
import javafx.scene.input.KeyCombination;
import javafx.stage.Stage;
import model.ClockModel;
import model.DataModel;
import model.Game;
import view.GameScreen;

public class MainController {
	DataModel dm;
	Game game;
	ClockModel cm;
	GameScreen gs;
	Thread t;

	public void start(Stage stage, MainController mc) throws IncorrectCatFileException {
		this.dm = new DataModel();
		this.game = new Game();
		this.cm = new ClockModel(mc);
		this.gs = new GameScreen(mc, cm, dm, game);

		stage.setScene(gs);
		stage.setFullScreen(true);
		stage.setResizable(true);
		stage.setTitle("SpeedQZ");
		stage.setFullScreenExitKeyCombination(KeyCombination.keyCombination("Esc"));
		stage.show();
		startQuestion();

	}

	public int getScreenHeight() {
		return Toolkit.getDefaultToolkit().getScreenSize().height;
	}

	public int getScreenWidth() {
		return Toolkit.getDefaultToolkit().getScreenSize().width;
	}

	public void startQuestion() {
		game.addRound();
		game.clearQuestion();
		game.createQuestion(dm.getItems(), dm.getValues());
		gs.updatePicturesAndLabels(game.getPi(0), game.getPi(1), game.getPi(2), game.getPi(3));
		cm.setSeconds(30);
		cm.resetAnswerSubmitted();
		t = new Thread(cm);
		t.start();
	}

	public void timesUp() {
		if (game.getRoundNr() < 10) {
			startQuestion();
		} else {
			gs.setOnKeyPressed(e -> {
			    if (!(e.getCode() == null)) {
			        Platform.exit();
			    }
			});
		}
	}

	public void endQuestion(ArrayList<String> enteredLetters) {
		cm.answerSubmitted();
		ArrayList<Integer> pv = game.getPvAl();
		ArrayList<Integer> indexes = new ArrayList<>();
		for (int i = 0; i < pv.size(); i++) {
			Character c = enteredLetters.get(i).charAt(0);
			indexes.add(c - 'A');
			System.out.println(indexes);
		}
		game.setScore(cm.getSeconds(),
				(pv.get(indexes.get(0)) < pv.get(indexes.get(1)) && pv.get(indexes.get(1)) < pv.get(indexes.get(2))
						&& pv.get(indexes.get(2)) < pv.get(indexes.get(3))));
		gs.clearInput();
		if (game.getRoundNr() < 10) {
			startQuestion();
		} else {
			gs.updatePicturesAndLabels("sluit_af", "sluit_af", "sluit_af", "sluit_af");
			gs.endInput();
			gs.setOnKeyPressed(e -> {
			    if (!(e.getCode() == null)) {
			        Platform.exit();
			    }
			});
		}
	}
}
