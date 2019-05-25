import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {LoginService} from "../services/login.service";
import {ErrorhandlingService} from "../services/errorhandling.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  submitted = false;
  activateValidators=false;
  user : FormGroup;
  loading = false;
  constructor(private http:HttpClient, private loginService:LoginService, private formBuilder: FormBuilder, private errorHandlingService:ErrorhandlingService) { }

  ngOnInit() {
    this.user = this.formBuilder.group(
      {
        userName: ["", Validators.required],
        password : ["",Validators.required],
        email: ["",Validators.required],
        department:["",Validators.required]
      }
    )
  }
  get Form()
  {
    return this.user.controls;
  }
  async Register()
  {
    this.submitted=true;
    if(this.user.invalid)
    {
      this.loading=false;
      this.submitted=false;
      this.activateValidators=true;
      return;
    }
    this.loading=true;
    let data  = JSON.stringify({userName: this.user.get("userName").value,password :
      this.user.get("password").value,email:this.user.get("email").value,department:this.user.get("department").value});
    await this.loginService.Register(data);
    this.loading=false;
    this.submitted=false;
    return;
  }
}
