package br.com.appaluno.appaluno.repositories;

import br.com.appaluno.appaluno.models.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository  extends CrudRepository<User, Long> {

    Optional<User> findByEmailAndPassword(String email, String password);

}
