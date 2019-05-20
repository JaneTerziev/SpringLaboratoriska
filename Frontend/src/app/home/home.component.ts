import { Component, OnInit } from '@angular/core';
import {AccountService} from "../services/Account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private accountService:AccountService,private router:Router) { }

  ngOnInit() {

  }
}
