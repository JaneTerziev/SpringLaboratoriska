package com.testgradle.emt.Controllers;

import com.testgradle.emt.Model.EmailToken;
import com.testgradle.emt.Model.User;
import com.testgradle.emt.Services.Impl.TokenServiceImpl;
import com.testgradle.emt.Services.ServiceInterface.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Calendar;
import java.util.Map;

@RestController

@CrossOrigin(origins = "*")
public class VerificationController {
    @Autowired
    private TokenServiceImpl tokenService;
    @Autowired
    private UserService userServices;

    @RequestMapping("/verify")
    public void VerifyEmail(@RequestParam String token, HttpServletResponse httpServletResponse) throws IOException {
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
    @PostMapping("/check_verified")
    public boolean CheckEmailVerified(@RequestBody Map<String,String> body)
    {
        String username = body.get("userName");
        return userServices.checkVerifiedByEmail(username);
    }

}
