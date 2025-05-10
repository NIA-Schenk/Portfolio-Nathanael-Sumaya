package model;

import java.util.ArrayList;

import dal.FileIO;
import dal.IncorrectCatFileException;
import javafx.beans.property.SimpleStringProperty;
import javafx.beans.property.StringProperty;

public class DataModel {
	private String cat_name = "cat_speed";
	private SimpleStringProperty instruction;
	private ArrayList<String> items = new ArrayList<>();
	private ArrayList<Integer> values = new ArrayList<>();
	private FileIO fileIO;
	
	public DataModel() throws IncorrectCatFileException {
		fileIO = new FileIO(cat_name);
		instruction = new SimpleStringProperty(fileIO.extractData(items, values));
	}
	
	public ArrayList<String> getItems() {
		return items;
	}
	
	public ArrayList<Integer> getValues() {
		return values;
	}
	
	public StringProperty instructionProperty() {
		return instruction;
	}
	
}
