import { Component, OnInit } from '@angular/core';
import {AccountService} from "../services/Account.service";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  constructor(private accountService: AccountService,private userService:UserService) {
  }
  ngOnInit() {}
  CheckAuthenticated()
  {
    return this.accountService.getAuthenticated;
  }
  Logout()
  {
    this.accountService.Logout();
  }
}
