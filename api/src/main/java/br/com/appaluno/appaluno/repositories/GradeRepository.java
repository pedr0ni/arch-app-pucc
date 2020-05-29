package br.com.appaluno.appaluno.repositories;

import br.com.appaluno.appaluno.models.Grade;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GradeRepository extends CrudRepository<Grade, Long> {

    Iterable<Grade> findByUserUserId(long userId);

}
