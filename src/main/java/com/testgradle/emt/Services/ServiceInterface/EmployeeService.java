package com.testgradle.emt.Services.ServiceInterface;

import com.testgradle.emt.Model.Employee;

import java.util.Collection;

public interface EmployeeService {
    Collection<Employee> getByDepartment(String department);
    void saveEmployee(Employee employee);
    void editEmployee(String fullname,int age, String department,float salary,int id) throws Exception;
    void deleteEmployee(int id) throws Exception;
    boolean alreadyExists(String fullname);
    Collection<Employee> getAllEmployees();
}