import { Component, OnInit } from '@angular/core';
import {IAccount} from "../../../shared/models/account.model";

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss']
})
export class AccountManagementComponent implements OnInit {
  filteredAccounts: IAccount[] = [];
  displayedColumns: string[] = ['id', 'fullname', 'username'];

  constructor() { }

  ngOnInit(): void {
      this.filteredAccounts = [
          {
              id: 1,
              fullname: "Trần Minh Đức",
              username: "19020260"
          },
          {
              id: 2,
              fullname: "Dương Hữu Huy",
              username: "19120565"
          },
          {
              id: 3,
              fullname: "Cao Huy Hiếu",
              username: "1901634"
          },
          {
              id: 1,
              fullname: "Trần Minh Đức",
              username: "19020260"
          },
          {
              id: 2,
              fullname: "Dương Hữu Huy",
              username: "19120565"
          },
          {
              id: 3,
              fullname: "Cao Huy Hiếu",
              username: "1901634"
          },
          {
              id: 1,
              fullname: "Trần Minh Đức",
              username: "19020260"
          },
          {
              id: 2,
              fullname: "Dương Hữu Huy",
              username: "19120565"
          },
          {
              id: 3,
              fullname: "Cao Huy Hiếu",
              username: "1901634"
          },
          {
              id: 1,
              fullname: "Trần Minh Đức",
              username: "19020260"
          },
          {
              id: 2,
              fullname: "Dương Hữu Huy",
              username: "19120565"
          },
          {
              id: 3,
              fullname: "Cao Huy Hiếu",
              username: "1901634"
          },
          {
              id: 1,
              fullname: "Trần Minh Đức",
              username: "19020260"
          },
          {
              id: 2,
              fullname: "Dương Hữu Huy",
              username: "19120565"
          },
          {
              id: 3,
              fullname: "Cao Huy Hiếu",
              username: "1901634"
          },
          {
              id: 1,
              fullname: "Trần Minh Đức",
              username: "19020260"
          },
          {
              id: 2,
              fullname: "Dương Hữu Huy",
              username: "19120565"
          },
          {
              id: 3,
              fullname: "Cao Huy Hiếu",
              username: "1901634"
          },
          {
              id: 1,
              fullname: "Trần Minh Đức",
              username: "19020260"
          },
          {
              id: 2,
              fullname: "Dương Hữu Huy",
              username: "19120565"
          },
          {
              id: 3,
              fullname: "Cao Huy Hiếu",
              username: "1901634"
          },
      ];
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
