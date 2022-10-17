import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Lead } from 'src/app/models/lead';
import { LeadComment } from 'src/app/models/leadComment';
import { Status } from 'src/app/models/status';
import { User } from 'src/app/models/user';
import { LeadCommentService } from 'src/app/services/leadComment/lead-comment.service';
import { StatusService } from 'src/app/services/status/status.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-modal-history',
  templateUrl: './modal-history.component.html',
  styleUrls: ['./modal-history.component.sass']
})
export class ModalHistoryComponent implements OnInit {

  form: FormGroup;
  statuses: Status[];
  users : User[];
  
  leadComments : LeadComment[] = [];
  leadComment: LeadComment;
  oldResponsibleId: number

  constructor(
    private toastService: MatSnackBar,
    private leadCommentService : LeadCommentService,
    private userService : UsersService,
    private statusService : StatusService,
    private dialogRef: MatDialogRef<ModalHistoryComponent>,
  

    @Inject(MAT_DIALOG_DATA) public data: {
      nLeads : Lead[],
      processingLeads : Lead[],
      dLeads : Lead[],
      lead : Lead,
      leads : Lead[],
      index : number
    }

  ) { 
  }

  @Output() onQuality = new EventEmitter();

  get f() { return this.form.controls }

  ngOnInit(): void {
    
    if(!this.data.lead) {
      this.data.lead = new Lead();
    }

    setTimeout(() => {
      this.getStatuses();
      this.getLeadComments();
      this.getUsers();
    },10);
    

    this.form = new FormGroup({
      text : new FormControl(""),
      status_id : new FormControl(this.data.lead.status_id),
      responsible_id : new FormControl(this.data.lead.responsible_id),
    });

    this.oldResponsibleId = this.data.lead.responsible_id;
  }
  getUsers () {
    this.userService.getUsers()
      .subscribe((data: User[]) =>  {
        this.users = data;
      });
  }
  getLeadComments() {
    this.leadCommentService.getComments(this.data.lead.id).subscribe((data: LeadComment[]) => {
      this.leadComments = data;
    });
  }
  
  getStatuses() {
    this.statusService.getStatuses().subscribe((data: Status[]) => {
      this.statuses = data;
    });
  }

  onSubmit() {

    if(this.form.invalid) {
      return;
    }

    this.storeLeadComment();
    this.dialogRef.close();


  }
  storeLeadComment() {
    this.leadComment = Object.assign(this.form.value);
    this.leadComment.lead_id = this.data.lead.id;

    this.leadCommentService.storeLeadComment(this.leadComment).subscribe((data: Lead) => {
      this.toastService.open('Сохранено','Закрыть',{
        duration: 2000
      });

      let userId = (JSON.parse(sessionStorage.getItem('currentUser'))).id;
      console.log(this.data.leads);
      this.data.leads.splice(this.data.index, 1);

      if (data.responsible_id == this.oldResponsibleId || userId == this.data.lead.user_id) {
        if(data.status.title_ru == "Новые заявки") {
          this.data.nLeads.push(data);
        }
        else if(data.status.title_ru == "В работе") {
          this.data.processingLeads.push(data);
        }
        else if(data.status.title_ru == "Выполнено") {
          this.data.dLeads.push(data);
  
          this.onQuality.emit(data);
        } 
      }


      
     

    });

    
  }

}
