package com.testgradle.emt.Services;

import com.testgradle.emt.Model.User;
import com.testgradle.emt.Repository.UserRepository;
import com.testgradle.emt.Services.Security.UserPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUserName(username);
        return UserPrincipal.create(user);
    }
    @Transactional
    public UserDetails loadUserById(int id) throws Exception {
        User user = userRepository.findById(id).orElseThrow(
                Exception::new
        );
        return UserPrincipal.create(user);
    }
}