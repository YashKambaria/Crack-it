package net.engineeringdigest.journalApp.Repository;

import net.engineeringdigest.journalApp.Entity.UserEntity;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<UserEntity, ObjectId> {
	boolean existsByUsername(String username);
	boolean existsByEmail(String email);
	boolean existsByPhone(String phone);
}
