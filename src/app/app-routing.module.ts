import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { LeadArchiveComponent } from './components/archive/lead/lead-archive/lead-archive.component';
import { TaskArchiveComponent } from './components/archive/task-archive/task-archive.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormComponent } from './components/form/form.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SourcesComponent } from './components/sources/sources.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { UnitsComponent } from './components/units/units.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path:'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'form',//путь к страничке
    component: FormComponent,//какой компонент фреймворка будет обрабатывать маршрут
    canActivate: [AuthGuard]//компонент открыт только для аутентифицированных юзеров
  },
  {
    path:'login',
    component: LoginComponent,
  },
  {
    path:'logout',
    component: LoginComponent,
  },
  {
    path:'archive',
    component: LeadArchiveComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'analytics',
    component: AnalyticsComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'tasks',
    component: TasksComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'task_archives',
    component: TaskArchiveComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'sources',
    component: SourcesComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'units',
    component: UnitsComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'users',
    component: UsersComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
