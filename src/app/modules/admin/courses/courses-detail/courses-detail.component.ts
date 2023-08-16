import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses-detail',
  templateUrl: './courses-detail.component.html',
  styleUrls: ['./courses-detail.component.scss']
})
export class CoursesDetailComponent implements OnInit {
    doc = 'https://s4.lifesup.com.vn/hrm/file-upload/avatar/6f8e8815-5bde-449a-9d22-5ba4f63c0385.pptx';

  constructor() { }

  ngOnInit(): void {
  }

}
