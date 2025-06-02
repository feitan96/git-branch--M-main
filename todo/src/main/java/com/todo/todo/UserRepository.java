package com.todo.todo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    
    // Method to find the first user (you can order by id or any other field)
    @Query("SELECT u FROM User u ORDER BY u.id LIMIT 1")
    User findFirstUser();
}   