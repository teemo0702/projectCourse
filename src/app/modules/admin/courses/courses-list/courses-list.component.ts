import {Component, Injector, OnInit} from '@angular/core';
import {courses} from "../../../../mock-api/apps/academy/data";
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
    filteredCourses: any[] = [];

    formGroup: FormGroup = this.fb.group({
        id: [null],
        name: [null, [Validators.required]],
        code: [null, [Validators.required]],
        desc: [null, [Validators.required]],
    });

    public dialogService: MatDialog;
    constructor(
        injector: Injector,
        public fb: FormBuilder,
    ) {
        this.dialogService = injector.get(MatDialog);
    }

    ngOnInit(): void {
        this.filteredCourses = courses;
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    openDialogImport(template) {
        this.dialogService.open(template, {panelClass: 'custom-dialog'});
    }

    removeFile() {
        this.formGroup.reset();
    }

    closeDialog(): void {
        this.dialogService.closeAll();
    }

    createCourse(data) {
        this.closeDialog();
    }
}
