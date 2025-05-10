package View;

import Model.World;
import javafx.scene.Scene;
import javafx.scene.layout.Pane;

public class PaintingScene extends Scene {
    
    private PaintingPane paintingPane;

    public PaintingScene(World world) {
        super(new Pane(), 800, 600);

        // Create PaintingPane and add it to the root pane
        paintingPane = new PaintingPane(world);
        Pane root = (Pane) this.getRoot();
        root.getChildren().add(paintingPane);
    }

    public Pane getPane() {
        return (Pane) this.getRoot();
    }

    public void refresh() {
        paintingPane.refresh();
    }
}