package View;

import Model.TreeSize;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.paint.Color;

public abstract class TreePainter {
    protected double x;
    protected double y;
    protected double size;
    protected Color color;

    public TreePainter(double relX, double relY, TreeSize treeSize, double canvasWidth, double canvasHeight) {
        this.x = (relX / 100) * canvasWidth;
        this.y = (relY / 100) * canvasHeight;
        this.size = calculateSize(treeSize, relY, canvasHeight);
        this.color = determineColor(treeSize);
    }

    protected double calculateSize(TreeSize treeSize, double relY, double canvasHeight) {
        double baseSize = 20;
        switch (treeSize) {
            case S: baseSize = 20; break;
            case M: baseSize = 40; break;
            case L: baseSize = 60; break;
            case XL: baseSize = 80; break;
            case XXL: baseSize = 100; break;
        }
        return baseSize * (1 + (1 - relY / 100));
    }

    private Color determineColor(TreeSize treeSize) {
        switch (treeSize) {
            case S: return Color.CHARTREUSE;
            case M: return Color.DARKKHAKI;
            case L: return Color.GREEN;
            case XL: return Color.FORESTGREEN;
            case XXL: return Color.DARKOLIVEGREEN;
            default: return Color.DARKGREEN;
        }
    }

    public abstract void paint(GraphicsContext gc);
}