import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";
import {Observable} from "rxjs";
import {LoginComponent} from "../login/login.component";
import {RegisterComponent} from "../register/register.component";


@Injectable({
  providedIn: 'root'
})

export class AccountService {
  private loginURL = "http://localhost:8080/login";
  private registerURL = "http://localhost:8080/sign_up";
  private currentUserURL = "http://localhost:8080/current_user";
  private resetPasswordURL = "http://localhost:8080/passwordreset?email=";
  private httpOptionJSON = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private httpOptionToken;
  private emailAlreadyExists=false;
  private authenticated=false;
  private userAlreadyExistsError=false;
  private emailVerifiedError;
  private credentialsError;
  private user;
  private passwordReset;
  constructor(private _http: HttpClient, private router: Router) {
  }
  async Login(loginInformation) {
    let user = await this._http.post<any>(this.loginURL, loginInformation, this.httpOptionJSON).toPromise().catch(res=>{
      console.log("Login Failed!");
    });
    if(user)
    {
      this.credentialsError=false;
      this.httpOptionToken = {headers: new HttpHeaders().set("Authorization", "Bearer " + user["accessToken"])};
      this.CheckEmailVerified();
    }
    else
    {
      this.emailVerifiedError=false;
      this.credentialsError=true;
    }
  }
  Logout()
  {
    this.httpOptionToken="";
    this.authenticated=false;
    this.router.navigate(["/login"]);
  }
  CheckEmailVerified()
  {
    this._http.post(this.currentUserURL,{},this.httpOptionToken).subscribe(user=>{
      if(user["verified"])
      {
        this.authenticated=true;
        this.router.navigate(["/workerstable"])
      }
      else
        this.emailVerifiedError=true;

      this.user=user;
    });
  }
  async Register(registerInformation) {
    let bool = await this._http.post(this.registerURL, registerInformation, this.httpOptionJSON).toPromise().catch();
     if(bool==1)
     {
       this.emailAlreadyExists=false;
       this.userAlreadyExistsError=true;
     }
     else if(bool==2)
     {
       this.userAlreadyExistsError=true;
       this.emailAlreadyExists=true;

     }
     else if(bool==3)
     {
       this.userAlreadyExistsError=false;
       this.emailAlreadyExists=true;
     }
     else
     {
       this.router.navigate(["/login"]);
     }
  }
  async ResetPassword(email)
  {
    this.resetPasswordURL=this.resetPasswordURL+email;
    await this._http.get<any>(this.resetPasswordURL).subscribe(r=>{
      this.passwordReset=r;
    });
  }

  get getEmailAlreadyExistsError()
  {
    return this.emailAlreadyExists;
  }
  get getPasswordReset()
  {
    return this.passwordReset;
  }
  get getCurrentUserName()
  {
    if(this.authenticated)
    {
      return this.user["username"];
    }
  }
  get getAuthenticated()
  {
    return this.authenticated;
  }
  get JWT()
  {
    return this.httpOptionToken;
  }

  get getUserAleradyExistsError()
  {
    return this.userAlreadyExistsError;
  }
  get getEmailVerifiedError()
  {
    return this.emailVerifiedError;
  }
  get getCredentialsError()
  {
    return this.credentialsError;
  }
}
