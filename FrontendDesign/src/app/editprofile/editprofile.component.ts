import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginService} from "../services/login.service";
import {UserData} from "../models/UserData";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {ShareDataService} from "../services/share-data.service";
import {PreloadDataService} from "../provider/preload-data.service";

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {
  submitted=false;
  user;
  formData: FormGroup;
  constructor(private authentication:PreloadDataService,private _http:HttpClient, private loginService:LoginService, private formBuilder: FormBuilder, private userService:UserService, private router:Router,private dataService:ShareDataService) { }

  ngOnInit() {

    if(this.authentication.getAuthentication())
    {
      this.formData = this.formBuilder.group(
        {
          userName: this.user["username"],
          email: this.user["email"]
        }
      )
    }
   else
     this.router.navigate(["/login"]);
  }
   async Edit()
  {
    this.submitted=true;
    var data  = {userName: this.formData.get("userName").value,email:this.formData.get("email").value,id:this.user["id"]};
    await this.userService.EditUser(data);
    this.router.navigate(["workerstable"]);
  }
}
