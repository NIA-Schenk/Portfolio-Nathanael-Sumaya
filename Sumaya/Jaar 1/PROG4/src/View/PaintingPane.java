package View;

import Model.Tree;
import Model.TreeType;
import Model.World;

import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.layout.Pane;
import javafx.scene.paint.Color;

public class PaintingPane extends Pane {
    
    private Canvas canvas;
    private World world;

    public PaintingPane(World world) {
        this.world = world;
        canvas = new Canvas(800, 600);
        this.getChildren().add(canvas);
        draw();
    }

    public void refresh() {
        draw();
    }

    private void draw() {
        GraphicsContext gc = canvas.getGraphicsContext2D();

        // Clear the canvas
        gc.clearRect(0, 0, canvas.getWidth(), canvas.getHeight());

        // Draw sky
        gc.setFill(Color.SKYBLUE);
        gc.fillRect(0, 0, canvas.getWidth(), canvas.getHeight() / 2);

        // Draw ground
        gc.setFill(Color.PERU);
        gc.fillRect(0, canvas.getHeight() / 2, canvas.getWidth(), canvas.getHeight() / 2);

        // Draw trees
        for (Tree tree : world.getTrees()) {
            TreePainter painter;
            if (tree.getType() == TreeType.LEAF) {
                painter = new LeafTreePainter(tree.getRelX(), tree.getRelY(), tree.getSize(), canvas.getWidth(), canvas.getHeight());
            } else {
                painter = new PineTreePainter(tree.getRelX(), tree.getRelY(), tree.getSize(), canvas.getWidth(), canvas.getHeight());
            }
            painter.paint(gc);
        }
    }
}