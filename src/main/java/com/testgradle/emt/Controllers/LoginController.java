package com.testgradle.emt.Controllers;

import com.testgradle.emt.Model.User;
import com.testgradle.emt.Payload.JwtAuthenticationResponse;
import com.testgradle.emt.Services.ServiceInterface.EmailService;
import com.testgradle.emt.Services.Impl.TokenServiceImpl;
import com.testgradle.emt.Services.Security.JwtTokenProvider;
import com.testgradle.emt.Services.ServiceInterface.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "*")
public class LoginController {
    @Autowired
    private TokenServiceImpl tokenService;
    @Autowired
    private UserService userServices;
    @Autowired
    private EmailService emailService;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @PostMapping("/sign_up")
    @ResponseStatus(HttpStatus.CREATED)
    public int Register(@RequestBody Map<String,String> body) throws Exception {
        if(userServices.existsByUsername(body.get("userName")))
        {
            if(userServices.existsByEmail(body.get("email")))
            {
                return 2;
            }
            return 1;
        }
        else if(userServices.existsByEmail(body.get("email")))
        {
            return 3;
        }
        else
        {
            String verifyToken = UUID.randomUUID().toString();
            try{
                emailService.sendSimpleMessage(body.get("email"),"Confirmation Mail",
                        "Welcome " + body.get("userName")+". Please click the following link to confirm your registration:" +
                                " http://localhost:8080/verify?token="+verifyToken);
            }
            catch (Exception m)
            {
                return 2;
            }
            User model = new User();
            model.setEmail(body.get("email"));
            model.setPassword( body.get("password"));
            model.setUserName(body.get("userName"));
            model.setVerified(false);
            model.setDepartment(body.get("department"));
            userServices.AddUser(model);
            tokenService.AddToken(model,verifyToken);
            return 0;
        }
    }
    @PostMapping("/login")
    public ResponseEntity<?> LoginUser(@RequestBody Map<String,String> body){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        body.get("userName"),
                        body.get("password")
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtTokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }
}
