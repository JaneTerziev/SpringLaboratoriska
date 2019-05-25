import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {LoginService} from "./login.service";
import {ApiService} from "./api.service";
import {ErrorhandlingService} from "./errorhandling.service";
import {AppComponent} from "../app.component";
import {ShareDataService} from "./share-data.service";
import {PreloadDataService} from "../provider/preload-data.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private authentication:PreloadDataService,private dataService:ShareDataService,private http:HttpClient,private router:Router,private loginService:LoginService,private api:ApiService,private errorHandlingService:ErrorhandlingService) { }
  EditUser(data)
  {
    this.api.EditUser(data).then(res=>{
      this.authentication.setCurrentUser(res);
    });
  }
  async AddEmployee(data)
  {
   this.api.AddEmployee(data);
  }

  ChangePassword(data)
  {
    this.api.ChangePassword(data);
  }

  async ResetPassword(data)
  {
    let result = await this.api.ResetPassword(data);
    if(result)
    {
      this.errorHandlingService.emailDoesntExist=false;
    }
    else
      this.errorHandlingService.emailDoesntExist=true;
  }
  async EditEmployee(data) {
    this.api.EditEmployee(data);
  }

  DeleteEmployee(employeeId: any) {
    this.api.DeleteEmployee(employeeId);
  }
}
