package br.com.appaluno.appaluno.repositories;

import br.com.appaluno.appaluno.models.Course;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends CrudRepository<Course, Integer> {
}
