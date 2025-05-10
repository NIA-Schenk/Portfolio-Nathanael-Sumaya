package dal;

public class IncorrectCatFileException extends Exception {
	private static final long serialVersionUID = 1L;
	String errorMsgString;

	public IncorrectCatFileException(String errorMsgString) {
		this.errorMsgString = errorMsgString;
	}
	
	public String getString() {
		return errorMsgString;
	}

}
