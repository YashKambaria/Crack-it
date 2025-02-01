package net.engineeringdigest.journalApp.Controller;

import lombok.extern.slf4j.Slf4j;
import net.engineeringdigest.journalApp.Entity.UserEntity;
import net.engineeringdigest.journalApp.Service.OpenAIService;
import net.engineeringdigest.journalApp.Service.UserService;
import net.engineeringdigest.journalApp.Util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestController
@Slf4j
@RequestMapping("/api")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody UserEntity user) {
		try {
			// Validate user details
			String validationMessage = userService.validateUser(user);
			if (validationMessage != null) {
				return ResponseEntity.badRequest().body(Collections.singletonMap("error", validationMessage));
			}
			
			// Save user with hashed password
			userService.saveUser(user);
			return ResponseEntity.status(201).body(Collections.singletonMap("message", "User registered successfully!"));
		} catch (Exception e) {
			log.error("Error while registering user", e);
			return ResponseEntity.status(400).body(Collections.singletonMap("error", "Registration failed"));
		}
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody Map<String, String> credentials) {
		String email = credentials.get("email");
		String password = credentials.get("password");
		
		String token = userService.authenticateUser(email, password);
		if (token != null) {
			Map<String, String> response = new HashMap<>();
			response.put("token", token);
			return ResponseEntity.ok(response);
		} else {
			return ResponseEntity.status(401).body(Collections.singletonMap("error", "Invalid email or password"));
		}
	}
	
	@GetMapping("/protected")
	public ResponseEntity<?> protectedEndpoint(@RequestHeader("Authorization") String authHeader) {
		try {
			String token = authHeader.replace("Bearer ", "");
			String username = JwtUtil.extractUsername(token);
			
			if (username != null && JwtUtil.validateToken(token)) {
				return ResponseEntity.ok(Collections.singletonMap("message", "Access granted for " + username));
			} else {
				return ResponseEntity.status(401).body(Collections.singletonMap("error", "Invalid token"));
			}
		} catch (Exception e) {
			return ResponseEntity.status(401).body(Collections.singletonMap("error", "Unauthorized"));
		}
	}
}