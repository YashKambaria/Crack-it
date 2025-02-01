package net.engineeringdigest.journalApp.Controller;

import lombok.extern.slf4j.Slf4j;
import net.engineeringdigest.journalApp.Entity.UserEntity;
import net.engineeringdigest.journalApp.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@Slf4j
@RequestMapping("/api")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody UserEntity user) {
		try {
			// Handle the received user data
			String validationMessage = userService.validateUser(user);
			if (validationMessage != null) {
				return ResponseEntity.badRequest().body(Collections.singletonMap("error", validationMessage));
			}
			userService.saveEntry(user);
			return new ResponseEntity<>(HttpStatus.CREATED);
		}
		catch (Exception e){
			log.error("error while saving user ",e);
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
}