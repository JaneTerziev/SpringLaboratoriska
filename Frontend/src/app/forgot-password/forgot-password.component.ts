import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AccountService} from "../services/Account.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  private unsuccesful;
  private submit;
  private user = new FormGroup({
    email: new FormControl()
  });
  constructor(private accountService:AccountService) { }
  ngOnInit() {}
   async ResetPassword()
  {
    this.submit=true;
    await this.accountService.ResetPassword(this.user.get("email").value);
    this.unsuccesful=this.accountService.getPasswordReset;
  }
}
