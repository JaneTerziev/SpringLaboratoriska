import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {WorkerstableComponent} from "../workerstable/workerstable.component";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private changeUserInfoURL = "http://localhost:8080/edit_user";
  private usersAPI = "http://localhost:8080/all_users";
  private currentUserURL = "http://localhost:8080/current_user";
  private changePasswordURL = "http://localhost:8080/change_password";
  private loginURL = "http://localhost:8080/login";
  private registerURL = "http://localhost:8080/sign_up";
  private resetPasswordURL = "http://localhost:8080/reset_password?email=";
  private getEmployeesURL = "http://localhost:8080/get_employees";
  private getEmployeesByDepartmentURL = "http://localhost:8080/get_department?department=";
  private editEmployeeURL = "http://localhost:8080/edit_employee";
  private addEmployeeURL = "http://localhost:8080/create_employee";
  private deleteEmployeeURL = "http://localhost:8080/delete_employee";
  private httpOptionToken={headers: new HttpHeaders({'Content-Type': 'application/json'})};
  private httpOptionJSON={headers:new HttpHeaders({"Content-Type":"application/json"})};

  constructor(private http:HttpClient) { }


  public async EditUser(data) {
    let result;
    await this.http.post(this.changeUserInfoURL, data, this.httpOptionToken).toPromise().catch().then(res=>{
      result=res;
    });
    return result;
  }
  public async Login(data)
  {
    let jsonData=JSON.stringify(data);
    let result=true;
    let token = await this.http.post(this.loginURL, jsonData, this.httpOptionJSON).toPromise().catch(res=>{
      result=false;
    });
    if(result)
    {
      this.httpOptionToken={headers:new HttpHeaders({"Authorization":"Bearer " + token["accessToken"],'Content-Type': 'application/json'})};
      if(data["checkbox"])
      {
        localStorage.setItem("Token",token["accessToken"]);
      }
    }
  return result;
  }
  public LoginWithToken()
  {
    if(localStorage.getItem("Token"))
    {
      this.httpOptionToken={headers:new HttpHeaders({"Authorization":"Bearer "+localStorage.getItem("Token"),'Content-Type': 'application/json'})};
      return true;
    }
    return false;
  }
  public async Register(data)
  {
    let result = await this.http.post(this.registerURL, data, this.httpOptionJSON).toPromise().catch(res=>
    {
      result=2;
    });
    return result;
  }
  public ChangePassword(data)
  {
    this.http.post(this.changePasswordURL,data,this.httpOptionToken).toPromise().catch();
  }
  public async ResetPassword(data) {
    let result= await this.http.get(this.resetPasswordURL + data).toPromise().catch();
    return result;
  }
  public async GetCurrentUser() {
    let user = await this.http.get(this.currentUserURL, this.httpOptionToken).toPromise().catch(res=>{
      return false;
    });
    return user;
  }
  public async GetEmployees()
  {
    return await this.http.get(this.getEmployeesURL, this.httpOptionToken).toPromise().catch().then();
  }
  public async GetEmployeesByDepartment(department)
  {
    return await this.http.get(this.getEmployeesByDepartmentURL+department,this.httpOptionToken).toPromise().catch().then();
  }

  public async EditEmployee(data) {
    data=JSON.stringify(data);
    await this.http.post(this.editEmployeeURL,data,this.httpOptionToken).toPromise().catch();
  }

  async AddEmployee(data) {

    await this.http.post(this.addEmployeeURL, data, this.httpOptionToken).toPromise().catch();
  }

  async DeleteEmployee(employeeId: any) {
    await this.http.post(this.deleteEmployeeURL,employeeId,this.httpOptionToken).toPromise().catch();
  }
}
