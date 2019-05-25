package com.testgradle.emt.Controllers;

import com.testgradle.emt.Model.Employee;
import com.testgradle.emt.Services.ServiceInterface.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;


    @PostMapping("/create_employee")
    @PreAuthorize("hasRole('Admin') or hasRole('Manager')")
    public boolean CreateEmployee(@RequestBody Map<String,String> data)
    {
        if(employeeService.alreadyExists(data.get("fullname")))
        {
            return false;
        }
        else
        {
            Employee employee = new Employee();
            employee.setEmployeeAge(Integer.parseInt(data.get("age")));
            employee.setEmployeeSalary(Float.parseFloat(data.get("salary")));
            employee.setEmployeeName(data.get("fullname"));
            employee.setEmployeeDepartment(data.get("department"));
            employeeService.saveEmployee(employee);
            return true;
        }
    }
    @GetMapping("/get_department")
    @PreAuthorize("hasRole('Manager')")
    public Collection<Employee> GetEmployeesByDepartment(@RequestParam String department)
    {
        return employeeService.getByDepartment(department);
    }
    @GetMapping("/get_employees")
    @PreAuthorize("hasRole('Admin')")
    public Collection<Employee> GetAllEmployees()
    {
        return employeeService.getAllEmployees();
    }
    @PostMapping("/edit_employee")
    @PreAuthorize("hasRole('Admin') or hasRole('Manager')")
    public void EditEmployee(@RequestBody Map<String,String> data) throws Exception {
        employeeService.editEmployee(data.get("fullname"),Integer.parseInt(data.get("age")),data.get("department"),Float.parseFloat(data.get("salary")),Integer.parseInt(data.get("id")));
    }
    @PostMapping("/delete_employee")
    @PreAuthorize("hasRole('Admin') or hasRole('Manager')")
    public void DeleteEmployee(@RequestBody Map<String,String> data) throws Exception {
        employeeService.deleteEmployee(Integer.parseInt(data.get("id")));
    }
}
