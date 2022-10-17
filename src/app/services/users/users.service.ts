import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Permission } from 'src/app/models/permission';
import { ResponseHttp } from 'src/app/models/responseHttp';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  deleteUsers(source: User) {
    throw new Error('Method not implemented.');
  }
 
  getUsers() : Observable<User[]>{
    return this.http.get<ResponseHttp>(environment.apiUrl + 'api/admin/users').pipe(
       map((data) => {
         return data.data.items
       }),
       catchError((error) => {
         return throwError(error);
       })
     );
   }

   getUserPermissions(userId: number) : Observable<Permission[]> {
    return this.http.get<ResponseHttp>(environment.apiUrl + 'api/admin/users/permissions/' + userId).pipe(
      map((data) => {
        return data.data.items
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }
 
   constructor(
     private http: HttpClient
   ) { }
}
