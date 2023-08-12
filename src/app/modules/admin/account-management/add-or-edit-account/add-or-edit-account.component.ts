import {Component, Inject, Injector, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-or-edit-account',
  templateUrl: './add-or-edit-account.component.html',
  styleUrls: ['./add-or-edit-account.component.scss']
})
export class AddOrEditAccountComponent implements OnInit {
    fullname: string;
    username: string;
    countId = 0;

    constructor(
        public dialogRef: MatDialogRef<AddOrEditAccountComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
        this.fullname = data.fullname ?? null;
        this.username = data.username ?? null;
        this.countId = data.totalAcc ?? null;
    }

    ngOnInit(): void {
    }

    closeDialog(data?): void {
        this.dialogRef.close(data);
    }

    resetForm() {
        this.fullname = null;
        this.username = null;
    }

    saveAccount() {
        if (this.fullname && this.fullname !== '' && this.username && this.username !== '') {
            const data = {
                id: this.countId + 1,
                fullname: this.fullname,
                username: this.username,
            }
            this.closeDialog(data);
        }
    }
}
