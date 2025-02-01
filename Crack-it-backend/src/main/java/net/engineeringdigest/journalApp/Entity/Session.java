package net.engineeringdigest.journalApp.Entity;

import lombok.Data;

@Data
public class Session {
	private String topic;
	private String description;
	private String startTime;
	private String endTime;
}