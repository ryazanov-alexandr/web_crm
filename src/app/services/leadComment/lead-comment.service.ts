import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Lead } from 'src/app/models/lead';
import { LeadComment } from 'src/app/models/leadComment';
import { ResponseHttp } from 'src/app/models/responseHttp';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeadCommentService {

  storeLeadComment(leadComment: LeadComment) : Observable<Lead>{
    return this.http.post<ResponseHttp>(environment.apiUrl + 'api/admin/lead-comments', leadComment).pipe(
       map((data) => {
         return data.data.item
       }),
       catchError((error) => {
         return throwError(error);
       })
     );
   }
 

   getComments(id: number) : Observable<LeadComment[]> {
    return this.http.get<ResponseHttp>(environment.apiUrl + 'api/admin/leads/history/' + id).pipe(
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
