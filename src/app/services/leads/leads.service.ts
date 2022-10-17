import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Analytic } from 'src/app/models/analytic';
import { Lead } from 'src/app/models/lead';
import { ResponseHttp } from 'src/app/models/responseHttp';
import { ResponseHttpLead } from 'src/app/models/responseHttpLead';
import { SourceAnalytic } from 'src/app/models/sourceAnalytic';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeadsService {

  getEmployeeAnalytics(dateStart: string, dateEnd: string) : Observable<Analytic[]> {
    return this.http.post<ResponseHttp>(environment.apiUrl + 'api/admin/analytics', {
      dateStart : dateStart,
      dateEnd : dateEnd
    }).pipe(
      map((data) => {
        return data.data.items;
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getCountLeadsOfResponsibles(dateStart: string, dateEnd: string) : Observable<SourceAnalytic> {
    return this.http.post<ResponseHttp>(environment.apiUrl + 'api/admin/analytics/responsibles', {
      dateStart : dateStart,
      dateEnd : dateEnd
    }).pipe(
      map((data) => {
        return data.data.item;
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getLeadsDoneToday() : Observable<Lead[]> {
    return this.http.get<ResponseHttp>(environment.apiUrl + 'api/admin/leads/done/today').pipe(
      map((data) => {
        return data.data.items
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getCountQualityLeads(dateStart: string, dateEnd: string) : Observable<SourceAnalytic>{
    return this.http.post<ResponseHttp>(environment.apiUrl + 'api/admin/analytics/count/quality/leads', {
      dateStart : dateStart,
      dateEnd : dateEnd
    }).pipe(
      map((data) => {
        return data.data.item;
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getSourceAnalytics(dateStart: string, dateEnd: string) : Observable<SourceAnalytic> {
    return this.http.post<ResponseHttp>(environment.apiUrl + 'api/admin/analytics/sources', {
      dateStart : dateStart,
      dateEnd : dateEnd
    }).pipe(
      map((data) => {
        return data.data.item;
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getLeadsAnalytics(dateStart: string, dateEnd: string) : Observable<SourceAnalytic> {
    return this.http.post<ResponseHttp>(environment.apiUrl + 'api/admin/analytics/leads', {
      dateStart : dateStart,
      dateEnd : dateEnd
    }).pipe(
      map((data) => {
        return data.data.item;
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getArchiveLeads(page: number) : Observable<Lead[]> {
    return this.http.get<ResponseHttp>(environment.apiUrl + 'api/admin/leads/archive/index' + "?page=" + page).pipe(
      map((data) => {
        return data.data.items;
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  addQuality(lead: Lead) : Observable<Lead> {
    return this.http.put<ResponseHttp>(environment.apiUrl + 'api/admin/leads/update/quality/' + lead.id, lead).pipe(
      map((data) => {
        return data.data.item
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getLeads() : Observable<{
    process : Lead[],
    new : Lead[],
    done : Lead[]
  }> {
    return this.http.get<ResponseHttpLead>(environment.apiUrl + 'api/admin/leads').pipe(
      map((data) => {
        return data.data.items
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getNotDoneLeads() : Observable<Lead[]> {
    return this.http.get<ResponseHttp>(environment.apiUrl + 'api/admin/leads/notDone/index').pipe(
      map((data) => {
        return data.data.items
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  storeLead(lead: Lead) : Observable<Lead> {
    return this.http.post<ResponseHttp>(environment.apiUrl + 'api/admin/leads', lead).pipe(
      map((data) => {
        return data.data.item
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  updateLead(lead: Lead) : Observable<Lead> {
    return this.http.put<ResponseHttp>(environment.apiUrl + 'api/admin/leads/' + lead.id, lead).pipe(
      map((data) => {
        return data.data.item
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  checkLead(lead: Lead) : Observable<{exist : boolean, item : Lead}> {
    return this.http.post<ResponseHttp>(environment.apiUrl + 'api/admin/leads/create/check', lead).pipe(
      map((data) => {
        return {
          exist: data.data.exist,
          item: data.data.item
        }
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }
  
  getAddSaleCount() : Observable<number> {
    return this.http.get<ResponseHttp>(environment.apiUrl + 'api/admin/leads/addSale/count').pipe(
      map((data) => {
        return data.data.number
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
