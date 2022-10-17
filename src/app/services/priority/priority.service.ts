import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Priority } from 'src/app/models/priority';
import { ResponseHttp } from 'src/app/models/responseHttp';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PriorityService {

  getPriorities() : Observable<Priority[]>{
    return this.http.get<ResponseHttp>(environment.apiUrl + 'api/admin/priorities').pipe(
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
