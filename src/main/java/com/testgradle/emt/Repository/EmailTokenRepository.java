package com.testgradle.emt.Repository;

import com.testgradle.emt.Model.EmailToken;
import com.testgradle.emt.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface EmailTokenRepository extends JpaRepository<EmailToken,Integer> {
    EmailToken findByToken(String token);
}
