import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ResponseHttp } from 'src/app/models/responseHttp';
import { Task } from 'src/app/models/task';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  storeTask(task: Task) : Observable<Task> {
    return this.http.post<ResponseHttp>(environment.apiUrl + 'api/admin/tasks', task).pipe(
      map((data) => {
        return data.data.item
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }
  constructor(
    private http : HttpClient
  ) { }
}
