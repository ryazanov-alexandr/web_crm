import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Permission } from 'src/app/models/permission';
import { Task } from 'src/app/models/task';
import { User } from 'src/app/models/user';
import { TaskService } from 'src/app/services/task/task.service';
import { UsersService } from 'src/app/services/users/users.service';
import { ModalArchiveTaskHistoryComponent } from '../../childComponents/modal-archive-task-history/modal-archive-task-history.component';

@Component({
  selector: 'app-task-archive',
  templateUrl: './task-archive.component.html',
  styleUrls: ['./task-archive.component.sass']
})
export class TaskArchiveComponent implements OnInit {

  page : number;
  tasks : Array<Task>;
  permissions: Permission[] = [];
  user : User;

  completeTasksFalse: boolean = false;
  completeTasks: boolean = false;

  urgentPriorityTasks : Task[];
  highPriorityTasks : Task[];
  mediumPriorityTasks : Task[];
  lowPriorityTasks : Task[];

  responsibles: User[];
  selectedUser : string = "-1";

  constructor(
    private taskService : TaskService, 
    private usersService: UsersService,
    private modalService: MatDialog,
    ) {
    this.page = 1;
    this.tasks  = [];
  }


  ngOnInit() {
    console.log(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1));
    this.getUrgentTasks();
    this.getHighTasks();
    this.getMediumTasks();
    this.getLowTasks();
    this.getResponsiblesUsers();
    this.getPermissions();
  }

  sortTasksByUser(value) {
    this.selectedUser = value;
  }

  getUrgentTasks() {
    this.taskService.getTasksByPriorityId(4).subscribe((data) => {
      this.urgentPriorityTasks = data;        
    });
  }

  getHighTasks() {
    this.taskService.getTasksByPriorityId(3).subscribe((data) => {
      this.highPriorityTasks = data;        
    });
  }

  getMediumTasks() {
    this.taskService.getTasksByPriorityId(2).subscribe((data) => {
      this.mediumPriorityTasks = data;        
    });
  }

  getLowTasks() {
    this.taskService.getTasksByPriorityId(1).subscribe((data) => {
      this.lowPriorityTasks = data;        
    });
  }

  getTasks() {
    this.taskService.getArchiveTasks(this.page).subscribe((data: Task[]) => {
      let taskT : Array<Task> = this.tasks;
      
      data.forEach(function(item) {
          taskT.push(item)
      });
    });
  }

  public loadTask() {
    ++this.page;
    this.getTasks();
  }

  getResponsiblesUsers() {
    this.usersService.getUsers().subscribe((data: User[]) => {
      this.responsibles = data;
    });
  }
  
  getPermissions() {
    let userId = (JSON.parse(sessionStorage.getItem('currentUser'))).id;
    this.usersService.getUserPermissions(userId).subscribe((data: Permission[]) => {
      this.permissions = data;
    });
  }

  checkExistPermission(alias: string):boolean {
    return !!this.permissions.find(perm => perm.alias == alias);
  }

  public openHistory(event, task : Task, index : number, tasks : Array<Task>) {

    this.modalService.open(ModalArchiveTaskHistoryComponent, {
      data : {
        task : task,
      },
      width : '80%'
    });

  }


}
