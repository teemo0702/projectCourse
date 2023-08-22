import {Component, Inject, Injector, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../shared/services/users.service";

@Component({
  selector: 'app-add-or-edit-account',
  templateUrl: './add-or-edit-account.component.html',
  styleUrls: ['./add-or-edit-account.component.scss']
})
export class AddOrEditAccountComponent implements OnInit {
    formGroup: FormGroup = this.fb.group({
        id: [null],
        name: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
        userName: [null, [Validators.required]],
        role: [null, [Validators.required]],
    });

    constructor(
        public userService: UserService,
        public dialogRef: MatDialogRef<AddOrEditAccountComponent>,
        public fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
        this.formGroup.patchValue({ ...data });
    }

    ngOnInit(): void {
    }

    closeDialog(data?): void {
        this.dialogRef.close(data);
    }

    resetForm() {
        this.formGroup.reset();
    }

    saveAccount(data) {
        // this.userService.createUser(data).subscribe(res => {
        //     if (res.code === 0) {
        //         this.closeDialog(data);
        //     }
        // })
        this.closeDialog(data);
    }
}
