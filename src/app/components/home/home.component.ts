import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartDataset } from 'chart.js';
import { Lead } from 'src/app/models/lead';
import { SourceAnalytic } from 'src/app/models/sourceAnalytic';
import { Task } from 'src/app/models/task';
import { TaskComment } from 'src/app/models/taskComment';
import { LeadsService } from 'src/app/services/leads/leads.service';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  dateEnd : Date;

  leadsDoneToday: Lead[];
  tasks: Task[];
  countUserTasks: number;
  countUserExpiredTasks: number;
  countUserTasksExpiring: number;

  fullnamesResponsibles: string[];
  countLeadsResponsibles: ChartDataset[];

  responsiblesLabels: string[];
  countQualityLeads: ChartDataset[];

  comments: TaskComment[];

  userId: number;
  router: Router;
  constructor(
    private leadsService: LeadsService,
    private taskService: TaskService,
  ) { }

  ngOnInit(): void {

    this.getCountUserTasks();
    this.getCountUserExpiredTasks();
    this.getCountUserTasksExpiring();
    this.getCountLeadsOfResponsibles();
    this.getCountQualityLeads();
    this.getLeadsDoneToday();
    this.getTasks();

    this.userId = (JSON.parse(sessionStorage.getItem('currentUser'))).id;
  }

  getTasks() {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
    });
  }

  getCountUserTasks() {
    this.taskService.getCountUserTasks().subscribe((data) => {
      this.countUserTasks = data;
    });
  }

  getCountUserExpiredTasks() {
    this.taskService.getExpiredTasks().subscribe((data) => {
      this.countUserExpiredTasks = data?.filter(_ => _.responsible_id == this.userId).length;
    });
  }

  getCountUserTasksExpiring() {
    this.taskService.getCountUserTasksExpiring().subscribe((data) => {
      this.countUserTasksExpiring = data;
    });
  }

  getCountLeadsOfResponsibles() {
    let dateStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    let dateEnd = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
    this.leadsService.getCountLeadsOfResponsibles(this.dateHelper(dateStart), this.dateHelper(dateEnd)).subscribe((data : SourceAnalytic) => {
      this.fullnamesResponsibles = data[0];
      this.countLeadsResponsibles = [
        { data: data[1], label: 'Новые лиды на сотрудниках компании' },
      ];

    });
  }

  getCountQualityLeads() {
    let dateStart = new Date(new Date().getFullYear(), new Date().getMonth()-1, 1);
    let dateEnd = new Date(new Date().getFullYear(), new Date().getMonth(), 0)
    this.leadsService.getCountQualityLeads(this.dateHelper(dateStart), this.dateHelper(dateEnd)).subscribe((data : SourceAnalytic) => {
      this.responsiblesLabels = data[0];
      this.countQualityLeads = [
        { data: data[1], label: 'Закрытые сделки в прошлом месяце' },
      ];

    });
  }

  getLeadsDoneToday() {
    this.leadsService.getLeadsDoneToday().subscribe((data: Lead[])=>{
      this.leadsDoneToday = data?.filter(_ => _.responsible_id == this.userId);
    });
  }


  dateHelper(date: Date): string {
    if(date) {
      return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
    }
    return '';
  }


}
