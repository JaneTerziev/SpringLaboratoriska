package com.testgradle.emt.Services.Impl;
import com.testgradle.emt.Model.Role;
import com.testgradle.emt.Model.User;
import com.testgradle.emt.Repository.RolesRepository;
import com.testgradle.emt.Repository.UserRepository;
import com.testgradle.emt.Services.ServiceInterface.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RolesRepository rolesRepository;


    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository repository, RolesRepository rolesRepository) {
        this.userRepository = repository;
        this.rolesRepository = rolesRepository;
    }

    @Override
    public void AddUser(User user){
        String p = passwordEncoder.encode(user.getPassword());
        user.setPassword(p);
        user.setRoles(Arrays.asList(rolesRepository.findByRole("User")));
        userRepository.save(user);
    }
    @Override
    public Collection<User> getAllUsers(){
        return userRepository.findAll().stream().collect(Collectors.toList());
    }

    @Override
    public void editUser(String userName, String email, int id) throws Exception {
        User us = userRepository.findById(id).orElseThrow(Exception::new);
        us.setEmail(email);
        us.setUserName(userName);
        userRepository.save(us);
    }
    @Override
    public boolean existsByUsername(String userName){
        return userRepository.existsByUserName(userName);

    }
    @Override
    public boolean existsByEmail(String email){
        return userRepository.existsByEmail(email);

    }
    @Override
    public void setVerified(User user)
    {
        user.setVerified(true);
        userRepository.save(user);
    }
    @Override
    public boolean checkVerifiedByEmail(String username)
    {
       User user = userRepository.findByUserName(username);
       if(user!=null)
       {
            return user.getVerified();
       }
       return false;
    }
    @Override
    public User findByEmail(String email)
    {
        return userRepository.findByEmail(email);
    }
    @Override
    public void deleteUser(User user)
    {
        userRepository.delete(user);
    }
}