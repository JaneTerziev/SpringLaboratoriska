import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {LoginService} from "../services/login.service";
import {UserService} from "../services/user.service";
import {ErrorhandlingService} from "../services/errorhandling.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  private submit;
  loading=false;
  private user = new FormGroup({
    email: new FormControl()
  });
  constructor(private userService:UserService,private errorHandlingService:ErrorhandlingService) { }
  ngOnInit() {}

  async ResetPassword()
  {
    this.submit=true;
    this.loading=true;
    await this.userService.ResetPassword(this.user.get("email").value);
    this.loading=false;
    return;
  }
}
