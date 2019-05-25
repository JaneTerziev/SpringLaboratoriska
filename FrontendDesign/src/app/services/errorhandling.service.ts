import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorhandlingService {
  public emailAlreadyExists;
  public userAlreadyExistsError;
  public emailVerifiedError;
  public credentialsError;
  public emailDoesntExist;
  constructor() { }

  public setUserAlreadyExistsError()
  {
    this.emailAlreadyExists=false;
    this.userAlreadyExistsError=true;
  }
  public setEmailAlreadyExistsError()
  {
    this.emailAlreadyExists=true;
    this.userAlreadyExistsError=false;
  }
  public setUserAndEmailAlreadyExist()
  {
    this.emailAlreadyExists=true;
    this.userAlreadyExistsError=true;
  }
}
