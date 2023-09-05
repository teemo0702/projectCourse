import {Component, Injector, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {courses} from "../../../../mock-api/apps/academy/data";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CoursesService} from "../../../../shared/services/courses.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.scss']
})
export class LessonListComponent implements OnInit {
    listLectures: any[] = [];
    filteredLectures: any[] = [];

    fileName: string;

    formGroup: FormGroup = this.fb.group({
        id: [null],
        name: [null, [Validators.required]],
        code: [null, [Validators.required]],
        desc: [null, [Validators.required]],
        file: [null],
    });
    isAdmin: string;
    courseId: string;

    public dialogService: MatDialog;
    constructor(
        injector: Injector,
        public fb: FormBuilder,
        public coursesService: CoursesService,
        public router: Router
    ) {
        this.dialogService = injector.get(MatDialog);
    }

    ngOnInit(): void {
        this.courseId = this.router.url.split('/') ? this.router.url.split('/')[2] : '';
        this.isAdmin = localStorage.getItem('roleUser');
        this.getAllLectures(this.courseId);
    }

    getAllLectures(courseId, callback?) {
        this.coursesService.getAllLectures(courseId).subscribe(res => {
            if (res.body.code === 0) {
                this.listLectures = res.body.response.map(data => ({ ...data, id: data._id }));
                if (callback) {
                    callback(this.listLectures);
                }
            }
        })
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    // navigateSlide() {
    //     window.open('https://s4.lifesup.com.vn/hrm/file-upload/avatar/6f8e8815-5bde-449a-9d22-5ba4f63c0385.pptx');
    // }

    openDialogImport(template) {
        this.fileName = null;
        this.dialogService.open(template, {panelClass: 'custom-dialog'});
    }

    uploadFile(event: any) {
        const reader = new FileReader();
        const file = event.target.files[0];
        if (event.target.files && event.target.files[0]) {
            this.formGroup.patchValue({file});
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

    createLecture(data) {
        console.log(data);
        console.log(this.courseId);
    }
}
