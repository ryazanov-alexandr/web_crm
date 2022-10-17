import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Lead } from 'src/app/models/lead';
import { Permission } from 'src/app/models/permission';
import { LeadsService } from 'src/app/services/leads/leads.service';
import { UsersService } from 'src/app/services/users/users.service';
import { ModalHistoryComponent } from '../childComponents/modal-history/modal-history.component';
import { ModalLeadComponent } from '../childComponents/modal-lead/modal-lead.component';
import { ModalQualityComponent } from '../childComponents/modalQuality/modal-quality/modal-quality.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  nLeads: Lead[];//новые лиды
  dLeads: Lead[];//завершенные лиды
  processingLeads: Lead[];//в процессе

  leadExpress : boolean = false;//нужно ли фильтровать лиды по доставке
  leadProcessExpress : boolean = false;
  search :string = "";

  dLeadQuality : boolean = false;//качественный ли лид
  dLeadQualityFalse : boolean = false;

  permissions: Permission[] = [];
  existPerm: boolean = false;
  
  constructor(
    private leadsService : LeadsService,
    private usersService : UsersService,
    private toastService : MatSnackBar,
    private modalService : MatDialog,
    private bottomSheet : MatBottomSheet,  
  ) { }

  ngOnInit(): void {
    this.getLeads();
    this.getPermissions();

    console.log(this.nLeads);
  }

  onSubmit(emailOrPhone: string) {
    this.search = emailOrPhone;
    (<HTMLInputElement>document.getElementById("emailOrPhone")).value= null;
  }

  getLeads() {
    this.leadsService.getLeads().subscribe((data) => {
      console.log(data.new);
      this.nLeads = data.new;
      this.dLeads = data.done;
      this.processingLeads = data.process;
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

  openHistory(event, lead: Lead, index: number, leads: Lead[]) : void {
    let modalComponentRef = this.modalService.open(ModalHistoryComponent, {
      width : "80%",
      data : {
        nLeads : this.nLeads,
        processingLeads : this.processingLeads,
        dLeads : this.dLeads,
        lead : lead,
        leads : leads,
        index : index
      }
    });

    modalComponentRef.componentInstance.onQuality.subscribe((data: Lead) => {
      this.bottomSheet.open(ModalQualityComponent, {
        data : {
          lead : data,
          dLeads : this.dLeads, 
        }
      });
    });

    
  }

  dateCheck(updated_at: number, numb: number, type: string) : boolean {
    if(type == "less") {
      return this.dateHelper('h', new Date(updated_at*1000), new Date()) < numb
    }

    if(type == "more") {
      return this.dateHelper('h', new Date(updated_at*1000), new Date()) > numb
    }
    
    return false;
  }

  //возвращает разницу между сегодня и датой создания лида в требуемом формате 
  dateHelper(datePart: string, fromDate: any, today: any) : number {
    datePart = datePart.toLowerCase();
    let diff = today - fromDate;

    let divideBy = {
      w: 604800000,//недели
      d: 86400000,//дни
      h: 3600000,//часы
      m: 60000,//минуты
      s: 1000//секунды
    };

    return Math.floor(diff/divideBy[datePart]);
  }

  timeStr(fromDate : any) : string {
    let resultDate = this.dateHelper('h', new Date(fromDate*1000), new Date());

    let result = "";

    if(resultDate < 24) {
      result = "до 24 часов";
    } else if(resultDate > 24 && resultDate < 48) {
      result = "24-48 часа";
    } else if(resultDate > 48 && resultDate < 72) {
      result = "48-72 часа";
    } else {
      result = "72 часа и более";
    }

    return result;
  }


  openSourceModal() : void {
    this.modalService.open(ModalLeadComponent, {
      data : {
        leads : this.nLeads,
        processingLeads : this.processingLeads,
        dLeads : this.dLeads,
      },
      width: '80%'
    });
  }
}