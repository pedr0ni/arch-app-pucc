package br.com.appaluno.appaluno.controllers;

import br.com.appaluno.appaluno.models.Course;
import br.com.appaluno.appaluno.repositories.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/course")
public class CourseController {

    @Autowired
    private CourseRepository courseRepository;

    @GetMapping("")
    public Iterable<Course> get() {
        return courseRepository.findAll();
    }

}
