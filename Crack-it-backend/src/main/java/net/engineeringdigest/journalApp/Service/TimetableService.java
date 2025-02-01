package net.engineeringdigest.journalApp.Service;

import net.engineeringdigest.journalApp.Entity.Session;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;

@Service
public class TimetableService {
	
	private final ObjectMapper objectMapper;
	
	public TimetableService(ObjectMapper objectMapper) {
		this.objectMapper = objectMapper;
	}
	
	public List<Session> parseTimetable(String jsonResponse) throws Exception {
		return objectMapper.readValue(jsonResponse, objectMapper.getTypeFactory().constructCollectionType(List.class, Session.class));
	}
}
