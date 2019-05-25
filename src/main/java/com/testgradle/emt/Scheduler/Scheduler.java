package com.testgradle.emt.Scheduler;

import com.testgradle.emt.Model.EmailToken;
import com.testgradle.emt.Services.ServiceInterface.TokenService;
import com.testgradle.emt.Services.ServiceInterface.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import java.util.Calendar;
import java.util.Collection;

@Configuration
@EnableScheduling
public class Scheduler {
    @Autowired
    private UserService userService;
    @Autowired
    private TokenService tokenService;

    @Scheduled(fixedDelay = 60000*24)
    private void deleteNonVerifiedUsers()
    {
        System.out.println("SCHEDULER ACTIVATED");
        Calendar cal = Calendar.getInstance();
        Collection<EmailToken> tokens = tokenService.getAllTokens();
        for (EmailToken token:tokens) {
            System.out.println("TOKEN TIME: " + token.getExpiryDate());
            System.out.println("CURRENT TIME: "+cal.getTime());
            System.out.println("TOKEN TIME: " + token.getExpiryDate().getTime());
            System.out.println("CURRENT TIME: "+cal.getTime().getTime());
            if(token.getExpiryDate().getTime() - cal.getTime().getTime()<=0)
            {
                System.out.println("DELETING " + token.getUser().getUserName());
                tokenService.deleteToken(token.getToken());
                userService.deleteUser(token.getUser());
            }
        }
    }
}
