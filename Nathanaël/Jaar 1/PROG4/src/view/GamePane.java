package view;

import java.util.ArrayList;
import controller.MainController;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.layout.Background;
import javafx.scene.layout.BackgroundFill;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.scene.paint.Color;
import model.ClockModel;
import model.DataModel;
import model.Game;

public class GamePane extends HBox {
	private PicturesView picturesView;
	private BorderPane clockView;
	private VBox scoreView;
	private InputView inputView;
	private VBox left;
	private VBox center;
	ArrayList<Character> enteredLetters = new ArrayList<>();
	
	public GamePane(MainController mc, ClockModel cm, DataModel dm, Game game) {
		setBackground(new Background(new BackgroundFill(Color.BROWN, null, null)));
		picturesView = new PicturesView(mc);
		clockView = new ClockView(mc, cm);
		scoreView = new ScoreView(mc, game);
		inputView = new InputView(mc, dm);
		int screenWidth = mc.getScreenWidth();
		int screenHeight = mc.getScreenHeight();
		
		clockView.setPrefSize(screenWidth * 0.1, screenWidth * 0.1);
		scoreView.setPrefSize(screenWidth * 0.1, screenHeight * 0.9);
		inputView.setPrefSize(screenWidth * 0.9, screenHeight * 0.1);
		picturesView.setPrefSize(screenWidth * 0.9, screenHeight * 0.9);
		
		left = new VBox();
		center = new VBox();
		
		left.setSpacing(10);
		center.setSpacing(10);
		left.setPadding(new Insets(10, 10, 10, 10));
		center.setPadding(new Insets(10, 10, 10, 10));
		
		scoreView.setAlignment(Pos.CENTER);
		picturesView.setAlignment(Pos.CENTER);
		inputView.setAlignment(Pos.CENTER_LEFT);
		
		left.getChildren().addAll(clockView, scoreView);
		center.getChildren().addAll(picturesView, inputView);
		
		getChildren().addAll(left, center);
	}
	
	public void updateInput(ArrayList<String> enteredLetters) {
		inputView.updateInput(enteredLetters);
	}
	
	public void endInput() {
		inputView.endInput();
	}
	
	public void updatePicturesAndLabels(String itemName1, String itemName2, String itemName3, String itemName4) {
		picturesView.updatePicturesAndLabels(itemName1, itemName2, itemName3, itemName4);
	}
	
}
