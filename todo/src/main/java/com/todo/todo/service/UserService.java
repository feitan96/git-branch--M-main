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

    //READ - get user by id
    public Optional<User> getUserById(Integer id){
        return userRepository.findById(id);
    }

    //UPDATE - update user by id
    public User updateUser(Integer id, @Valid User updatedUser){
        try{
            return userRepository.findById(id)
                .map(existingUser -> {
                    if(!existingUser.getEmail().equals(updatedUser.getEmail()) &&
                        userRepository.existsByEmail(updatedUser.getEmail())) {
                        throw new RuntimeException("User with this email already exists: " + updatedUser.getEmail());
                    }

                    //update fields
                    existingUser.setName(updatedUser.getName());
                    existingUser.setEmail(updatedUser.getEmail());
                    existingUser.setPassword(updatedUser.getPassword());

                    return userRepository.save(existingUser);
                })
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        } catch (RuntimeException e){
            throw new RuntimeException("User not found with id: " + id);
        }
    }

    //DELETE - delete user by id

}
