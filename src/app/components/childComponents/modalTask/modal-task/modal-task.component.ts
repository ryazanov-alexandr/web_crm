import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Lead } from 'src/app/models/lead';
import { Priority } from 'src/app/models/priority';
import { Task } from 'src/app/models/task';
import { User } from 'src/app/models/user';
import { LeadsService } from 'src/app/services/leads/leads.service';
import { PriorityService } from 'src/app/services/priority/priority.service';
import { TaskService } from 'src/app/services/task/task.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-modal-task',
  templateUrl: './modal-task.component.html',
  styleUrls: ['./modal-task.component.sass']
})
export class ModalTaskComponent implements OnInit {

  form : FormGroup;
  priorities: Priority[];
  leads: Lead[];
  users: Array<User>;
  task : Task;
  selected : string;
  due_date : Date;
  minDate : Date;
  maxDate : Date;
  
  constructor(
      private taskService : TaskService, 
      private toastService: MatSnackBar,
      private priorityService: PriorityService, 
      private leadsService : LeadsService, 
      private userService : UsersService,
      private dialogRef: MatDialogRef<ModalTaskComponent>,

      @Inject(MAT_DIALOG_DATA) public data : {
        urgentTasks : Task[],
        highTasks   : Task[],
        mediumTasks  : Task[],
        lowTasks    : Task[],
      }
      ) {
    
  }

  @Output() onQuality = new EventEmitter();

  get f() { return this.form.controls; }

  getPriorities() {
    this.priorityService.getPriorities().subscribe((data: Priority[])=>{
      this.priorities = data;
      this.priorities.reverse();
  });
  }

  getLeads() {
    this.leadsService.getNotDoneLeads().subscribe((data: Lead[])=>{
      this.leads = data;
    });
  }



  ngOnInit() {
    this.minDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

    this.maxDate =  new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()); 

    setTimeout(() => {
      this.getPriorities();
      this.getLeads();
      this.getUsers();
    },10);
    
    this.form = new FormGroup({

      title : new FormControl('', Validators.required),

      due_date : new FormControl(''),
      description : new FormControl(''),
      time_to_complete : new FormControl('', Validators.required),
      lead_id : new FormControl('', Validators.required),
      priority_id : new FormControl('', Validators.required),
      responsible_id : new FormControl('', Validators.required),
      
      text : new FormControl(""),
      
    });
  
  }

  getUsers () {
    this.userService.getUsers().subscribe((data: any) =>  {
        this.users = data;
      });
  }


  onSubmit () {

    if (this.form.invalid) {
      return;
    }

    this.task = new Task();
    this.task = Object.assign(this.form.value);
    this.task.is_complete = false;
    this.storeTask();

    Object.keys(this.form.controls).forEach(key => {
      this.resetControlls(this.form.get(key));
    });

    this.resetControlls(this.form);

    this.dialogRef.close();
    
  }
  
  storeTask() {
    this.taskService.storeTask(this.task).subscribe((data) => {
      this.toastService.open("Сохранить","Закрыть", {
        duration: 2000
      });
     
      if(data.priority.title_ru == 'Срочный') {
       this.data.urgentTasks.push(data);
      } else if(data.priority.title_ru == 'Высокий') {
        this.data.highTasks.push(data);
      } else if(data.priority.title_ru == 'Средний') {
        this.data.mediumTasks.push(data);
      } else if(data.priority.title_ru == 'Низкий') {
        this.data.lowTasks.push(data);
      }
      this.onQuality.emit(data); 
    });
    


  }

  resetControlls (obj: AbstractControl) {
    obj.setErrors(null) ;
    obj.markAsUntouched();
    obj.markAsPristine();
  }

  getTasksByUser(responsible_id: number) {
    let responseTasks: Array<Task>;
    this.taskService.getTasksByUser(responsible_id)
      .subscribe((data: any) =>  {
        responseTasks = data;
      });
    
      return responseTasks;
  }

  getCountOfUserTasks(responsible_id: number) {
    return this.getTasksByUser(responsible_id)?.length;
  }
}
