import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ResponseHttp } from 'src/app/models/responseHttp';
import { Unit } from 'src/app/models/unit';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnitsService {

  updateUnit(unit: Unit) : Observable<Unit>{
    return this.http.put<ResponseHttp>(environment.apiUrl + 'api/admin/units/' + unit.id, unit).pipe(
       map((data) => {
         return data.data.item
       }),
       catchError((error) => {
         return throwError(error);
       })
     );
   }

  saveUnit(unit: Unit) : Observable<Unit>{
    return this.http.post<ResponseHttp>(environment.apiUrl + 'api/admin/units', unit).pipe(
       map((data) => {
         return data.data.item
       }),
       catchError((error) => {
         return throwError(error);
       })
     );
   }

  deleteUnit(unit: Unit) : Observable<Unit>{
    return this.http.delete<ResponseHttp>(environment.apiUrl + 'api/admin/units/' + unit.id).pipe(
       map((data) => {
         return data.data.item
       }),
       catchError((error) => {
         return throwError(error);
       })
     );
   }

  getUnits() : Observable<Unit[]> {
    return this.http.get<ResponseHttp>(environment.apiUrl + 'api/admin/units').pipe(
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
