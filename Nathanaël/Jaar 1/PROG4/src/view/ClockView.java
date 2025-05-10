package view;

import controller.MainController;
import javafx.scene.layout.Background;
import javafx.scene.layout.BackgroundFill;
import javafx.scene.layout.BorderPane;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.text.FontWeight;
import javafx.scene.text.Text;
import javafx.scene.text.TextAlignment;
import model.ClockModel;

public class ClockView extends BorderPane {
	Text clockText;
	int fontSize;

	public ClockView(MainController mc, ClockModel cm) {
		setBackground(new Background(new BackgroundFill(Color.BLACK, null, null)));
		
		fontSize = mc.getScreenWidth() / 19;
		if (fontSize > mc.getScreenHeight() / 10) {
			fontSize = mc.getScreenWidth() / 19;
		}
		clockText = new Text("30");
		clockText.setFont(Font.font("Arial", FontWeight.BOLD, fontSize));
		clockText.setTextAlignment(TextAlignment.CENTER);
		clockText.setFill(Color.WHITE);
		setCenter(clockText);
		clockText.textProperty().bind(cm.secondsProperty());
	}
	
//	public void setTime(int time) {
//		clockText.setText(String.valueOf(time));
//	}
}
