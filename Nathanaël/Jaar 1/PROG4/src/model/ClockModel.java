package model;

import controller.MainController;
import javafx.application.Platform;
import javafx.beans.property.SimpleStringProperty;
import javafx.beans.property.StringProperty;
import javafx.concurrent.Task;

public class ClockModel extends Task<Void> {
	private SimpleStringProperty seconds = new SimpleStringProperty("30");
	private boolean answerSubmitted = false;
	MainController mc;

	public ClockModel(MainController mc) {
		this.mc = mc;
	}
	
	public void answerSubmitted() {
		answerSubmitted = true;
	}
	
	public void resetAnswerSubmitted() {
		answerSubmitted = false;		
	}

    @Override
    public Void call() throws Exception {
    	while (Integer.parseInt(seconds.get()) > 0) {
    		Thread.sleep(1000);
    		if (answerSubmitted) {
    			return null;
            }
            seconds.set(Integer.toString(Integer.parseInt(seconds.get()) - 1));
        }
        seconds.set("0");
        Platform.runLater(()-> {
	        mc.timesUp();
        });
        return null;
    }
    
    public int getSeconds() {
		return Integer.parseInt(seconds.get());
	}
    
    public void setSeconds(int time) {
		seconds.set(Integer.toString(time));
	}
    
    public StringProperty secondsProperty() {
        return seconds;
    }
}