package net.engineeringdigest.journalApp.Controller;

import net.engineeringdigest.journalApp.Entity.Timetable;
import net.engineeringdigest.journalApp.Service.OpenAIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class TimetableController {
	
	private final OpenAIService openAIService;
	
	@Autowired
	public TimetableController(OpenAIService openAIService) {
		this.openAIService = openAIService;
	}
	
	@PostMapping("/generate-timetable")
	public ResponseEntity<Timetable> generateTimetable(@RequestBody String userPrompt) {
		try {
			// Call the service to generate the timetable
			Timetable timetable = openAIService.generateTimetable(userPrompt);
			
			// Check if the timetable was generated successfully
			if (timetable != null && timetable.getEntries() != null && !timetable.getEntries().isEmpty()) {
				return new ResponseEntity<>(timetable, HttpStatus.OK);
			} else {
				// Return a 404 response if no timetable was generated
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			// Log the error and return a 500 response
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}