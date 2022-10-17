import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Permission } from 'src/app/models/permission';
import { ResponseHttp } from 'src/app/models/responseHttp';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  getUserPermissions() : Observable<Permission[]> {
    return this.http.get<ResponseHttp>(environment.apiUrl + 'api/admin/users/permissions/').pipe(
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
