package Controller;

import javafx.stage.FileChooser;
import javafx.stage.Stage;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

import Model.Tree;
import Model.World;
import View.PaintingScene;

public class FileIO {
    private Stage primaryStage;

    public FileIO(Stage primaryStage) {
        this.primaryStage = primaryStage;
    }

    public void loadPainting(World world, PaintingScene paintingScene) {
        FileChooser fileChooser = new FileChooser();
        fileChooser.setTitle("Open Painting File");

        File file = fileChooser.showOpenDialog(primaryStage);
        if (file != null) {
            world.loadFromFile(file);
			paintingScene.refresh();
        }
    }

    public void savePaintingAs(World world) {
        FileChooser fileChooser = new FileChooser();
        fileChooser.setTitle("Save Painting File");

        File file = fileChooser.showSaveDialog(primaryStage);
        if (file != null) {
            // Ensure the file has the correct extension
            if (!file.getPath().endsWith(".painting")) {
                file = new File(file.getPath() + ".painting");
            }

            try (FileWriter writer = new FileWriter(file)) {
                List<Tree> trees = world.getTrees();
                for (Tree tree : trees) {
                    writer.write(tree.toFileFormat() + "\n");
                }
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }
    }
}