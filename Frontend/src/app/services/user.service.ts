import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AccountService} from "./Account.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersAPI = "http://localhost:8080/users";
  constructor(private http:HttpClient,private accountService:AccountService,private router:Router) { }

  get getUsers():Observable<any>
  {
    return this.http.get(this.usersAPI,this.accountService.JWT);
  }
}
