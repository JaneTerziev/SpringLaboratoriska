import { Component, OnInit } from '@angular/core';
import {LoginService} from "../services/login.service";
import {UserService} from "../services/user.service";
import {ShareDataService} from "../services/share-data.service";
import {PreloadDataService} from "../provider/preload-data.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  constructor(private authentication:PreloadDataService,private userService:UserService,private loginService:LoginService,private dataService:ShareDataService) {
  }
 ngOnInit() {

 }
  Logout()
  {
    this.loginService.LogoutUser();
  }
}
