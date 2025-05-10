package Model;

public class Tree {
    private double relX;
    private double relY;
    private TreeSize size;
    private TreeType type;

    public Tree(double relX, double relY, TreeSize size, TreeType type) {
        this.relX = relX;
        this.relY = relY;
        this.size = size;
        this.type = type;
    }

    public double getRelX() {
        return relX;
    }

    public void setRelX(double relX) {
        this.relX = relX;
    }

    public double getRelY() {
        return relY;
    }

    public void setRelY(double relY) {
        this.relY = relY;
    }

    public TreeSize getSize() {
        return size;
    }

    public TreeType getType() {
        return type;
    }

    public String toFileFormat() {
        return type.toString().toLowerCase() + ":" + size.toString().toLowerCase() + ":" + relX + ":" + relY;
    }
}