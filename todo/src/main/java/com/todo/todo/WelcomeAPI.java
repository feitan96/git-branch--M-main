package com.todo.todo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WelcomeAPI {

    @GetMapping("/welcome")
    public static String welcome(String name) {
        return "Welcome to the IT industry";
    }
}
