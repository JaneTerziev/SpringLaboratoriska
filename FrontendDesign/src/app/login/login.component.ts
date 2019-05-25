import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginService} from "../services/login.service";
import {ErrorhandlingService} from "../services/errorhandling.service";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {ShareDataService} from "../services/share-data.service";
import {PreloadDataService} from "../provider/preload-data.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private formData : FormGroup;
  private submit;
  constructor(private authentication:PreloadDataService,private http:HttpClient,private loginService:LoginService,private formBuilder: FormBuilder,private errorHandlingService:ErrorhandlingService, private userService:UserService,private router:Router,private dataService:ShareDataService) { }
  ngOnInit() {
    if(this.authentication.getAuthentication())
    {
      this.router.navigate(["/workerstable"]);
    }
    this.formData = this.formBuilder.group(
      {
        userName: ["", Validators.required],
        password : ["",Validators.required],
        checkbox: true
      });
  }
  get Form()
  {
    return this.formData.controls;
  }
   async Login()
  {
    this.submit=true;
    if(this.formData.invalid)
    {
      return;
    }
      let data  = {userName: this.formData.get("userName").value,password
          : this.formData.get("password").value,checkbox:this.formData.get("checkbox").value};
      await this.loginService.Login(data).catch(res=>{});
      this.submit=false;
      return;
  }

}
