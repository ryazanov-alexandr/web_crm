import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ResponseHttp } from 'src/app/models/responseHttp';
import { Task } from 'src/app/models/task';
import { TaskComment } from 'src/app/models/taskComment';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TaskCommentService {
  constructor(private http: HttpClient) { }


  getComments(id: number) : Observable<TaskComment[]>  {
    return this.http.get<ResponseHttp>(environment.apiUrl + 'api/admin/tasks/history/' + id).pipe(
      map((data) => {
        return data.data.items
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  
  storeTaskComment(taskComment: TaskComment) : Observable<Task> {
    return this.http.post<ResponseHttp>(environment.apiUrl + 'api/admin/tasks_comments', taskComment).pipe(
      map((data) => {
        return data.data.item
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }


}
