package com.testgradle.emt.Services;


import com.testgradle.emt.Model.User;

import java.util.Collection;
import java.util.List;

public interface UserService {
    void AddUser(User user);
    Collection<User> getAllUsers();
    List<User> getUserByRole(String role);
    void editUser(int id, String email, String password, String userName) throws Exception;
    boolean existsByUsername(String userName);
    boolean existsByEmail(String email);
    User findByUsername(String username);
    int findUserId(User user);
    void setVerified(User user);
    boolean checkVerifiedByEmail(String username);
    User findByEmail(String email);
    void deleteUser(User user);
}