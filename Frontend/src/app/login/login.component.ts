import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AccountService} from "../services/Account.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user : FormGroup;
  private credentialsErrorValue;
  private submit;
  constructor(private http:HttpClient,private accountservice:AccountService,private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.user = this.formBuilder.group(
      {
        userName: ["", Validators.required],
        password : ["",Validators.required]
      }
    )
  }

  get emailError()
  {
    return this.accountservice.getEmailVerifiedError;
  }
  get credentialError()
  {
    return this.credentialsErrorValue;
  }
  get Form()
  {
    return this.user.controls;
  }
   async Login()
  {
    this.submit=true;
    if(this.user.invalid)
    {
      return;
    }
    else
    {
      var data  = {userName: this.user.get("userName").value,password : this.user.get("password").value};
      var userInformationJSON = JSON.stringify(data);
      await this.accountservice.Login(userInformationJSON).catch(res=>{});
      this.credentialsErrorValue=this.accountservice.getCredentialsError;
    }
    this.submit=false;
    return;
  }
}
