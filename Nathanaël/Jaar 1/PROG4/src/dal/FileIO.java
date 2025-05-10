package dal;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Scanner;

public class FileIO {
	private String cat_name;

	public FileIO(String cat_name) {
		this.cat_name = cat_name;
	}

	public String extractData(ArrayList<String> items, ArrayList<Integer> values) throws IncorrectCatFileException {
		String inpath = getClass().getResource("/files/" + cat_name + ".txt").getPath();
		String instruction;
		File file = new File(inpath);

		try (Scanner scanner = new Scanner(file)) {
			int lineNumber = 0;

			if (!file.exists()) {
				throw new IncorrectCatFileException("File not found: " + file.getPath());
			}

			lineNumber++;
			String line = scanner.nextLine();
			instruction = line;

			while (scanner.hasNextLine()) {
				lineNumber++;
				line = scanner.nextLine();
				String[] parts = line.split(" ");

				if (parts.length != 2) {
					throw new IncorrectCatFileException(
							"Invalid line format in file: " + file.getPath() + " at line " + lineNumber);
				}

				String item = parts[0];
				int value;
				try {
					value = Integer.parseInt(parts[1]);
				} catch (NumberFormatException e) {
					throw new IncorrectCatFileException(
							"Invalid value format in file: " + file.getPath() + " at line " + lineNumber);
				}

				items.add(item);
				values.add(value);
			}
		} catch (IOException e) {
			throw new IncorrectCatFileException("Error reading file: " + file.getPath());
		}
		return instruction;
	}

}
