package net.engineeringdigest.journalApp.Service;


import net.engineeringdigest.journalApp.Entity.UserEntity;
import net.engineeringdigest.journalApp.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	
	public void saveEntry(UserEntity username) {
		userRepository.save(username);
	}
	
	public String validateUser(UserEntity user) {
		if (userRepository.existsByUsername(user.getUsername())) {
			return "Username is already taken!";
		}
		if (userRepository.existsByEmail(user.getEmail())) {
			return "Email is already registered!";
		}
		if (userRepository.existsByPhone(user.getPhone())) {
			return "Phone number is already registered!";
		}
		return null;
	}
}
