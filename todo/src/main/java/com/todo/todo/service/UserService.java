package com.todo.todo.service;

import com.todo.todo.entity.User;
import com.todo.todo.repository.UserRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.stereotype.Service;
import jakarta.validation.Valid;

@Service
@Validated
public class UserService {

    @Autowired
    private UserRepository userRepository;

    //CREATE -  add new user
    public User createUser(@Valid User user){
        if(userRepository.existsByEmail(user.getEmail())){
            throw new RuntimeException("User with this email already exists: " + user.getEmail());
        }

        user.setId(null);
        return userRepository.save(user);
    }

    //READ - get all users
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }
}
