package view;

import controller.MainController;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.layout.Background;
import javafx.scene.layout.BackgroundFill;
import javafx.scene.layout.VBox;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.text.FontWeight;
import javafx.scene.text.Text;
import javafx.scene.text.TextAlignment;
import model.Game;

public class ScoreView extends VBox {
	VBox roundBox;
	VBox scoreBox;
	Text roundText;
	Text roundNumberText;
	Text scoreText;
	Text scoreNumberText;
	
	public ScoreView(MainController mc, Game game) {
		setBackground(new Background(new BackgroundFill(Color.BLACK, null, null)));
		roundBox = new VBox();
		scoreBox = new VBox();
		
		roundText = new Text("round");
		roundText.setFont(Font.font("Arial", FontWeight.BOLD, 50));
		roundText.setFill(Color.WHITE);
		roundText.textAlignmentProperty().setValue(TextAlignment.CENTER);
		
		roundNumberText = new Text("0");
		roundNumberText.setFont(Font.font("Arial", FontWeight.BOLD, 80));
		roundNumberText.setFill(Color.DARKORANGE);
		roundNumberText.strokeProperty().set(Color.WHITE);
		roundNumberText.textAlignmentProperty().setValue(TextAlignment.CENTER);
		roundNumberText.textProperty().bind(game.getRoundProperty());
		
		scoreText = new Text("score");
		scoreText.setFont(Font.font("Arial", FontWeight.BOLD, 50));
		scoreText.setFill(Color.WHITE);
		scoreText.textAlignmentProperty().setValue(TextAlignment.CENTER);
		
		scoreNumberText = new Text("0");
		scoreNumberText.setFont(Font.font("Arial", FontWeight.BOLD, 80));
		scoreNumberText.setFill(Color.DARKORANGE);
		scoreNumberText.strokeProperty().set(Color.WHITE);
		scoreNumberText.textAlignmentProperty().setValue(TextAlignment.CENTER);
		scoreNumberText.textProperty().bind(game.getScoreProperty());
		
		roundBox.setAlignment(Pos.CENTER);
		scoreBox.setAlignment(Pos.CENTER);
		
		roundBox.setSpacing(10);
		scoreBox.setSpacing(10);
		roundBox.setPadding(new Insets(10, 10, 10, 10));
		scoreBox.setPadding(new Insets(10, 10, 10, 10));
		
		roundBox.getChildren().addAll(roundText, roundNumberText);
		scoreBox.getChildren().addAll(scoreText, scoreNumberText);
		
		getChildren().addAll(roundBox, scoreBox);
	}
	
	
}
