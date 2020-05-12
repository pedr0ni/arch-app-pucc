package br.com.appaluno.appaluno.controllers;

import br.com.appaluno.appaluno.models.User;
import br.com.appaluno.appaluno.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("")
    public Iterable<User> get() {
        return userRepository.findAll();
    }

}
