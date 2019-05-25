import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {ErrorhandlingService} from "./errorhandling.service";
import {ApiService} from "./api.service";
import {ShareDataService} from "./share-data.service";
import {Observable} from "rxjs";
import {WorkerstableComponent} from "../workerstable/workerstable.component";
import {PreloadDataService} from "../provider/preload-data.service";


@Injectable({
  providedIn: 'root'
})

export class LoginService {
  constructor(private authentication:PreloadDataService,private router: Router, private errorHandlingService:ErrorhandlingService, private api:ApiService,private sharedData:ShareDataService){}
  public async Register(data) {
    let result = await this.api.Register(data);
    if(result==1)
    {
      this.errorHandlingService.setUserAlreadyExistsError();
    }
    else if(result==2)
    {
      this.errorHandlingService.setUserAndEmailAlreadyExist();
    }
    else if(result==3)
    {
      this.errorHandlingService.setEmailAlreadyExistsError();
    }
    else
      this.router.navigate(["/login"]);

  }
  public async Login(data)
  {
    let credentials = await this.api.Login(data);
    if(credentials)
    {
      this.errorHandlingService.credentialsError=false;
      let user = await this.api.GetCurrentUser();
      if(user["verified"])
      {
        this.errorHandlingService.emailVerifiedError=false;
        this.authentication.setAuthenticated(true);
        this.authentication.setCurrentUser(user);
        this.router.navigate(["workerstable"]);
      }
      else
        this.errorHandlingService.emailVerifiedError=true;
    }
    else
      this.errorHandlingService.credentialsError=true;
  }
  public LogoutUser()
  {
    this.authentication.setCurrentUser(null);
    localStorage.removeItem("Token");
    this.authentication.setAuthenticated(false);
    this.router.navigate(["/login"]);
  }
}
