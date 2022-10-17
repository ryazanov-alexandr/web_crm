import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Lead } from 'src/app/models/lead';
import { LeadsService } from 'src/app/services/leads/leads.service';
import { LeadArchiveHistoryComponent } from '../../../childComponents/lead-archive-history/lead-archive-history.component';

@Component({
  selector: 'app-lead-archive',
  templateUrl: './lead-archive.component.html',
  styleUrls: ['./lead-archive.component.sass']
})
export class LeadArchiveComponent implements OnInit {

  page: number;
  leads: Lead[];
  search: string = "";

  dLeadQuality: boolean = false;
  dLeadQualityFalse: boolean = false;

  constructor(
    private leadsService: LeadsService,
    private modalService: MatDialog
  ) { 
    this.page = 1;
    this.leads = [];
  }

  ngOnInit(): void {
    this.getLeads();
  }

  getLeads() {
    this.leadsService.getArchiveLeads(this.page).subscribe((data) => {
      
      let tmpLeads: Lead[] = this.leads;
      
      data.forEach(function(item) {
        tmpLeads.push(item);
      });
      
      this.leads = tmpLeads;
    })
  }

  loadLead() {
    ++this.page;
    this.getLeads();
  }

  openHistory(event, lead : Lead, i : number, leads : Lead[]) {
    this.modalService.open(LeadArchiveHistoryComponent, {
      data : {
        lead : lead
      },
      width : "80%"
    });
  }

  onSubmit(emailOrPhone: string) {
    this.search = emailOrPhone;
    (<HTMLInputElement>document.getElementById("emailOrPhone")).value= null;
  }
}
