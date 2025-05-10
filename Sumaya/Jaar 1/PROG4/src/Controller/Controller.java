package Controller;

import javafx.animation.KeyFrame;
import javafx.animation.Timeline;
import javafx.application.Platform;
import javafx.geometry.Pos;
import javafx.stage.Stage;
import javafx.scene.control.Menu;
import javafx.scene.control.MenuBar;
import javafx.scene.control.MenuItem;
import javafx.scene.control.RadioMenuItem;
import javafx.scene.control.ToggleGroup;
import javafx.scene.layout.BorderPane;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.text.Font;
import javafx.stage.FileChooser;
import javafx.util.Duration;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Random;

import Model.Tree;
import Model.TreeSize;
import Model.TreeType;
import Model.World;
import View.PaintingScene;

public class Controller {
    private Stage primaryStage;
    private World world;
    private PaintingScene paintingScene;
    private Timeline timeline;
    private Label signatureLabel;
    private FileIO fileIO;

    private static final double FOREGROUND_SPEED = 2.0; // speed of trees in the foreground
    private static final double BACKGROUND_SPEED = 1.0; // speed of trees in the background
    
    public Controller(Stage primaryStage) {
        this.primaryStage = primaryStage;
        this.world = new World();
        this.fileIO = new FileIO(primaryStage);
    }

    public void startApp() {
        // Create PaintingPane and set up the scene
        paintingScene = new PaintingScene(world);

        // Create menu
        MenuBar menuBar = createMenuBar();

        // Create root pane and add components
        BorderPane root = new BorderPane();
        root.setTop(menuBar);
        root.setCenter(paintingScene.getPane());

        // Create signature label
        signatureLabel = new Label("Sumaya Abdi");
        signatureLabel.setFont(new Font("Arial", 20)); // Default font
        root.setBottom(signatureLabel);
        BorderPane.setAlignment(signatureLabel, Pos.BOTTOM_RIGHT);

        Scene scene = new Scene(root, 800, 600);
        primaryStage.setScene(scene);
        primaryStage.setTitle("Sumaya Abdi - Painting");
        primaryStage.setOnCloseRequest(event -> System.exit(0));
        primaryStage.show();
    }

    private MenuBar createMenuBar() {
        MenuBar menuBar = new MenuBar();

        // File menu
        Menu fileMenu = new Menu("File");
        MenuItem loadPainting = new MenuItem("Load Painting");
        loadPainting.setOnAction(e -> loadPainting());
        MenuItem savePainting = new MenuItem("Save Painting As");
        savePainting.setOnAction(e -> savePaintingAs());
        MenuItem exit = new MenuItem("Exit");
        exit.setOnAction(e -> System.exit(0));
        fileMenu.getItems().addAll(loadPainting, savePainting, exit);

        // Tree menu
        Menu treeMenu = new Menu("Tree");
        MenuItem addLeafTree = new MenuItem("Add LEAF Tree");
        addLeafTree.setOnAction(e -> addRandomTree(TreeType.LEAF));
        MenuItem addPineTree = new MenuItem("Add PINE Tree");
        addPineTree.setOnAction(e -> addRandomTree(TreeType.PINE));
        MenuItem add100Trees = new MenuItem("Add 100 Trees");
        add100Trees.setOnAction(e -> addMultipleTrees(100));
        MenuItem clearAllTrees = new MenuItem("Clear All Trees");
        clearAllTrees.setOnAction(e -> clearAllTrees());
        treeMenu.getItems().addAll(addLeafTree, addPineTree, add100Trees, clearAllTrees);

        // Autograph Font menu
        Menu autographFontMenu = new Menu("Autograph Font");
        ToggleGroup fontGroup = new ToggleGroup();

        // Load fonts from resources directory
        String[] fontFiles = { "GreatVibes.ttf", "handdna.ttf", "HomemadeApple.ttf", "LeckerliOne.ttf", "PWSignaturetwo.ttf", "Quikhand.ttf",  "tommys.ttf" };
        for (String fontFile : fontFiles) {
            String fontName = fontFile.substring(0, fontFile.lastIndexOf('.'));
            try {
                Font font = Font.loadFont(Objects.requireNonNull(getClass().getResourceAsStream("/fonts/" + fontFile)), 12);
                if (font != null) {
                    RadioMenuItem fontItem = new RadioMenuItem(fontName);
                    fontItem.setToggleGroup(fontGroup);
                    fontItem.setOnAction(e -> setSignatureFont(fontName, font));
                    autographFontMenu.getItems().add(fontItem);
                } else {
                    System.out.println("Failed to load font: " + fontFile);
                }
            } catch (NullPointerException e) {
                System.out.println("Font file not found: " + fontFile);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        // Movie menu
        Menu movieMenu = new Menu("Movie");
        RadioMenuItem play = new RadioMenuItem("Play");
        RadioMenuItem stop = new RadioMenuItem("Stop");
        ToggleGroup movieGroup = new ToggleGroup();
        play.setToggleGroup(movieGroup);
        stop.setToggleGroup(movieGroup);
        play.setOnAction(e -> startTrainAnimation());
        stop.setOnAction(e -> stopTrainAnimation());
        movieMenu.getItems().addAll(play, stop);

        menuBar.getMenus().addAll(fileMenu, treeMenu, autographFontMenu, movieMenu);

        return menuBar;
    }

    private void loadPainting() {
        fileIO.loadPainting(world, paintingScene);
    }

    private void savePaintingAs() {
        fileIO.savePaintingAs(world);
    }

    private void addRandomTree(TreeType type) {
        Random rand = new Random();
        TreeSize size = TreeSize.values()[rand.nextInt(TreeSize.values().length)];
        double relX = 5 + rand.nextDouble() * 90; // Ensure relX is between 5 and 95
        double relY = 50 + rand.nextDouble() * 45; // Ensure relY is between 50 en 95
        Tree tree = new Tree(relX, relY, size, type);
        world.addTree(tree);
        paintingScene.refresh();
    }

    private void addMultipleTrees(int count) {
        for (int i = 0; i < count; i++) {
            TreeType type = TreeType.values()[new Random().nextInt(TreeType.values().length)];
            addRandomTree(type);
        }
    }

    private void clearAllTrees() {
        world.clearTrees();
        paintingScene.refresh();
    }

    private void startTrainAnimation() {
        if (timeline != null && timeline.getStatus() == Timeline.Status.RUNNING) {
            timeline.stop();
        }

        timeline = new Timeline(new KeyFrame(Duration.millis(1000 / 24), event -> moveTrees()));
        timeline.setCycleCount(Timeline.INDEFINITE);
        timeline.play();
    }

    private void stopTrainAnimation() {
        if (timeline != null) {
            timeline.stop();
        }
    }

    private void moveTrees() {
        for (Tree tree : world.getTrees()) {
            double speed = (tree.getRelY() / 100) * (FOREGROUND_SPEED - BACKGROUND_SPEED) + BACKGROUND_SPEED;
            double newX = tree.getRelX() + speed;
            if (newX > 100) {
                newX = 0;
            }
            tree.setRelX(newX);
        }
        Platform.runLater(() -> paintingScene.refresh());
    }

    private void setSignatureFont(String fontName, Font font) {
        signatureLabel.setFont(Font.font(fontName, 20));
    }
}
