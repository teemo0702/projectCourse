import {Component, Injector, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {courses} from "../../../../mock-api/apps/academy/data";

@Component({
  selector: 'app-courses-detail',
  templateUrl: './courses-detail.component.html',
  styleUrls: ['./courses-detail.component.scss']
})
export class CoursesDetailComponent implements OnInit {
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
