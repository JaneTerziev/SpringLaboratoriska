package com.testgradle.emt.Controllers;

import com.testgradle.emt.Model.EmailToken;
import com.testgradle.emt.Model.User;
import com.testgradle.emt.Repository.EmailTokenRepository;
import com.testgradle.emt.Services.EmailService;
import com.testgradle.emt.Services.Impl.TokenServiceImpl;
import com.testgradle.emt.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.*;

@CrossOrigin(origins = "*")
@RestController
public class UserController {
    @Autowired
    private TokenServiceImpl tokenService;
    private final UserService userServices;
    @Autowired
    private EmailService emailService;
    @Autowired
    public UserController(UserService userServices) {
        this.userServices = userServices;
    }
    @PostMapping("/sign_up")
    @ResponseStatus(HttpStatus.CREATED)
    public int AddUser(@RequestBody Map<String,String> body) {
        boolean username = userServices.existsByUsername(body.get("userName"));
        boolean email = userServices.existsByEmail(body.get("email"));
        if(username)
        {
            if(email)
            {
                return 2;
            }
            return 1;
        }
        else if(email)
        {
            return 3;
        }
        else
        {
            String verifyToken = UUID.randomUUID().toString();
            User model = new User();
            model.setEmail(body.get("email"));
            model.setPassword( body.get("password"));
            model.setUserName(body.get("userName"));
            model.setVerified(false);
            userServices.AddUser(model);
            tokenService.AddToken(model,verifyToken);
            emailService.sendSimpleMessage(body.get("email"),"Confirmation Mail",
                    "Welcome " + body.get("userName")+". Please click the following link to confirm your registration:" +
                            " http://localhost:8080/verify?token="+verifyToken);
            return 0;
        }
    }
    @GetMapping("/users")
    public Collection<User> getUsers()
    {
        return userServices.getAllUsers();
    }
    @PatchMapping("/user")
    public void editUser(@RequestBody Map<String,String> body) throws Exception {
        userServices.editUser(
                Integer.parseInt(body.get("id")),
                body.get("email"),
                body.get("password"),
                body.get("userName")
        );
    }
    @GetMapping("/user/{role}")
    public List<User> getUserByRole(@PathVariable("role") String role){
        return userServices.getUserByRole(role);
    }

    @RequestMapping("/verify")
    public void VerifyEmail(@RequestParam String token,HttpServletResponse httpServletResponse) throws IOException {
        User user =tokenService.findUserByToken(token);
        if(user!=null)
        {
            Calendar cal = Calendar.getInstance();
            EmailToken emailToken = tokenService.findToken(token);
            if(emailToken.getExpiryDate().getTime() - cal.getTime().getTime()<=0)
            {
                tokenService.deleteToken(token);
                userServices.deleteUser(user);
                httpServletResponse.sendRedirect("http://localhost:4200/expired");
            }
            else
            {
                userServices.setVerified(user);
                tokenService.deleteToken(token);
                httpServletResponse.sendRedirect("http://localhost:4200/login");
            }
        }
    }
    @PostMapping("/verifyemail")
    public boolean CheckEmailVerified(@RequestBody Map<String,String> body)
    {
        String username = body.get("userName");
        return userServices.checkVerifiedByEmail(username);
    }
    @RequestMapping("/passwordreset")
    public boolean ResetPassword(@RequestParam String email)
    {
        User user = userServices.findByEmail(email);
        if(user!=null)
        {
            String newpass = UUID.randomUUID().toString();
            emailService.sendSimpleMessage(email,"Password Recovery",
                    "Hello "+user.getUserName()+", Your new password is: "+newpass+" .Thank you for using our service!");
            user.setPassword(newpass);
            userServices.deleteUser(user);
            userServices.AddUser(user);
            return true;
        }
        return false;
    }
}