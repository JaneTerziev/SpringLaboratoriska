package com.testgradle.emt.Services;

import com.testgradle.emt.Model.EmailToken;
import com.testgradle.emt.Model.User;

import java.util.Collection;

public interface TokenService {
    void AddToken(User user, String token);
    User findUserByToken(String token);
    void deleteToken(String token);
    EmailToken findToken(String token);
    Collection<EmailToken> getAllTokens();
}
