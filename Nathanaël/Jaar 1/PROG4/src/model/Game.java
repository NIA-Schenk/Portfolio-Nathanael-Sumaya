package model;

import java.util.ArrayList;
import java.util.Random;
import javafx.beans.property.SimpleStringProperty;
import javafx.beans.property.StringProperty;

public class Game {
	private StringProperty score = new SimpleStringProperty("0");
	private StringProperty roundnr = new SimpleStringProperty("1");
	private ArrayList<String> pi = new ArrayList<>();
	private ArrayList<Integer> pv = new ArrayList<>();

	public Game() {
		score.set("0");
		roundnr.set("0");
	}

	public void setScore(int timeLeft, boolean correct) {
		if (correct) {
			this.score.set(Integer.toString(Integer.parseInt(score.get()) + timeLeft));
			System.out.println(score);
		} else {
			if (timeLeft < Integer.parseInt(score.get())) {
				this.score.set(Integer.toString(Integer.parseInt(score.get()) - timeLeft));
			} else {
				this.score.set("0");
			}
			System.out.println(score);
		}
	}

	public void addRound() {
		roundnr.set(Integer.toString(Integer.parseInt(roundnr.get()) + 1));
	}
	
	public int getRoundNr() {
		return Integer.parseInt(roundnr.get());
	}

	public void createQuestion(ArrayList<String> ai, ArrayList<Integer> av) {
		Random random = new Random();
		ArrayList<String> tempai = new ArrayList<>();
		ArrayList<Integer> tempav = new ArrayList<>();
		
		for (int i = 0; i < ai.size(); i++) {
			tempai.add(ai.get(i));
			tempav.add(av.get(i));
		}
		for (int i = 0; i < 4; i++) {
			int index = random.nextInt(tempai.size());
			pi.add(tempai.get(index));
			pv.add(tempav.get(index));
			tempai.remove(index);
			tempav.remove(index);
			System.out.println(pi.get(i) + " gaat " + pv.get(i) + " km/h");
		}
	}

	public void clearQuestion() {
		pi.clear();
		pv.clear();
	}

	public String getPi(int i) {
		return pi.get(i);
	}

	public int getPv(int i) {
		return pv.get(i);
	}
	
	public ArrayList<Integer> getPvAl() {
		return pv;
	}
	
	public StringProperty getScoreProperty() {
		return score;
	}
	
	public StringProperty getRoundProperty() {
		return roundnr;
	}
}
