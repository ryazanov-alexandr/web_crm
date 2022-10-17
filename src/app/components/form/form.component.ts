import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Lead } from 'src/app/models/lead';
import { Permission } from 'src/app/models/permission';
import { Priority } from 'src/app/models/priority';
import { Source } from 'src/app/models/source';
import { Task } from 'src/app/models/task';
import { User } from 'src/app/models/user';
import { LeadsService } from 'src/app/services/leads/leads.service';
import { PriorityService } from 'src/app/services/priority/priority.service';
import { SourcesService } from 'src/app/services/sources/sources.service';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit {

  leadForm: FormGroup;
  sources: Source[];
  users: User[];
  permissions: Permission[];

  isLead: boolean;//форма для заполнения лида или таска
  addSaleCount: number = 0;//счетчик доп продаж юзера

  taskForm: FormGroup;
  priorities: Priority[];
  leads: Lead[];
  selected : string;
  due_date : Date;
  minDate : Date;
  maxDate : Date;
  
  lead: Lead;
  task: Task;

  constructor(
    private priorityService: PriorityService,
    private sourcesService: SourcesService,
    private leadsService: LeadsService,
    private tasksService: TasksService,
    private usersService: UsersService,
    private toastService: MatSnackBar,
  ) { 
    this.lead = new Lead();
    this.task = new Task();
  }

  ngOnInit(): void {
    this.minDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

    this.maxDate =  new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()); 

    setTimeout(() => {
      this.getSources();
      this.getUsers();
      this.getAddSaleCount();
      this.getPermissions();
      this.getPriorities();
      this.getLeads();
  },10);

    this.isLead = true;

    this.leadForm = new FormGroup({

      linkPhone : new FormGroup({
        link: new FormControl("", Validators.required),
        phone: new FormControl("", Validators.required),
      }),

      title: new FormControl("", Validators.required),
      source_id: new FormControl("", Validators.required),
      responsible_id: new FormControl("", Validators.required),

      is_express_delivery: new FormControl("0", Validators.required),
      is_add_sale: new FormControl("0", Validators.required),
      is_lead: new FormControl(true),

      text: new FormControl(""),

    });

    this.taskForm = new FormGroup({

      title: new FormControl("", Validators.required),
      responsible_id: new FormControl("", Validators.required),

      due_date : new FormControl('', Validators.required),
      description : new FormControl(''),
      time_to_complete : new FormControl('', Validators.required),
      lead_id : new FormControl('', Validators.required),
      priority_id : new FormControl('', Validators.required),

      text: new FormControl(""),

    });

    this.onChengesIsLead();
  }

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

  getPermissions() {
    let userId = (JSON.parse(sessionStorage.getItem('currentUser'))).id;
    this.usersService.getUserPermissions(userId).subscribe((data: Permission[]) => {
      this.permissions = data;
    });
  }

  getAddSaleCount() {
    this.leadsService.getAddSaleCount().subscribe((data: number) => {
      this.addSaleCount = data;
    console.log(data);

    });
  }

  onChengesIsLead() {
    this.leadForm.get('is_lead').valueChanges.subscribe(value => {
      this.isLead = value;
    })
  }

  RequireLinkPhone(): import("@angular/forms").ValidatorFn | import("@angular/forms").ValidatorFn[] | import("@angular/forms").AbstractControlOptions {
    
    return (group : FormGroup): ValidationErrors => {
      const link = group.controls['link'];
      const phone = group.controls['phone'];
      //если поле номер и ссылка заполнены или оба не заполнены, то ошибка валидации
      if(!link.value && !phone.value) {
        link.setErrors({RequireLinkPhone : true});
        phone.setErrors({RequireLinkPhone : true});
        return {RequireLinkPhone : true};
      } else {
        link.setErrors(null);
        phone.setErrors(null);
        return null;
      }
    }
  }
  
  getUsers() {
    this.usersService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  getSources() {
    this.sourcesService.getSources().subscribe((data: Source[]) => {
      this.sources = data;
    });
  }

  get flead() { return this.leadForm.controls }
  get ftask() { return this.taskForm.controls }

  onSubmit() {
    if(this.leadForm.invalid) {
      return;
    }

    //берем из формы все значения и привязываем их к текущей модели
    this.lead = Object.assign(this.leadForm.value, this.leadForm.get('linkPhone').value);
    this.checkLead();

    this.leadFormReset();
    

  }

  onTaskSubmit() {
    if(this.taskForm.invalid) {
      return;
    }

    this.task = Object.assign(this.taskForm.value);
    this.task.is_complete = false;
    this.storeTask();

    this.taskFromReset();
    
  }

  leadFormReset(){
    this.leadForm.reset({
      is_express_delivery : "0",
      is_add_sale : "0",
      is_lead : true,

      text: "",
      responsible_id: ""
    });

    //приводим форму к начальному виду
    Object.keys(this.leadForm.controls).forEach(key => {
      this.resetControlls(this.leadForm.get(key));
    })
    this.resetControlls(this.flead.linkPhone.get('link'));
    this.resetControlls(this.flead.linkPhone.get('phone'));

    this.resetControlls(this.leadForm);

  }

  taskFromReset() {
    this.taskForm.reset({
      description: "", 
      text: "",
      responsible_id: "",
      lead_id: ""
    });

    //приводим форму к начальному виду
    Object.keys(this.taskForm.controls).forEach(key => {
      this.resetControlls(this.taskForm.get(key));
    })
    this.resetControlls(this.taskForm);
  }

  resetControlls (obj: AbstractControl) {
    obj.setErrors(null);
    obj.markAsUntouched();//убираем фокус
    obj.markAsPristine();
  }

  checkLead() {
    this.leadsService.checkLead(this.lead).subscribe((data) => {
      if(data.exist) {
        this.lead.id = data.item.id;
        this.updateLead();
      } else {
        this.storeLead();
      }
    });
  }

  storeLead() {
    this.leadsService.storeLead(this.lead).subscribe((data) => {
      this.toastService.open("Сохранено", "Закрыть", {
        duration: 2000 
      });
    });
  }

  updateLead() {
    this.leadsService.updateLead(this.lead).subscribe((data) => {
      this.toastService.open("Сохранено", "Закрыть", {
        duration: 2000 
      });
    });
  }

  storeTask() {
    this.tasksService.storeTask(this.task).subscribe((data) => {
      this.toastService.open("Сохранено", "Закрыть", {
        duration: 2000 
      });
    });
  }
}
