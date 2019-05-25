import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {LoginService} from "../services/login.service";
import {ShareDataService} from "../services/share-data.service";
import {PreloadDataService} from "../provider/preload-data.service";

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {

  formData: FormGroup;
  user;
  constructor(private authentication:PreloadDataService,private formBuilder:FormBuilder,private userService:UserService,private router:Router,private dataService:ShareDataService,private loginService:LoginService) { }

  ngOnInit() {
    this.formData = this.formBuilder.group(
      {
        id: "",
        password : "",
      }
    );
    if(!this.authentication.getAuthentication())
    {
      this.router.navigate(["/login"])
    }

  }

  async ChangePassword()
  {
    this.formData.value["id"]=this.authentication.getCurrentUser()["id"];
    await this.userService.ChangePassword(this.formData.value);
    this.loginService.LogoutUser();
  }

}
