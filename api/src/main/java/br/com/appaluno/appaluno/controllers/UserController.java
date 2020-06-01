package br.com.appaluno.appaluno.controllers;

import br.com.appaluno.appaluno.models.Course;
import br.com.appaluno.appaluno.models.User;
import br.com.appaluno.appaluno.repositories.CourseRepository;
import br.com.appaluno.appaluno.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    @GetMapping("")
    public Iterable<User> get() {
        return userRepository.findAll();
    }

    @PostMapping("/authenticate")
    public Optional<User> authenticate(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");
        Optional<User> toLogin = userRepository.findByEmailAndPassword(email, password);
        if (!toLogin.isPresent()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Email ou senha incorreto(s)...");
        }
        return toLogin;
    }

    @PostMapping("")
    public User post(@RequestBody Map<String, Object> body) {
        User user = new User();
        Optional<Course> course = courseRepository.findById(new Long((String) body.get("courseId")));
        if (course.isPresent()) {
            user.setCourse(course.get());
        }
        user.setName((String) body.get("name"));
        user.setEmail((String) body.get("email"));
        user.setPassword((String) body.get("password"));
        user.setType(1);
        user.setCreated(new Date());
        user.setUpdated(new Date());
        user = userRepository.save(user);
        return user;
    }

    @GetMapping("/setup")
    public User setupUsers() {
        Optional<Course> sistemas = courseRepository.findById(1L);
        if (sistemas.isPresent()) {
            User aluno = new User();
            aluno.setCourse(sistemas.get());
            aluno.setName("Matheus Pedroni");
            aluno.setCreated(new Date());
            aluno.setUpdated(new Date());
            aluno.setPassword("123");
            aluno.setType(1);
            aluno.setEmail("pedroni.dev@gmail.com");
            aluno.setLastLogin(new Date());

            aluno = userRepository.save(aluno);
            return aluno;
        }
        return null;
    }

}
