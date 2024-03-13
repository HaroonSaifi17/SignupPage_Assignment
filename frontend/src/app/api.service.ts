import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { User } from './user.interface';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http:HttpClient) { }

  newUserPost(User:User):Observable<void> {
    return this.http.post<void>(environment.apiUrl + '/api/addUser',User)
  }
  getUsers():Observable<User[]> {
    return this.http.get<User[]>(environment.apiUrl + '/api/getUsers')
  }
}
