package com.testgradle.emt.Services.ServiceInterface;


import com.testgradle.emt.Model.User;

import java.util.Collection;
import java.util.List;

public interface UserService {
    void AddUser(User user) throws Exception;
    Collection<User> getAllUsers();
    void editUser(String userName, String email, int id) throws Exception;
    boolean existsByUsername(String userName);
    boolean existsByEmail(String email);
    void setVerified(User user);
    boolean checkVerifiedByEmail(String username);
    User findByEmail(String email);
    void deleteUser(User user);
}