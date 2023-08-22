import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(public http:HttpClient) { }

    createUser(data): Observable<any> {
        return this.http.post(`${environment.apiUrl}/users`, data, {observe: 'response'})
    }

    getAllUsers(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/users`, {observe: 'response'});
    }
}
