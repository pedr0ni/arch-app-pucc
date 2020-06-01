package br.com.appaluno.appaluno.controllers;

import br.com.appaluno.appaluno.models.Grade;
import br.com.appaluno.appaluno.models.Materia;
import br.com.appaluno.appaluno.models.User;
import br.com.appaluno.appaluno.repositories.GradeRepository;
import br.com.appaluno.appaluno.repositories.MateriaRepository;
import br.com.appaluno.appaluno.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/grade")
public class GradeController {

    @Autowired
    private GradeRepository gradeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MateriaRepository materiaRepository;

    @GetMapping("")
    public Iterable<Grade> get() {
        return gradeRepository.findAll();
    }

    @PostMapping("aluno")
    public Iterable<Grade> postByAluno(@RequestBody Optional<Map<String, Integer>> body) {
        if (body.isPresent() && body.get().get("userId") != null && body.get().get("userId") != 0) {
            return gradeRepository.findByUserUserId(new Long(body.get().get("userId")));
        }
        return null;
    }

    @PostMapping("")
    public Grade post(@RequestBody Map<String, Object> body) {
        Grade grade = new Grade();

        Optional<User> user = userRepository.findById(new Long((String) body.get("userId")));
        Optional<Materia> materia = materiaRepository.findById(new Long((String) body.get("materiaId")));

        if (user.isPresent() && materia.isPresent()) {
            grade.setUser(user.get());
            grade.setMateria(materia.get());
        }

        grade.setHorario((String) body.get("horario"));
        grade.setFrequencia(Integer.parseInt((String) body.get("frequencia")));
        grade.setSemana(Integer.parseInt((String) body.get("semana")));
        grade.setSala((String) body.get("sala"));

        grade.setUpdated(new Date());
        grade.setCreated(new Date());

        grade = gradeRepository.save(grade);

        return grade;
    }

    @PutMapping("")
    public Optional<Grade> put(@RequestBody Map<String, Object> body) {
        Optional<Grade> grade = gradeRepository.findById(new Long((Integer) body.get("gradeId")));

        if (grade.isPresent()) {
            grade.get().setFrequencia(Integer.parseInt(body.get("frequencia").toString()));
            grade.get().setHorario((String) body.get("horario"));

            Optional<User> user = userRepository.findById(new Long((Integer) body.get("userId")));
            Optional<Materia> materia = materiaRepository.findById(new Long((Integer) body.get("userId")));

            if (user.isPresent()) grade.get().setUser(user.get());
            if (materia.isPresent()) grade.get().setMateria(materia.get());

            gradeRepository.save(grade.get());

            return grade;
        }
        return null;
    }

}
