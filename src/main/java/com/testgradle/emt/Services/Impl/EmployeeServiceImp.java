package com.testgradle.emt.Services.Impl;

import com.testgradle.emt.Model.Employee;
import com.testgradle.emt.Repository.EmployeeRepository;
import com.testgradle.emt.Services.ServiceInterface.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class EmployeeServiceImp implements EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public Collection<Employee> getByDepartment(String department) {
        return this.employeeRepository.findByEmployeeDepartment(department);
    }

    @Override
    public void saveEmployee(Employee employee) {
        this.employeeRepository.save(employee);
    }

    @Override
    public void editEmployee(String fullname,int age, String department,float salary,int id) throws Exception {
        Employee employee = this.employeeRepository.findById(id).orElseThrow(Exception::new);
        employee.setEmployeeAge(age);
        employee.setEmployeeDepartment(department);
        employee.setEmployeeName(fullname);
        employee.setEmployeeSalary(salary);
        this.employeeRepository.save(employee);
    }

    @Override
    public void deleteEmployee(int id) throws Exception {
        Employee employee = employeeRepository.findById(id).orElseThrow(Exception::new);
        this.employeeRepository.delete(employee);
    }

    @Override
    public boolean alreadyExists(String fullname) {
        return this.employeeRepository.existsByEmployeeName(fullname);
    }

    @Override
    public Collection<Employee> getAllEmployees() {
        return this.employeeRepository.findAll();
    }
}
