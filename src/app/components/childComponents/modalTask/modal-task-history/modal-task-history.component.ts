import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Priority } from 'src/app/models/priority';
import { Task } from 'src/app/models/task';
import { TaskComment } from 'src/app/models/taskComment';
import { User } from 'src/app/models/user';
import { PriorityService } from 'src/app/services/priority/priority.service';
import { TaskCommentService } from 'src/app/services/taskComment/task-comment.service';
import { UsersService } from 'src/app/services/users/users.service';
import { parse } from 'date-fns';

@Component({
  selector: 'app-modal-task-history',
  templateUrl: './modal-task-history.component.html',
  styleUrls: ['./modal-task-history.component.sass']
})
export class ModalTaskHistoryComponent implements OnInit {

  form : FormGroup;
  taskComments: TaskComment[];
  taskComment: TaskComment;
  users : User[];
  priorities : Priority[];
  isComplete : boolean;
  
  constructor(
    private toastService: MatSnackBar,
    private taskCommentService : TaskCommentService,
    private userService : UsersService,
    private priorityService : PriorityService,

    private dialogRef: MatDialogRef<ModalTaskHistoryComponent>,
    
    @Inject(MAT_DIALOG_DATA) public data: {
      urgentTasks : Task[],
      highTasks   : Task[],
      mediumTasks  : Task[],
      lowTasks    : Task[],
      task : Task,
      index : number,
      tasks : Task[],
    }
  ) {
      
      this.taskComments = [];
      this.taskComment = new TaskComment();

  }
  @Output() onQuality = new EventEmitter();

  get f() { return this.form.controls; }

  ngOnInit() {

    if(!this.data.task) {
      this.data.task = new Task();
    }
    

    console.log(this.data.tasks);
    console.log(this.data.task.id);

    setTimeout(() => {
      this.getPriorities();
      this.getTaskComments();
      this.getUsers();
    },10);

    this.form = new FormGroup({

      text : new FormControl(""),
      priority_id : new FormControl(this.data.task.priority_id),
      responsible_id : new FormControl(this.data.task.responsible_id),
      time_to_complete : new FormControl(this.data.task.time_to_complete),
      is_complete : new FormControl(this.data.task.is_complete),
      
    });
    this.isComplete = this.data.task.is_complete;
    if(this.data.task.is_complete) {
      this.form.controls["responsible_id"].disable();
      this.form.controls["priority_id"].disable();
      this.form.controls["time_to_complete"].disable();
      this.form.controls["is_complete"].disable();
    }
    if(parse(this.data.task.due_date, 'yyyy-M-d HH:mm:ss', new Date()) <= new Date()) {
      this.form.controls["is_complete"].disable();
    }
    
  }
  getTaskComments() {
    this.taskCommentService.getComments(this.data.task.id).subscribe((data: TaskComment[]) => {
      this.taskComments = data;
    });
  }

  getPriorities() {
    this.priorityService.getPriorities().subscribe((data: Priority[]) =>  {
        this.priorities = data;
      });
  }

  getUsers () {
    this.userService.getUsers().subscribe((data: User[]) =>  {
        this.users = data;
      });
  }

  onSubmit () {

    if (this.form.invalid) {
      return;
    }

  
    this.storeTaskComment();

    this.dialogRef.close();
    
  }

  storeTaskComment() {
    this.taskComment = Object.assign(this.form.value);
    this.taskComment.task_id = this.data.task.id;
    this.taskComment.lead_id = this.data.task.lead_id;

    this.taskCommentService.storeTaskComment(this.taskComment).subscribe((data : Task) => {
      this.toastService.open("Сохранить","Закрыть", {
        duration: 2000
      });
    
      this.data.tasks = this.data.tasks.filter(_ => _.id != this.data.task.id);

      if(data.priority.title == 'urgent') {

        this.data.urgentTasks.push(data);

       } else if(data.priority.title == 'high') {
        this.data.highTasks.push(data);
       } else if(data.priority.title == 'medium') {
        this.data.mediumTasks.push(data);
       } else if(data.priority.title == 'low') {
        this.data.lowTasks.push(data);
       }
       this.onQuality.emit(data);

    });

  
  }

  
}
