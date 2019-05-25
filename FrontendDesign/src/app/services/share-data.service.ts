import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ApiService} from "./api.service";
@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
   private employeeSource = new BehaviorSubject<any>("");
  public editEmployee = this.employeeSource.asObservable();
  private allEmployeesSource = new BehaviorSubject<any>("");
  public allEmployees=this.allEmployeesSource.asObservable();

  constructor(private api:ApiService) { }
  async UpdateEmployees()
  {
    var employees = await this.api.GetEmployees();
    this.allEmployeesSource.next(employees);
  }
  async UpdateEmployeesByDeparment(deparment)
  {
    let employees = await this.api.GetEmployeesByDepartment(deparment);
    this.allEmployeesSource.next(employees);

  }
  UpdateEditEmployee(employee)
  {
    this.employeeSource.next(employee);
  }

}
