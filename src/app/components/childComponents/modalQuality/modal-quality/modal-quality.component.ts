import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Lead } from 'src/app/models/lead';
import { LeadsService } from 'src/app/services/leads/leads.service';

@Component({
  selector: 'app-modal-quality',
  templateUrl: './modal-quality.component.html',
  styleUrls: ['./modal-quality.component.sass']
})
export class ModalQualityComponent implements OnInit {

  constructor(
    private leadService : LeadsService, 
    private toastService: MatSnackBar,
    private dialogRef: MatBottomSheetRef<ModalQualityComponent>,

    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {
      lead : Lead,
      dLeads : Lead[]
    }
  ) { }

  ngOnInit(): void {
  }


  addQuality() {
    this.leadService.addQuality(this.data.lead).subscribe((data: Lead) => {
      this.toastService.open("Сохранено", "Закрыть", {
        duration: 2000
      });

      let index: number = undefined;
      this.data.dLeads.forEach(function(itme, i) {
        if(itme.id == data.id) {
          index = i
        }
      })

      if(index != undefined) {
        this.data.dLeads.splice(index, 1, data);
      }

      this.dialogRef.dismiss();

    });
  }

  closeModal() {
    this.dialogRef.dismiss();
  }

}
