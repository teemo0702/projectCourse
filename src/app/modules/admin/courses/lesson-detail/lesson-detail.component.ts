import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CoursesService} from "../../../../shared/services/courses.service";
import {Router} from "@angular/router";
import {environment} from "../../../../../environments/environment";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.scss']
})
export class LessonDetailComponent implements OnInit, AfterViewInit {
    // doc = 'https://s4.lifesup.com.vn/hrm/file-upload/avatar/6f8e8815-5bde-449a-9d22-5ba4f63c0385.pptx';
    doc: string = '';
    lectureId: string;
    lectureDetail: any;

    constructor(
        public coursesService: CoursesService,
        public router: Router,
        private sanitizer: DomSanitizer
    ) { }

    ngOnInit(): void {
        this.lectureId = this.router.url.split('/') ? this.router.url.split('/')[3] : '';
        this.getAllLectures(this.lectureId);
    }

    ngAfterViewInit() {
    }

    getAllLectures(lectureId) {
        this.coursesService.getLectureDetail(lectureId).subscribe(res => {
            if (res.body.code === 0) {
                this.lectureDetail = res.body.response;
                if (this.lectureDetail.link.includes('pdf')) {
                    this.doc = environment.apiLink + this.lectureDetail.link;
                }
            }
        })
    }

    sanitizeURL(url: string) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}
