package com.testgradle.emt.Services.Impl;
import com.testgradle.emt.Model.EmailToken;
import com.testgradle.emt.Model.User;
import com.testgradle.emt.Repository.EmailTokenRepository;
import com.testgradle.emt.Services.ServiceInterface.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.sql.Date;
import java.util.Calendar;
import java.util.Collection;
import java.util.stream.Collectors;


@Service
public class TokenServiceImpl implements TokenService {

    @Autowired
    private EmailTokenRepository emailTokenRepository;
    @Override
    public void AddToken(User user, String token)
    {
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.DATE,1);
        Date date = new Date(cal.getTime().getTime());
        EmailToken emailToken = new EmailToken();
        emailToken.setUser(user);
        emailToken.setToken(token);
        emailToken.setExpiryDate(date);
        emailTokenRepository.save(emailToken);
    }
    @Override
    public User findUserByToken(String token)
    {
        EmailToken tokenuser = emailTokenRepository.findByToken(token);
        return tokenuser.getUser();
    }
    @Override
    public void deleteToken(String token)
    {
        EmailToken model = this.emailTokenRepository.findByToken(token);
        this.emailTokenRepository.delete(model);
    }
    @Override
    public EmailToken findToken(String token)
    {
        return emailTokenRepository.findByToken(token);
    }
    @Override
    public Collection<EmailToken> getAllTokens()
    {
        return emailTokenRepository.findAll().stream().collect(Collectors.toList());
    }
}
