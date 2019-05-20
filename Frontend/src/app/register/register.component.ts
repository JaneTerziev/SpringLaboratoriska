import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AccountService} from "../services/Account.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  submitted = false;
  user : FormGroup;
  constructor(private http:HttpClient,private accountservice:AccountService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.user = this.formBuilder.group(
      {
        userName: ["", Validators.required],
        password : ["",Validators.required],
        email: ["",Validators.required]
      }
    )
  }
  get Form()
  {
    return this.user.controls;
  }
  get userAlreadyExistsError()
  {
    return this.accountservice.getUserAleradyExistsError;
  }
  get emailAlreadyExistsError()
  {
    return this.accountservice.getEmailAlreadyExistsError;
  }
  async Register()
  {
    this.submitted=true;
    if(this.user.invalid)
    {
      return;
    }
    var data  = {userName: this.user.get("userName").value,password : this.user.get("password").value,email:this.user.get("email").value};
    let userInformationJSON = JSON.stringify(data);
    await this.accountservice.Register(userInformationJSON);
    return;
  }
}
