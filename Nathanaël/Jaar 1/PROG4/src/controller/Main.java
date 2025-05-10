package controller;

import dal.IncorrectCatFileException;
import javafx.application.Application;
import javafx.stage.Stage;

public class Main extends Application {

    public static void main(String[] args) {
        launch(args);
    }

    @Override
    public void start(Stage stage) {
        MainController mc = new MainController();
        try {
			mc.start(stage, mc);
		} catch (IncorrectCatFileException e) {
			System.err.println(e.getString());
		}
    }

}