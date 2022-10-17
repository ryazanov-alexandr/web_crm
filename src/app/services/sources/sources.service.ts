import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ResponseHttp } from 'src/app/models/responseHttp';
import { Source } from 'src/app/models/source';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SourcesService {

  updateSource(source: Source) : Observable<Source>{
    return this.http.put<ResponseHttp>(environment.apiUrl + 'api/admin/sources/' + source.id, source).pipe(
       map((data) => {
         return data.data.item
       }),
       catchError((error) => {
         return throwError(error);
       })
     );
   }

  saveSource(source: Source) : Observable<Source>{
    return this.http.post<ResponseHttp>(environment.apiUrl + 'api/admin/sources', source).pipe(
       map((data) => {
         return data.data.item
       }),
       catchError((error) => {
         return throwError(error);
       })
     );
   }
  
  deleteSource(source: Source) : Observable<Source>{
    return this.http.delete<ResponseHttp>(environment.apiUrl + 'api/admin/sources/' + source.id).pipe(
       map((data) => {
         return data.data.item
       }),
       catchError((error) => {
         return throwError(error);
       })
     );
   }

  getSources() : Observable<Source[]>{
   return this.http.get<ResponseHttp>(environment.apiUrl + 'api/admin/sources').pipe(
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
