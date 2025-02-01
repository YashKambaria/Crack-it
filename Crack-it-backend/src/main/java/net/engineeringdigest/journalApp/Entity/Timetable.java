package net.engineeringdigest.journalApp.Entity;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Data
public class Timetable {
	private List<TimetableEntry> entries;
}
