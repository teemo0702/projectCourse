import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CoursesService {

    constructor(public http:HttpClient) { }

    createCourse(data): Observable<any> {
        return this.http.post(`${environment.apiUrl}/courses`, data, {observe: 'response'})
    }

    getAllCourses(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/courses`, {observe: 'response'});
    }

    getCourseDetail(courseId): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/courses/${courseId}`, {observe: 'response'});
    }

    createLecture(data: FormData): Observable<any> {
        return this.http.post(`${environment.apiUrl}/lectures`, data, {observe: 'response'})
    }

    getAllLectures(courseId): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/lectures/${courseId}`, {observe: 'response'});
    }

    getLectureDetail(lectureId): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/lecture/${lectureId}`, {observe: 'response'});
    }
}
