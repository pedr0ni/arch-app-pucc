package br.com.appaluno.appaluno.controllers;

import br.com.appaluno.appaluno.models.Materia;
import br.com.appaluno.appaluno.repositories.MateriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/materia")
public class MateriaController {

    @Autowired
    private MateriaRepository materiaRepository;

    @GetMapping("")
    public Iterable<Materia> get() {
        return materiaRepository.findAll();
    }

    @PostMapping("")
    public Materia post(@RequestBody Map<String, Object> body) {
        Materia materia = new Materia();
        materia.setCreated(new Date());
        materia.setUpdated(new Date());
        materia.setName((String) body.get("name"));
        materia = materiaRepository.save(materia);
        return materia;
    }

    @PutMapping("")
    public Optional<Materia> put(@RequestBody Map<String, Object> body) {
        Optional<Materia> materia = materiaRepository.findById(new Long((Integer) body.get("materiaId")));
        if (materia.isPresent()) {
            materia.get().setName((String) body.get("name"));
            materia.get().setUpdated(new Date());
            materiaRepository.save(materia.get());
            return materia;
        }
        return null;
    }

}
