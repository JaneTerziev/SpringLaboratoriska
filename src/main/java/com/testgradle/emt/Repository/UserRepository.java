package com.testgradle.emt.Repository;

import com.testgradle.emt.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User,Integer> {
    User findByUserName(String username);
    boolean existsByUserName(String username);
    User findByEmail(String email);
    boolean existsByEmail(String email);
    User findByUserNameOrEmail(String username,String email);
}