import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {el} from "@angular/platform-browser/testing/src/browser_util";
import {Router} from "@angular/router";
import {ShareDataService} from "../services/share-data.service";
import {PreloadDataService} from "../provider/preload-data.service";

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {
  employee:FormGroup;
  activateValidators=false;
  constructor(private authentication:PreloadDataService,private userService:UserService,private router:Router,private dataService:ShareDataService) { }

  ngOnInit() {
    if(!this.authentication.getAuthentication())
    {
      this.router.navigate(["/login"]);
    }
    this.employee=new FormBuilder().group({
      fullname:["",Validators.required],
      age:["",Validators.required],
      salary:["",Validators.required],
      department:["",Validators.required],
    })
  }
  get Form()
  {
    return this.employee.controls;
  }
  async AddEmployee()
  {

    this.activateValidators=true;
    if(this.employee.invalid)
    {
      return;
    }
    else
    {
      let data = JSON.stringify({fullname:this.employee.get("fullname").value,age:this.employee.get("age").value,salary:this.employee.get("salary").value,department:this.employee.get("department").value});
      await this.userService.AddEmployee(data);
      this.router.navigate(["/workerstable"]);
    }

  }

}
