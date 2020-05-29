package br.com.appaluno.appaluno.repositories;

import br.com.appaluno.appaluno.models.Materia;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MateriaRepository extends CrudRepository<Materia, Long> {
}
