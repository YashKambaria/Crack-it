package net.engineeringdigest.journalApp.Controller;

import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173") // Allow frontend requests
@RestController
@RequestMapping("/health-check")
public class health_check {
	
	@GetMapping("")
	public String health(){
		return "All working fine";
	}
}
