import {Component, Injector, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {courses} from "../../../../mock-api/apps/academy/data";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.scss']
})
export class LessonListComponent implements OnInit {
    filteredCourses: any[] = [];

    fileName: string;

    formGroup: FormGroup = this.fb.group({
        id: [null],
        name: [null, [Validators.required]],
        code: [null, [Validators.required]],
        desc: [null, [Validators.required]],
        courseId: [null, [Validators.required]],
        file: [null, [Validators.required]],
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

    navigateSlide() {
        window.open('https://s4.lifesup.com.vn/hrm/file-upload/avatar/6f8e8815-5bde-449a-9d22-5ba4f63c0385.pptx');
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
