package view;

import java.util.ArrayList;
import controller.MainController;
import javafx.geometry.Insets;
import javafx.scene.layout.Background;
import javafx.scene.layout.BackgroundFill;
import javafx.scene.layout.VBox;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.text.FontWeight;
import javafx.scene.text.Text;
import javafx.scene.text.TextAlignment;
import model.DataModel;

public class InputView extends VBox {
	Text instruction;
	Text input;
	int fontSize;

	public InputView(MainController mc, DataModel dm) {
		setBackground(new Background(new BackgroundFill(Color.BLACK, null, null)));

		fontSize = mc.getScreenWidth() / 45;
		if (fontSize > (mc.getScreenHeight() / 25)) {
			fontSize = mc.getScreenWidth() / 45;
		}

		instruction = new Text("placeholder instruction");
		instruction.setFont(Font.font("Arial", FontWeight.BOLD, fontSize));
		instruction.setFill(Color.DARKORANGE);
		instruction.setTextAlignment(TextAlignment.CENTER);
		getChildren().add(instruction);
		instruction.textProperty().bind(dm.instructionProperty());

		input = new Text("");
		input.setFont(Font.font("Arial", FontWeight.BOLD, fontSize * 3));
		input.setFill(Color.DARKORANGE);
		input.setTextAlignment(TextAlignment.CENTER);
		getChildren().add(input);

		setSpacing(10);
		setPadding(new Insets(10, 10, 10, 10));
	}

	public void updateInput(ArrayList<String> enteredLetters) {
		input.setText(enteredLetters.toString());
	}

	public void endInput() {
		input.setText("Sluit af door op een willekeurige knop te drukken...");
		input.setFont(Font.font("Arial", FontWeight.BOLD, fontSize));
		
	}
}