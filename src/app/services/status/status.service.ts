import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ResponseHttp } from 'src/app/models/responseHttp';
import { Status } from 'src/app/models/status';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  getStatuses() : Observable<Status[]>{
    return this.http.get<ResponseHttp>(environment.apiUrl + 'api/admin/statuses').pipe(
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
