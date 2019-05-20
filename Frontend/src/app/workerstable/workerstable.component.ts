import {ChangeDetectorRef, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../services/user.service";
import {Observable} from "rxjs";
import {AccountService} from "../services/Account.service";
import {Router} from "@angular/router";
import {MdbTableDirective, MdbTablePaginationComponent} from "angular-bootstrap-md";

@Component({
  selector: 'app-workerstable',
  templateUrl: './workerstable.component.html',
  styleUrls: ['./workerstable.component.scss']
})
export class WorkerstableComponent implements OnInit {

  constructor(private userService:UserService,private accountService:AccountService,private router:Router,private cdRef: ChangeDetectorRef) { }
  users: Array<UserData>=[];
  test: UserData={userName:"Jane",email:"janeterziev@gmail.com"};
 @ViewChild(MdbTablePaginationComponent) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective;
  searchText: string = '';
  previous: string;
  @HostListener('input') oninput() {
    this.searchItems();
  }
  ngOnInit() {
    if(this.accountService.getAuthenticated)
    {
      this.userService.getUsers.subscribe(data=>
      {
        this.users=data;
        for(let i=0;i<30;i++)
        {
          this.users.push(this.test);
        }
        this.mdbTable.setDataSource(this.users);
        this.previous = this.mdbTable.getDataSource();

      });
    }
    else
      this.router.navigate(["/login"])
  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();

    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.users = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.users = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }
  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(20);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }
}
export interface UserData {
  userName: string;
  email: string;
}
