import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {MdbTableDirective, MdbTablePaginationComponent} from "angular-bootstrap-md";
import {LoginService} from "../services/login.service";
import {AppComponent} from "../app.component";
import {ShareDataService} from "../services/share-data.service";
import {PreloadDataService} from "../provider/preload-data.service";

@Component({
  selector: 'app-workerstable',
  templateUrl: './workerstable.component.html',
  styleUrls: ['./workerstable.component.scss']
})
export class WorkerstableComponent implements OnInit, AfterViewInit {

  constructor(private dataService: ShareDataService, private userService: UserService, private router: Router, private cdRef: ChangeDetectorRef,private authentication:PreloadDataService) {
  }

  users: Array<any> = [];
  loaded = false;
  editData = {};
  @ViewChild(MdbTablePaginationComponent) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective;
  searchText: string = '';

  @HostListener('input') oninput() {
    this.searchItems();
  }

  async ngOnInit() {
    if (!this.authentication.getAuthentication()) {
      this.router.navigate(["/login"])
    } else {
      if(this.authentication.getCurrentUser()["authorities"][0]["authority"]=="ROLE_Admin")
      {
        await this.dataService.UpdateEmployees();
        await this.dataService.allEmployees.subscribe(res => {
          this.users = res;
          this.mdbTable.setDataSource(this.users);
        });
      }
      else if(this.authentication.getCurrentUser()["authorities"][0]["authority"]=="ROLE_Manager")
      {
        await this.dataService.UpdateEmployeesByDeparment(this.authentication.getCurrentUser()["department"]);
        await this.dataService.allEmployees.subscribe(res => {
          this.users = res;
          this.mdbTable.setDataSource(this.users);
        });
      }
      else
        this.router.navigate(["/home"]);
    }
  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();
    if (!this.searchText) {
      this.mdbTable.setDataSource(prev);
      this.users = this.mdbTable.getDataSource();
    }
    if (this.searchText) {
      this.users = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }

  async ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(20);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  EditEmployee(id, fullname, age, salary, department) {
    this.scroll("target");
    this.editData = {id, fullname, age, salary, department};
    this.dataService.UpdateEditEmployee(this.editData);

  }

  async DeleteEmployee(employeeId) {
    let data = {id: employeeId};
    await this.userService.DeleteEmployee(data);
    await this.dataService.UpdateEmployees();
    this.ngOnInit();
  }

  scroll(className: string): void {
    const elementList = document.querySelectorAll('#' + className);
    const element = elementList[0] as HTMLElement;
    element.scrollIntoView({behavior: 'smooth'});
  }
}
