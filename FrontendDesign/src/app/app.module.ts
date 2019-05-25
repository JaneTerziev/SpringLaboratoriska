import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './home/home.component';
import { WorkerstableComponent } from './workerstable/workerstable.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ExpiredComponent } from './expired/expired.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { FooterComponent } from './footer/footer.component';
import { EditemployeeComponent } from './editemployee/editemployee.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import {PreloadDataService} from "./provider/preload-data.service";

export function preloadUserFactory(provider: PreloadDataService) {
  return () => provider.load();
}

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    WorkerstableComponent,
    ForgotPasswordComponent,
    ExpiredComponent,
    EditprofileComponent,
    ChangepasswordComponent,
    FooterComponent,
    EditemployeeComponent,
    CreateEmployeeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [
    PreloadDataService,
    {
      provide: APP_INITIALIZER, useFactory: preloadUserFactory,deps:[PreloadDataService],multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
