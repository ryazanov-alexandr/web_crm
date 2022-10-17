import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ResponseHttp } from '../models/responseHttp';
import {map, catchError } from 'rxjs/operators';
import { Navigation } from '../models/navigation';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private http: HttpClient) { }

  getNavigation() : Observable<Navigation[]> {

    return this.http.get<ResponseHttp>(environment.apiUrl +  'api/admin/menus').pipe(
      map((data) =>{
        return data.data.items;
      }),
      catchError((error) => {
          console.log("Error - ", error);
          return throwError(error);
      })
    );
  }
}
