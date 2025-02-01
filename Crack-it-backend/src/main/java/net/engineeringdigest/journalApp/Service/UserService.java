package net.engineeringdigest.journalApp.Service;

import net.engineeringdigest.journalApp.Entity.UserEntity;
import net.engineeringdigest.journalApp.Repository.UserRepository;
import net.engineeringdigest.journalApp.Util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

@Configuration
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	
	// Save user with hashed password
	public void saveUser(UserEntity user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		userRepository.save(user);
	}
	
	// Validate user details before saving
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
	
	// Authenticate user and generate JWT
	public String authenticateUser(String email, String password) {
		Optional<UserEntity> userOptional = Optional.ofNullable(userRepository.findByEmail(email));
		if (userOptional.isPresent()) {
			UserEntity user = userOptional.get();
			if (passwordEncoder.matches(password, user.getPassword())) {
				return JwtUtil.generateToken(user.getEmail());  // Generate JWT token
			}
		}
		return null; // Authentication failed
	}
}