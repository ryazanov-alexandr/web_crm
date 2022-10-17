import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Permission } from 'src/app/models/permission';
import { Task } from 'src/app/models/task';
import { User } from 'src/app/models/user';
import { TaskService } from 'src/app/services/task/task.service';
import { UsersService } from 'src/app/services/users/users.service';
import { ModalTaskHistoryComponent } from '../childComponents/modalTask/modal-task-history/modal-task-history.component';
import { ModalTaskComponent } from '../childComponents/modalTask/modal-task/modal-task.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.sass']
})
export class TasksComponent implements OnInit {

  urgentPriorityTasks : Task[];
  highPriorityTasks : Task[];
  mediumPriorityTasks : Task[];
  lowPriorityTasks : Task[];

  recTasks: Task[];
  responsibles: User[];
  permissions: Permission[] = [];
  user : User;
  selected : string;
  selectedUser : string = "-1";

  constructor(
    private taskService : TaskService,
    private usersService: UsersService,
    private modalService: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getUrgentTasks();
    this.getHighTasks();
    this.getMediumTasks();
    this.getLowTasks();
    this.getResponsiblesUsers();
    this.getPermissions();

    this.selected = "1";

  }

  sortTasksByDate(value) {
    this.selected = value;
  }

  sortTasksByUser(value) {
    this.selectedUser = value;
    if(value != -1) {
      this.taskService.getRecTasks(value).subscribe((data) => {
        this.recTasks = data;        
      });
    }
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

  getRecTasks() {
    this.taskService.getRecTasks(+this.selectedUser).subscribe((data) => {
      this.recTasks = data;        
    });
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

  openSourceModal() {
    let modalComponentRef = this.modalService.open(ModalTaskComponent,{ 
      width : '80%',
      data : {
        urgentTasks : this.urgentPriorityTasks,
        highTasks   : this.highPriorityTasks,
        mediumTasks  : this.mediumPriorityTasks,
        lowTasks    : this.lowPriorityTasks,
      },
    });

    modalComponentRef.componentInstance.onQuality.subscribe((data: Task) => {
      this.getUrgentTasks();
      this.getHighTasks();
      this.getMediumTasks();
      this.getLowTasks();
    });
  }

  openHistory(event, task : Task, index : number, tasks : Array<Task>) {
    console.log(this.urgentPriorityTasks);
    console.log(this.highPriorityTasks);
    console.log(this.mediumPriorityTasks);
    console.log(this.lowPriorityTasks);
    let modalComponentRef = this.modalService.open(ModalTaskHistoryComponent, {
      width : "80%",
      data: {
        urgentTasks : this.urgentPriorityTasks,
        highTasks   : this.highPriorityTasks,
        mediumTasks  : this.mediumPriorityTasks,
        lowTasks    : this.lowPriorityTasks,
        task : task, 
        index,
        tasks : tasks
      },
      }  
    );

    modalComponentRef.componentInstance.onQuality.subscribe((data: Task) => {
      this.getUrgentTasks();
      this.getHighTasks();
      this.getMediumTasks();
      this.getLowTasks();
    });

  }

}
