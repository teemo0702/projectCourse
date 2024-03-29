import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {IAccount} from "../../../shared/models/account.model";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {take} from 'rxjs/operators';
import {MatTable} from "@angular/material/table";
import {AddOrEditAccountComponent} from "./add-or-edit-account/add-or-edit-account.component";

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss']
})
export class AccountManagementComponent implements OnInit {
    @ViewChild(MatTable) table: MatTable<any>;

    listAccounts: IAccount[] = [
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
            id: 4,
            fullname: "Trần Minh Đức",
            username: "19020260"
        },
        {
            id: 5,
            fullname: "Dương Hữu Huy",
            username: "19120565"
        },
        {
            id: 6,
            fullname: "Cao Huy Hiếu",
            username: "1901634"
        },
        {
            id: 7,
            fullname: "Trần Minh Đức",
            username: "19020260"
        },
        // {
        //     id: 2,
        //     fullname: "Dương Hữu Huy",
        //     username: "19120565"
        // },
        // {
        //     id: 3,
        //     fullname: "Cao Huy Hiếu",
        //     username: "1901634"
        // },
        // {
        //     id: 1,
        //     fullname: "Trần Minh Đức",
        //     username: "19020260"
        // },
        // {
        //     id: 2,
        //     fullname: "Dương Hữu Huy",
        //     username: "19120565"
        // },
        // {
        //     id: 3,
        //     fullname: "Cao Huy Hiếu",
        //     username: "1901634"
        // },
    ];
    filteredAccounts: IAccount[] = [];
    displayedColumns: string[] = ['id', 'fullname', 'username', 'action'];
    keySearch: string;

    public dialogService: MatDialog;
    constructor(
      injector: Injector,
    ) {
      this.dialogService = injector.get(MatDialog);
    }

    ngOnInit(): void {
      this.filteredAccounts = this.listAccounts;
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    createOrEditAccount(user = {}) {
        // console.log(user);
        this.showDialog(AddOrEditAccountComponent, {
            data: {
                ...user,
                totalAcc: this.listAccounts.length
            },
            width: '60vw',
            disableClose: false
        }, (value) => {
            if (value) {
                console.log('create or edit: ', value);
                this.listAccounts.push(value);
                this.filteredAccounts = this.listAccounts;
                this.table.renderRows();
            }
        });
    }

    showDialog(
        component?: any,
        options: MatDialogConfig = {},
        callback?: any
    ): any {
        const ref = this.dialogService.open(component, {
            width: '30vw',
            ...options,
        });
        ref
          .afterClosed()
          .pipe(take(1))
          .subscribe((value) => {
             callback && callback(value);
          });
        return ref;
    }

    searchAcc() {
        if (this.keySearch && this.keySearch !== '') {
            this.filteredAccounts = this.listAccounts.filter(acc => this.formatRemoveVietnameseTones(acc.fullname).includes(this.formatRemoveVietnameseTones(this.keySearch)));
        } else {
            this.filteredAccounts = this.listAccounts;
        }
        this.table.renderRows();
    }

    formatRemoveVietnameseTones(keySearch): string {
        keySearch = keySearch.replace(/\s(?=\s)/g, '').trim();
        return this.removeVietnameseTones(keySearch);
    }

    removeVietnameseTones(str: string): string {
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        // Some system encode vietnamese combining accent as individual utf-8 characters
        // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
        // Remove extra spaces
        // Bỏ các khoảng trắng liền nhau
        str = str.replace(/ + /g, "");
        str = str.trim();
        // Remove punctuations
        // Bỏ dấu câu, kí tự đặc biệt
        // str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,"");
        return str;
    }
}
