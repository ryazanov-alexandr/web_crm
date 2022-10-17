import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Unit } from 'src/app/models/unit';
import { UnitsService } from 'src/app/services/units/units.service';

@Component({
  selector: 'app-modal-units',
  templateUrl: './modal-units.component.html',
  styleUrls: ['./modal-units.component.sass']
})
export class ModalUnitsComponent implements OnInit {
  form : FormGroup;
  unit : Unit;

  constructor(
    private unitsService : UnitsService,
    private toastService : MatSnackBar,
    private ref : MatDialogRef<ModalUnitsComponent>,
    @Inject(MAT_DIALOG_DATA) public data : {
      unit : Unit,
      units : Unit[], 
    }
  ) { 

    this.unit = this.data.unit;
    if(!this.unit) {
      this.unit = new Unit();
    }
  }

  @Output() onChange = new EventEmitter();

  get f() { return this.form.controls}

  ngOnInit(): void {

    this.form = new FormGroup({
      title : new FormControl(this.unit.title)
    });
  }

  onSubmit() {
    if(this.form.invalid) {
      return;
    }

    this.unit = Object.assign(this.unit, this.form.value);

    if(this.unit.id) {
        this.updateUnit();
    }
    else {
      this.saveUnit();
    }

    this.form.reset();
    this.ref.close();

  }
  
  saveUnit() {
    this.unitsService.saveUnit(this.unit).subscribe((unit) => {
      this.data.units.push(unit);

      this.toastService.open("Сохранено","Закрыть", {
        duration: 2000
      });

      this.onChange.emit();
    });
  }

  updateUnit() {
    this.unitsService.updateUnit(this.unit).subscribe((unit) => {

      this.toastService.open("Сохранено","Закрыть", {
        duration: 2000
      });

      for(var i = 0; i < this.data.units.length; i++) {
          if(this.data.units[i].id == unit.id) {
              this.data.units.splice(i,1, unit);
          }
      }

      this.onChange.emit();
    });
  }

}