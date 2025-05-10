package View;

import Model.TreeSize;

import javafx.scene.canvas.GraphicsContext;
import javafx.scene.paint.Color;

public class LeafTreePainter extends TreePainter {
    public LeafTreePainter(double relX, double relY, TreeSize treeSize, double canvasWidth, double canvasHeight) {
        super(relX, relY, treeSize, canvasWidth, canvasHeight);
    }

    @Override
    public void paint(GraphicsContext gc) {
        gc.setFill(Color.SADDLEBROWN);
        gc.fillRect(x - size / 8, y, size / 4, size);
        gc.setFill(color);
        gc.fillOval(x - size / 2, y - size / 2, size, size);
    }
}