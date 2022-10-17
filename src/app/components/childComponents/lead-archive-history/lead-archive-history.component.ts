import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Lead } from 'src/app/models/lead';
import { LeadComment } from 'src/app/models/leadComment';
import { LeadCommentService } from 'src/app/services/leadComment/lead-comment.service';

@Component({
  selector: 'app-lead-archive-history',
  templateUrl: './lead-archive-history.component.html',
  styleUrls: ['./lead-archive-history.component.sass']
})
export class LeadArchiveHistoryComponent implements OnInit {

  leadComments : LeadComment[];

  constructor(
    private leadCommentService : LeadCommentService,
    
    @Inject(MAT_DIALOG_DATA) public data : {
      lead : Lead
    } 
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.getLeadComments();
    },10);
  }

  getLeadComments() {
    this.leadCommentService.getComments(this.data.lead.id).subscribe((data: LeadComment[]) => {
      this.leadComments = data;
    });
  }

}
