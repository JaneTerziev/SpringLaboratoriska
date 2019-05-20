package com.testgradle.emt.Repository;

import com.testgradle.emt.Model.Role;
import com.testgradle.emt.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface UserRepository extends JpaRepository<User,Integer> {
    User findByUserName(String username);
    List<User> findByRoles(Collection<Role> roles);
    boolean existsByUserName(String username);
    User findByEmail(String email);
    boolean existsByEmail(String email);
}