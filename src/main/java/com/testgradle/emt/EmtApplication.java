package com.testgradle.emt;

import com.testgradle.emt.Model.Role;
import com.testgradle.emt.Model.User;
import com.testgradle.emt.Repository.RolesRepository;
import com.testgradle.emt.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

@SpringBootApplication
public class EmtApplication implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private RolesRepository rolesRepository;

    public static void main(String[] args) {
        SpringApplication.run(EmtApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        User user = new User();
        user.setUserName("Admin");
        user.setEmail("janeterziev@gmail.com");
        user.setPassword(passwordEncoder.encode("admin"));
        Collection<Role> c=new ArrayList<>();
        Role s1 = new Role();
        s1.setRole("Admin");
        s1.setRoleId(1);
        c.add(s1);
        user.setRoles(c);
        user.setDepartment("Admin");
        user.setVerified(true);
        s1.setRoleId(1);
        s1.setRole("Admin");
        rolesRepository.save(s1);
        Collection<Role> c1=new ArrayList<>();
        Role s2 = new Role();
        s2.setRoleId(2);
        s2.setRole("User");
        rolesRepository.save(s2);
        Role s3 = new Role();
        s3.setRoleId(3);
        s3.setRole("Manager");
        c1.add(s3);
        rolesRepository.save(s3);
        userRepository.save(user);
        User user2=new User();
        user2.setUserName("Manager");
        user2.setEmail("smptjanetest@gmail.com");
        user2.setPassword(passwordEncoder.encode("manager"));
        user2.setRoles(c1);
        user2.setDepartment("Programer");
        user2.setVerified(true);
        user2.setRoles(c1);
        userRepository.save(user2);
    }
}
