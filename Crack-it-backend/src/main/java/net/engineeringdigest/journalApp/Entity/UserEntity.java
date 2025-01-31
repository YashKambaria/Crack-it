package net.engineeringdigest.journalApp.Entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class UserEntity {
	@Id
	private ObjectId id;
	@NotBlank(message = "Username cannot be null or blank")
	private String username;
	private String phone;
	private String email;
	@NotBlank(message = "Password cannot be null or blank")
	private String password;
	
}
