package com.testgradle.emt.Controllers;

import com.testgradle.emt.Model.User;
import com.testgradle.emt.Repository.UserRepository;
import com.testgradle.emt.Services.ServiceInterface.CustomUserDetailsService;
import com.testgradle.emt.Services.ServiceInterface.EmailService;
import com.testgradle.emt.Services.Security.JwtTokenProvider;
import com.testgradle.emt.Services.Security.UserPrincipal;
import com.testgradle.emt.Services.ServiceInterface.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@CrossOrigin(origins = "*")
@RestController
public class UserController {
    @Autowired
    private  UserService userServices;
    @Autowired
    private EmailService emailService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    JwtTokenProvider jwtTokenProvider;
    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @GetMapping("/all_users")
    @PreAuthorize("hasRole('User')")
    public Collection<User> getUsers()
    {
        return userServices.getAllUsers();
    }

    @RequestMapping("/current_user")
    public UserPrincipal GetCurrentUser(HttpServletRequest request) throws Exception {
        String token = request.getHeader("Authorization").substring(7);
        int id = jwtTokenProvider.getUserIdFromJWT(token);
        return (UserPrincipal) customUserDetailsService.loadUserById(id);
    }
    @PostMapping("/edit_user")
    public UserPrincipal EditUser(@RequestBody Map<String,String> body, HttpServletRequest request) throws Exception {
        userServices.editUser(
                body.get("userName"),
                body.get("email"),
                Integer.parseInt(body.get("id"))
        );
        return GetCurrentUser(request);
    }

    @RequestMapping("/reset_password")
    public boolean ResetPassword(@RequestParam String email)
    {
        User user = userServices.findByEmail(email);
        if(user!=null)
        {
            String newpass = UUID.randomUUID().toString();
            emailService.sendSimpleMessage(email,"Password Recovery",
                    "Hello "+user.getUserName()+", Your new password is: "+newpass+" .Thank you for using our service!");
            String p = passwordEncoder.encode(newpass);
            user.setPassword(p);
            userRepository.save(user);
            return true;
        }
        return false;
    }
    @PostMapping("/change_password")
    public void ChangePassword(@RequestBody Map<String,String> body) throws Exception {
        User user = userRepository.findById(Integer.parseInt(body.get("id"))).orElseThrow(Exception::new);
        String p = passwordEncoder.encode(body.get("password"));
        user.setPassword(p);
        userRepository.save(user);
    }
}