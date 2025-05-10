package view;

import controller.MainController;
import javafx.geometry.Insets;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.text.FontWeight;
import javafx.scene.text.Text;

public class PicturesView extends HBox {
	private VBox pic1;
	private VBox pic2;
	private VBox pic3;
	private VBox pic4;
	private VBox left;
	private VBox right;
	
	private Picture picture1;
	private Picture picture2;
	private Picture picture3;
	private Picture picture4;

	private Text label1;
	private Text label2;
	private Text label3;
	private Text label4;
	
	private int fontSize;

	public PicturesView(MainController mc) {

		pic1 = new VBox();
		pic2 = new VBox();
		pic3 = new VBox();
		pic4 = new VBox();
		left = new VBox();
		right = new VBox();
		
		fontSize = mc.getScreenWidth() / 45;
		if (fontSize > (mc.getScreenHeight() / 25)) {
			fontSize = mc.getScreenWidth() / 45;
		}
		
		picture1 = new Picture("A");
		picture2 = new Picture("B");
		picture3 = new Picture("C");
		picture4 = new Picture("D");
		
		label1 = new Text("placeholder_image");
		label1.setFont(Font.font("Arial", FontWeight.BOLD, fontSize));
		label1.setFill(Color.WHITE);
		
		label2 = new Text("placeholder_image");
		label2.setFont(Font.font("Arial", FontWeight.BOLD, fontSize));
		label2.setFill(Color.WHITE);
		
		label3 = new Text("placeholder_image");
		label3.setFont(Font.font("Arial", FontWeight.BOLD, fontSize));
		label3.setFill(Color.WHITE);
		
		label4 = new Text("placeholder_image");
		label4.setFont(Font.font("Arial", FontWeight.BOLD, fontSize));
		label4.setFill(Color.WHITE);
		
		pic1.setSpacing(10);
		pic2.setSpacing(10);
		pic3.setSpacing(10);
		pic4.setSpacing(10);
		left.setSpacing(10);
		right.setSpacing(10);
		
		pic1.setPadding(new Insets(10, 10, 10, 10));
		pic2.setPadding(new Insets(10, 10, 10, 10));
		pic3.setPadding(new Insets(10, 10, 10, 10));
		pic4.setPadding(new Insets(10, 10, 10, 10));
		
		pic1.getChildren().addAll(picture1, label1);
		pic2.getChildren().addAll(picture2, label2);
		pic3.getChildren().addAll(picture3, label3);
		pic4.getChildren().addAll(picture4, label4);
		
		left.getChildren().add(pic1);
		right.getChildren().add(pic2);
		left.getChildren().add(pic3);
		right.getChildren().add(pic4);
		
		getChildren().add(left);
		getChildren().add(right);

	}

	public void updatePicturesAndLabels(String itemName1, String itemName2, String itemName3, String itemName4) {
		picture1.updateImage(itemName1);
		picture2.updateImage(itemName2);
		picture3.updateImage(itemName3);
		picture4.updateImage(itemName4);

		label1.setText(itemName1);
		label2.setText(itemName2);
		label3.setText(itemName3);
		label4.setText(itemName4);
	}

}
