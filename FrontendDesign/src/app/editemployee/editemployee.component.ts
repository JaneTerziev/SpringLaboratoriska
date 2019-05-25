import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../services/user.service";
import {ShareDataService} from "../services/share-data.service";
import {WorkerstableComponent} from "../workerstable/workerstable.component";
import {Router} from "@angular/router";
import {PreloadDataService} from "../provider/preload-data.service";

@Component({
  selector: 'app-editemployee',
  templateUrl: './editemployee.component.html',
  styleUrls: ['./editemployee.component.scss']
})
export class EditemployeeComponent implements OnInit {
  employees:FormGroup;
  editEmployee;
  constructor(private authentication:PreloadDataService,private userService:UserService,private dataService:ShareDataService,private workers:WorkerstableComponent,private router:Router) { }
  ngOnInit() {

    if(!this.authentication.getAuthentication())
    {
      this.router.navigate(["/login"]);
    }
    this.dataService.editEmployee.subscribe(res=>
    {
      this.editEmployee=res;
      this.employees=new FormBuilder().group({
        id:new FormControl({value: this.editEmployee["id"], disabled: true}),
        fullname:[this.editEmployee["fullname"]],
        age:[this.editEmployee["age"]],
        salary:[this.editEmployee["salary"]],
        department:[this.editEmployee["department"]],
      })
    });
  }
  async EditEmployee()
  {
    var data  = {id: this.employees.get("id").value,fullname: this.employees.get("fullname").value,age: this.employees.get("age").value,salary: this.employees.get("salary").value,department: this.employees.get("department").value};
    await this.userService.EditEmployee(data);
    if(this.authentication.getCurrentUser()['authorities'][0]['authority']=="ROLE_Admin")
    {
      await this.dataService.UpdateEmployees();
    }
    else
    {
      await this.dataService.UpdateEmployeesByDeparment(this.authentication.getCurrentUser()['authorities'][0]['authority']);
    }
    this.workers.ngOnInit();
  }

}
