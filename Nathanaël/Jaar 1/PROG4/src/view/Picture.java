package view;

import javafx.geometry.Pos;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.layout.StackPane;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.text.FontWeight;
import javafx.scene.text.Text;

public class Picture extends StackPane {
	private String imageLink = "/placeholderimage.jpg";
	private Image image;
	private ImageView imageView;
	private Text imageLetter;

	public Picture(String letter) {
		image = new Image(getClass().getResource(imageLink).toString());

		imageView = new ImageView();
		imageView.setImage(image);
		imageView.fitWidthProperty().bind(widthProperty());
		imageView.fitHeightProperty().bind(heightProperty());
		imageView.setPreserveRatio(true);
		imageView.setSmooth(true);

		imageLetter = new Text(letter);
		imageLetter.fontProperty().set(Font.font("Arial", FontWeight.BOLD, 100));
		imageLetter.setFill(Color.WHITE);
		imageLetter.strokeProperty().set(Color.BLACK);
		imageLetter.setStrokeWidth(5);

		setAlignment(imageView, Pos.TOP_LEFT);
		setAlignment(imageLetter, Pos.TOP_LEFT);

		getChildren().add(imageView);
		getChildren().add(imageLetter);
	}

	public void updateImage(String itemName) {
		this.imageLink = "/pics/speed/" + itemName + ".jpg";
		image = new Image(getClass().getResource(imageLink).toString());
		imageView.setImage(image);
	}

}
