package br.com.appaluno.appaluno.controllers;

import br.com.appaluno.appaluno.models.Course;
import br.com.appaluno.appaluno.repositories.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/course")
public class CourseController {

    @Autowired
    private CourseRepository courseRepository;

    @GetMapping("")
    public Iterable<Course> get() {
        return courseRepository.findAll();
    }

    @PostMapping("")
    public Course post(@RequestBody Map<String, String> body) {
        Course course = new Course();

        course.setCreated(new Date());
        course.setUpdated(new Date());
        course.setName(body.get("name"));
        course = courseRepository.save(course);

        return course;
    }

    @DeleteMapping("")
    public void delete(@RequestBody Map<String, Long> body) {
        Optional<Course> course = courseRepository.findById(body.get("courseId"));

        if (course.isPresent()) {
            courseRepository.delete(course.get());
        }
    }

    @PutMapping("")
    public Optional<Course> put(@RequestBody Map<String, Object> body) {
        Optional<Course> course = courseRepository.findById(new Long((Integer) body.get("courseId")));

        if (course.isPresent()) {
            course.get().setName((String) body.get("name"));
            course.get().setUpdated(new Date());
            courseRepository.save(course.get());
            return course;
        }
        return null;
    }

    @GetMapping("/setup")
    public Course setupCourses() {
        Course course = new Course();
        course.setName("Sistemas de Informação");
        course.setCreated(new Date());
        course.setUpdated(new Date());

        course = courseRepository.save(course);

        return course;
    }

}
