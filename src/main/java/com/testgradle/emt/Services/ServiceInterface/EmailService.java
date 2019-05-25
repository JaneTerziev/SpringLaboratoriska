package com.testgradle.emt.Services.ServiceInterface;

import javax.mail.MessagingException;

public interface EmailService {
    void sendSimpleMessage(String to, String subject, String text);

}