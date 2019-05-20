import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {HomeComponent} from "./home/home.component";
import {WorkerstableComponent} from "./workerstable/workerstable.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {ExpiredComponent} from "./expired/expired.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path:"register",
    component: RegisterComponent
  },
  {
    path:"home",
    component: HomeComponent
  },
  {
    path:"workerstable",
    component:WorkerstableComponent
  },
  {
    path:"passwordreset",
    component:ForgotPasswordComponent
  },
  {
    path:"expired",
    component:ExpiredComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
