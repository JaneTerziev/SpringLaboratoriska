package com.testgradle.emt.Repository;

import com.testgradle.emt.Model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface EmployeeRepository extends JpaRepository<Employee,Integer> {
    Collection<Employee> findByEmployeeDepartment(String department);
    boolean existsByEmployeeName(String fullname);
}
