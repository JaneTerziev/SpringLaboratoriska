package com.testgradle.emt.Controllers;

import com.testgradle.emt.Payload.JwtAuthenticationResponse;
import com.testgradle.emt.Repository.UserRepository;
import com.testgradle.emt.Services.CustomUserDetailsService;
import com.testgradle.emt.Services.Security.JwtTokenProvider;
import com.testgradle.emt.Services.Security.UserPrincipal;
import com.testgradle.emt.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@CrossOrigin("*")
@RestController
public class AuthController {

    private final CustomUserDetailsService customUserDetailsService;

    private final UserService userServices;
    private final UserRepository userRepository;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    public AuthController(CustomUserDetailsService customUserDetailsService, UserService userServices, UserRepository userRepository) {
        this.customUserDetailsService = customUserDetailsService;
        this.userServices = userServices;
        this.userRepository = userRepository;
    }

    @RequestMapping("/current_user")
    public UserPrincipal GetCurrentUser(HttpServletRequest request) throws Exception {
        String token = request.getHeader("Authorization").substring(7);
        int id = jwtTokenProvider.getUserIdFromJWT(token);
        UserPrincipal user = (UserPrincipal) customUserDetailsService.loadUserById(id);
        return user;
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