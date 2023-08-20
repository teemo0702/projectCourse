import {Component, Injector, OnInit} from '@angular/core';
import {courses} from "../../../../mock-api/apps/academy/data";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
    filteredCourses: any[] = [];

    fileName: string;

    public dialogService: MatDialog;
    constructor(
        injector: Injector,
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
        this.fileName = null;
        this.dialogService.open(template, {panelClass: 'custom-dialog'});
    }

    uploadFile(event: any) {
        const reader = new FileReader();
        const file = event.target.files[0];
        if (event.target.files && event.target.files[0]) {
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.fileName = file.name;
            };
        }
    }

    removeFile() {
        this.fileName = null;
    }

    closeDialog(): void {
        this.dialogService.closeAll();
    }
}
