import { Component, OnInit } from '@angular/core';
import {courses} from "../../../../mock-api/apps/academy/data";

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
    filteredCourses: any[] = [];

    constructor() { }

    ngOnInit(): void {
        this.filteredCourses = courses;
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
