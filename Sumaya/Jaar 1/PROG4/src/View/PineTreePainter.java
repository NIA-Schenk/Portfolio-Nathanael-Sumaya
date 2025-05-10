package View;

import Model.TreeSize;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.paint.Color;

public class PineTreePainter extends TreePainter {
    public PineTreePainter(double relX, double relY, TreeSize treeSize, double canvasWidth, double canvasHeight) {
        super(relX, relY, treeSize, canvasWidth, canvasHeight);
    }

    @Override
    public void paint(GraphicsContext gc) {
        gc.setFill(Color.SADDLEBROWN);
        gc.fillRect(x - size / 8, y, size / 4, size);
        gc.setFill(color);
        double[] xPoints = {x, x - size / 2, x + size / 2};
        double[] yPoints = {y - size, y, y};
        gc.fillPolygon(xPoints, yPoints, 3);
    }
}