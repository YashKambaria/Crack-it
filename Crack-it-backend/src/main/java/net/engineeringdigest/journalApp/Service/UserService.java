package net.engineeringdigest.journalApp.Service;


import net.engineeringdigest.journalApp.Entity.UserEntity;
import net.engineeringdigest.journalApp.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	
	public void saveEntry(UserEntity user) {
		userRepository.save(user);
	}
}
