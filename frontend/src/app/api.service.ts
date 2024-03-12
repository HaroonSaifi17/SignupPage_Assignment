import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http:HttpClient) { }

  newUserPost(User:FormData):Observable<void> {
    return this.http.post<void>(environment.apiUrl + 'addUser',User)
  }
}