import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ResponseHttp } from 'src/app/models/responseHttp';
import { ResponseHttpTask } from 'src/app/models/ResponseHttpTask';
import { Task } from 'src/app/models/task';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  getRecTasks(responsible_id: number) : Observable<Task[]> {
    return this.http.get<ResponseHttp>(environment.apiUrl + 'api/admin/tasks/recTasks/index/' + responsible_id).pipe(
      map((data) => {
        return data.data.items
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }
  
  getTasksByUser(responsible_id: number) : Observable<Task[]> {
    return this.http.get<ResponseHttp>(environment.apiUrl + 'api/admin/tasks/userTasks/' + responsible_id).pipe(
      map((data) => {
        return data.data.items
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getCountUserTasks() : Observable<number> {
    return this.http.get<ResponseHttp>(environment.apiUrl + 'api/admin/tasks/userTasks/count/index').pipe(
      map((data) => {
        return data.data.item
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getCountUserTasksExpiring() {
    return this.http.get<ResponseHttp>(environment.apiUrl + 'api/admin/tasks/userTasks/count/expiring').pipe(
      map((data) => {
        return data.data.item
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getArchiveTasks(page: number)  : Observable<Task[]> {
    return this.http.get<ResponseHttp>(environment.apiUrl + 'api/admin/tasks/archive/index').pipe(
      map((data) => {
        return data.data.items;
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getTasksByPriorityId(priority_id: number) : Observable<Task[]> {
  return this.http.get<ResponseHttp>(environment.apiUrl + 'api/admin/tasks/priorityId/' + priority_id).pipe(
    map((data) => {
      return data.data.items
    }),
    catchError((error) => {
      return throwError(error);
    })
  );
}
  

  getTasks() : Observable<Task[]> {
    return this.http.get<ResponseHttp>(environment.apiUrl + 'api/admin/tasks').pipe(
      map((data) => {
        return data.data.items
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getTodayTasks() : Observable<Task[]> {
    return this.http.get<ResponseHttp>(environment.apiUrl + 'api/admin/tasks/todayTasks/index').pipe(
      map((data) => {
        return data.data.items
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getTomorrowTasks() : Observable<Task[]> {
    return this.http.get<ResponseHttp>(environment.apiUrl + 'api/admin/tasks/tomorrowTasks/index').pipe(
      map((data) => {
        return data.data.items
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getUpcomingTasks() : Observable<Task[]> {
    return this.http.get<ResponseHttp>(environment.apiUrl + 'api/admin/tasks/upcomingTasks/index').pipe(
      map((data) => {
        return data.data.items
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getExpiredTasks() : Observable<Task[]> {
    return this.http.get<ResponseHttp>(environment.apiUrl + 'api/admin/tasks/expiredTasks/index').pipe(
      map((data) => {
        return data.data.items
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }
  getCompleteTasks() : Observable<Task[]> {
    return this.http.get<ResponseHttp>(environment.apiUrl + 'api/admin/tasks/completeTasks/index').pipe(
      map((data) => {
        return data.data.items
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  constructor(private http: HttpClient) {
    
  }


  storeTask(task: Task) : Observable<Task> {
    return this.http.post<ResponseHttp>(environment.apiUrl + 'api/admin/tasks', task ).pipe(
      map((data) => {
        return data.data.item
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
