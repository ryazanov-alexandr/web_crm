import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './modules/material/material.module';
import { LayoutComponent } from './components/layout/layout/layout.component';
import { NavigationComponent } from './components/layout/navigation/navigation.component';
import { PreloaderComponent } from './components/layout/preloader/preloader.component';
import { SidenavListComponent } from './components/layout/sidenav-list/sidenav-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PreloaderInterceptor } from './interceptors/preloader.interceptor';
import { FormComponent } from './components/form/form.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthinterceptorInterceptor } from './interceptors/authinterceptor.interceptor';
import { LogoutInterceptor } from './interceptors/logout.interceptor';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewLeadPipe } from './pipes/new-lead.pipe';
import { ProcessingPipe } from './pipes/processing.pipe';
import { DonePipe } from './pipes/done.pipe';
import { ModalHistoryComponent } from './components/childComponents/modal-history/modal-history.component';
import { EventPipe } from './pipes/event.pipe';
import { ModalQualityComponent } from './components/childComponents/modalQuality/modal-quality/modal-quality.component';
import { ModalLeadComponent } from './components/childComponents/modal-lead/modal-lead.component';
import { LeadArchiveComponent } from './components/archive/lead/lead-archive/lead-archive.component';
import { LeadArchiveHistoryComponent } from './components/childComponents/lead-archive-history/lead-archive-history.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TasksComponent } from './components/tasks/tasks.component';
import { ModalTaskComponent } from './components/childComponents/modalTask/modal-task/modal-task.component';
import { ModalTaskHistoryComponent } from './components/childComponents/modalTask/modal-task-history/modal-task-history.component';
import { ModalArchiveTaskHistoryComponent } from './components/childComponents/modal-archive-task-history/modal-archive-task-history.component';
import { EventTaskPipe } from './pipes/event-task.pipe';
import { MyTasksPipe } from './pipes/my-tasks.pipe';
import { TaskArchiveComponent } from './components/archive/task-archive/task-archive.component';
import { SourcesComponent } from './components/sources/sources.component';
import { ModalSourcesComponent } from './components/childComponents/modal-sources/modal-sources.component';
import { MatDialogRef } from '@angular/material/dialog';
import { UnitsComponent } from './components/units/units.component';
import { UsersComponent } from './components/users/users.component';
import { ModalUnitsComponent } from './components/childComponents/modal-units/modal-units.component';
import { ModalUsersComponent } from './components/childComponents/modal-users/modal-users.component';
import { SelectTasksPipe } from './pipes/select-tasks.pipe';
import { FlexmonsterPivotModule } from 'ng-flexmonster';
import { NgChartsModule } from 'ng2-charts';
import { HomeComponent } from './components/home/home.component';
import { MatDividerModule } from '@angular/material/divider';
import { UrgentTasksPipe } from './pipes/urgent-tasks.pipe';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ArchiveTasksPipe } from './pipes/archive-tasks.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NavigationComponent,
    PreloaderComponent,
    SidenavListComponent,
    FormComponent,
    LoginComponent,
    DashboardComponent,
    NewLeadPipe,
    ProcessingPipe,
    DonePipe,
    ModalHistoryComponent,
    EventPipe,
    ModalQualityComponent,
    ModalLeadComponent,
    LeadArchiveComponent,
    LeadArchiveHistoryComponent,
    AnalyticsComponent,
    TasksComponent,
    ModalTaskComponent,
    ModalTaskHistoryComponent,
    ModalArchiveTaskHistoryComponent,
    EventTaskPipe,
    MyTasksPipe,
    TaskArchiveComponent,
    SourcesComponent,
    ModalSourcesComponent,
    UnitsComponent,
    UsersComponent,
    ModalUnitsComponent,
    ModalUsersComponent,
    SelectTasksPipe,
    HomeComponent,
    UrgentTasksPipe,
    ArchiveTasksPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FlexmonsterPivotModule,
    MatDividerModule,
    NgChartsModule,
    NgxMatSelectSearchModule,
    
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: PreloaderInterceptor,
      multi   : true
    },
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthinterceptorInterceptor,
      multi   : true
    },
    {
      provide : HTTP_INTERCEPTORS,
      useClass: LogoutInterceptor,
      multi   : true
    },
    {
      provide : MatDialogRef,
      useValue: {},
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
