import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.scss']
})
export class LessonDetailComponent implements OnInit {
    doc = 'https://s4.lifesup.com.vn/hrm/file-upload/avatar/6f8e8815-5bde-449a-9d22-5ba4f63c0385.pptx';

    constructor() { }

    ngOnInit(): void {
    }
}
