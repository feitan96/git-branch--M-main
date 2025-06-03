package com.todo.todo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todo.todo.entity.User;
import com.todo.todo.repository.UserRepository;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class WelcomeAPI {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/welcome")
    public String welcome() {
        try {
            User firstUser = userRepository.findFirstUser();
            if (firstUser != null) {
                return "Welcome, " + firstUser.getName() + "!";
            } else {
                return "Welcome, guest!";
            }
        }
        catch(Exception e)
        {
            return "Welcome, guest!";
        }
    }
}
