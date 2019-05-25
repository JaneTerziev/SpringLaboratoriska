import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../services/api.service";

@Injectable()
export class PreloadDataService {
  private currentUser=null;
  private authentication=false;

  constructor(private http:HttpClient,private api:ApiService) { }
  public getCurrentUser()
  {
    return this.currentUser;
  }
  public getAuthentication()
  {
    return this.authentication;
  }
  async load()
  {
    let bool = this.api.LoginWithToken();
    if(bool)
    {
      this.authentication=true;
      this.currentUser=await this.api.GetCurrentUser();
    }
  }

  setCurrentUser(res: any) {
    this.currentUser=res;
  }

  setAuthenticated(b: boolean) {
    this.authentication=b;
  }
}
