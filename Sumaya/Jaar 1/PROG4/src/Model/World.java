package Model;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;

public class World {
    private List<Tree> trees;

    public World() {
        trees = new ArrayList<>();
    }

    public List<Tree> getTrees() {
        return trees;
    }

    public void addTree(Tree tree) {
        trees.add(tree);
    }

    public void clearTrees() {
        trees.clear();
    }

    public void loadFromFile(File file) {
        trees.clear();
        try {
            List<String> lines = Files.readAllLines(file.toPath());
            for (String line : lines) {
                String[] parts = line.split(":");
                if (parts.length == 4) {
                    TreeType type = TreeType.valueOf(parts[0].toUpperCase());
                    TreeSize size = TreeSize.valueOf(parts[1].toUpperCase());
                    double relX = Double.parseDouble(parts[2]);
                    double relY = Double.parseDouble(parts[3]);
                    trees.add(new Tree(relX, relY, size, type));
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}