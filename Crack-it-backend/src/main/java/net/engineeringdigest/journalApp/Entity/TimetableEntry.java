package net.engineeringdigest.journalApp.Entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.springframework.stereotype.Component;

@Component
@Data
public class TimetableEntry {
	@JsonProperty("topic")
	private String topic;
	
	@JsonProperty("description")
	private String description;
	
	@JsonProperty("start_time")
	private String startTime;
	
	@JsonProperty("end_time")
	private String endTime;
}
