package com.testgradle.emt.Repository;

import com.testgradle.emt.Model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RolesRepository extends JpaRepository<Role,Integer> {
    Role findByRole(String role);
}