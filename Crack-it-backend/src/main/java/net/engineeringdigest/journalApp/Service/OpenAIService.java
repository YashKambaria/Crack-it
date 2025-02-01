package net.engineeringdigest.journalApp.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import net.engineeringdigest.journalApp.Entity.Timetable;
import net.engineeringdigest.journalApp.Entity.TimetableEntry;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpEntity;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class OpenAIService {
	
	@Value("${openai.api.key}")
	private String apiKey;
	
	private final RestTemplate restTemplate;
	private final ObjectMapper objectMapper;
	
	public OpenAIService(RestTemplate restTemplate, ObjectMapper objectMapper) {
		this.restTemplate = restTemplate;
		this.objectMapper = objectMapper;
	}
	
	public Timetable generateTimetable(String userPrompt) {
		try {
			// Define the OpenAI API endpoint
			String url = "https://api.openai.com/v1/chat/completions";
			
			// Set headers
			HttpHeaders headers = new HttpHeaders();
			headers.set("Authorization", "Bearer " + apiKey);
			headers.set("Content-Type", "application/json");
			
			// Create the request body
			Map<String, Object> requestBody = new HashMap<>();
			requestBody.put("model", "gpt-4o-mini"); // Use the correct model name
			
			// Add the schema and system message
			String schema = getTimetableSchema();
			String systemMessage = "You are a helpful assistant that generates structured timetables. " +
					"Your output MUST be a JSON array (without wrapping it in an object) following this schema: " + schema;
			
			// User prompt with explicit formatting instructions
			String formattedPrompt = userPrompt + ". Format the output as: topic:\"topicname\",description:\"description\",starttime:\"time\",endtime:\"time\"";
			
			// Include the system and user messages in the request
			requestBody.put("messages", Arrays.asList(
					Map.of(
							"role", "system",
							"content", systemMessage
					),
					Map.of(
							"role", "user",
							"content", formattedPrompt
					)
			));
			
			// Convert the Map to JSON string
			String jsonPayload = objectMapper.writeValueAsString(requestBody);
			
			// Create HTTP entity with headers and body
			HttpEntity<String> entity = new HttpEntity<>(jsonPayload, headers);
			
			// Send the POST request to the OpenAI API
			ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
			
			// Extract the content from the response
			JsonNode responseJson = objectMapper.readTree(response.getBody());
			String content = responseJson
					.path("choices")
					.path(0)
					.path("message")
					.path("content")
					.asText();
			
			// Parse the content into a JSON array
			JsonNode timetableArray = objectMapper.readTree(content);
			
			// Handle cases where the model returns an object with a "timetable" key
			if (timetableArray.has("timetable")) {
				timetableArray = timetableArray.get("timetable");
			}
			
			// Convert JSON array to List<TimetableEntry>
			List<TimetableEntry> entries = new ArrayList<>();
			for (JsonNode entryNode : timetableArray) {
				TimetableEntry entry = objectMapper.treeToValue(entryNode, TimetableEntry.class);
				entries.add(entry);
			}
			
			// Create and return the Timetable entity
			Timetable timetable = new Timetable();
			timetable.setEntries(entries);
			return timetable;
			
		} catch (Exception e) {
			log.error("Error while calling OpenAI API", e);
			return null;
		}
	}
	
	// Schema definition
	private String getTimetableSchema() {
		return "{"
				+ "\"type\": \"array\","
				+ "\"items\": {"
				+ "\"type\": \"object\","
				+ "\"properties\": {"
				+ "\"topic\": {\"type\": \"string\"},"
				+ "\"description\": {\"type\": \"string\"},"
				+ "\"start_time\": {\"type\": \"string\", \"format\": \"date-time\"},"
				+ "\"end_time\": {\"type\": \"string\", \"format\": \"date-time\"}"
				+ "},"
				+ "\"required\": [\"topic\", \"description\", \"start_time\", \"end_time\"],"
				+ "\"additionalProperties\": false"
				+ "}"
				+ "}";
	}
}