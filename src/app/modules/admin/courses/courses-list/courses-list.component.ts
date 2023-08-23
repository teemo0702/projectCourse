import {Component, Injector, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ICourse} from "../../../../shared/models/account.model";
import {CoursesService} from "../../../../shared/services/courses.service";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
    listCourses: ICourse[] = [
        // {
        //     id: 1,
        //     name: "Dự án",
        //     code: "INT3315",
        //     desc: "Môn dự án cuối khóa"
        // },
        // {
        //     id: 2,
        //     name: "Đồ án",
        //     code: "INT3316",
        //     desc: "Môn đồ án cuối khóa"
        // },
    ];
    filteredCourses: ICourse[] = [];
    keySearch: string;

    formGroup: FormGroup = this.fb.group({
        id: [null],
        name: [null, [Validators.required]],
        code: [null, [Validators.required]],
        desc: [null, [Validators.required]],
    });

    public dialogService: MatDialog;
    public snackBar: MatSnackBar;
    constructor(
        injector: Injector,
        public fb: FormBuilder,
        public coursesService: CoursesService,
    ) {
        this.dialogService = injector.get(MatDialog);
        this.snackBar = injector.get(MatSnackBar);
    }

    ngOnInit(): void {
        this.getAllCourses(() => {
            this.filteredCourses = this.listCourses;
        });
    }

    getAllCourses(callback?) {
        this.coursesService.getAllCourses().subscribe(res => {
            if (res.body.code === 0) {
                this.listCourses = res.body.response.map(data => ({ ...data, id: data._id }));
                if (callback) {
                    callback(this.listCourses);
                }
            }
        })
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    openDialogImport(template) {
        this.dialogService.open(template, {panelClass: 'custom-dialog'});
    }

    closeDialog(): void {
        this.dialogService.closeAll();
    }

    createCourse(data) {
        this.coursesService.createCourse(data).subscribe(res => {
            if (res.body.code === 0) {
                this.snackBar.open(res.body.message, null, this.configSnackBar('success'));
                this.closeDialog();
                this.getAllCourses(() => {
                    this.filteredCourses = this.listCourses;
                });
            } else {
                this.snackBar.open(res.body.message, null, this.configSnackBar('error'));
            }
        })
    }

    configSnackBar(type: string) {
        const horizontalPosition: MatSnackBarHorizontalPosition = 'end';
        const verticalPosition: MatSnackBarVerticalPosition = 'top';
        return {
            panelClass:
                type === 'success'
                    ? 'bg-lime-500'
                    : type === 'warning'
                        ? 'bg-yellow-500'
                        : 'bg-red-500',
            horizontalPosition: horizontalPosition,
            verticalPosition: verticalPosition,
            duration: 2000
        }
    }

    searchCourse() {
        if (this.keySearch && this.keySearch !== '') {
            this.filteredCourses = this.listCourses.filter(course => this.formatRemoveVietnameseTones(course.name).includes(this.formatRemoveVietnameseTones(this.keySearch)));
        } else {
            this.filteredCourses = this.listCourses;
        }
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
