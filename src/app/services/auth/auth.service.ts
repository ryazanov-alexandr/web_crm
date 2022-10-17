import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { Permission } from 'src/app/models/permission';
import { ResponseHttp } from 'src/app/models/responseHttp';
import { ResponseHttpLogin } from 'src/app/models/responseHttpLogin';
import { ResponseHttpLoginDefault } from 'src/app/models/ResponseHttpLoginDefault';
import { environment } from 'src/environments/environment';
import { PermissionsService } from '../permissions/permissions.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private permissionsService: PermissionsService
    ) { }

  loginDefault(email: string, password: string) {
    return this.http.post<ResponseHttpLoginDefault>(environment.apiUrl + 'api/oauth/token', { 
      username : email, 
      password,
      client_id : environment.auth.clientId.clientId,
      client_secret : environment.auth.clientSecret.clientSecret,
      grant_type : "password",
      scope : ''
    } ).pipe(
      map((data)=>{
        if (data.access_token) {
          this.setUser(null);
          this.setToken(data.access_token);
          this.setRefreshToken(data.refresh_token);
          
          return true;
        }

        return null;
      }),
      catchError((error)=>{
        console.log('Error - ', error);
        console.log(environment.auth.clientSecret.clientSecret);
        return throwError(error);
      })
    );
  }
  setRefreshToken(refresh_token: string) {
    sessionStorage.setItem('userTokenRefresh', refresh_token);
  }

  login(email: string, password: string) {
    return this.http.post<ResponseHttpLogin>(environment.apiUrl + 'api/pub/auths/login', {
      email,
      password
    }).pipe(
      map((data) => {
      if(data.data.user && data.data.api_token) {
        this.setUser(JSON.stringify(data.data.user));
        this.setToken(data.data.api_token);

        return data.data.user;
      }

      return null;
    })
    ,
    catchError((error) => {
      console.log(error);
      return throwError(error);
    })
    );
  }
  
  logout() {
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('userToken');
    return this.http.get<ResponseHttp>(environment.apiUrl + 'api/pub/auths/logout').pipe(
      map((data) => {
        return data.data.item
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
    
  }


  setToken(api_token: string) {
    sessionStorage.setItem('userToken', api_token); 
  }

  setUser(user: string) {
    sessionStorage.setItem('currentUser', user);
  }

  checkUser() : boolean {
    if(sessionStorage.getItem('userToken') && sessionStorage.getItem('currentUser')) {
      return true;
    }

    return false;
  }
  
  getToken() : string {
    if(this.checkUser) {
      return sessionStorage.getItem('userToken');
    }
    return '';
  }



}
