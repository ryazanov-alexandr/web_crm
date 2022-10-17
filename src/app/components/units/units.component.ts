import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Unit } from 'src/app/models/unit';
import { UnitsService } from 'src/app/services/units/units.service';
import { ModalUnitsComponent } from '../childComponents/modal-units/modal-units.component';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.sass']
})
export class UnitsComponent implements OnInit {

  units : Unit[];
  unit : Unit;

  dataSource = new MatTableDataSource<Unit>();

  constructor(
    private unitsService : UnitsService,
    private modalService : MatDialog,
    private toastService : MatSnackBar,
    private ref : MatDialogRef<ModalUnitsComponent>,
  ) { }

  ngOnInit(): void {
    this.getUnits();
  }

  getUnits() {
    this.unitsService.getUnits().subscribe((data: Unit[]) => {
      this.units = data;
      this.dataSource.data = this.units;
    })
  }

  openUnitModal() {
    this.ref = this.modalService.open(ModalUnitsComponent, {
      data : {
        units : this.units,
      }, 
      width : '50%'
    });

    this.ref.componentInstance.onChange.subscribe(() => {
      this.dataSource.data = this.units;
    })
  }

  editUnit(unit : Unit, index : number) {
    this.unit = unit;
    this.ref = this.modalService.open(ModalUnitsComponent, {
      data : {
        unit : this.unit,
        units : this.units,
      },
      width : '50%'
    });

    this.ref.componentInstance.onChange.subscribe(() => {
      this.dataSource.data = this.units;
    })
  }

  deleteUnit(unit : Unit, index : number) {
    if(confirm("Удалить подразделение?")) {
      if(index) {
        this.unitsService.deleteUnit(unit).subscribe(() => {

          this.units.splice(index, 1);
          this.dataSource.data = this.units;

          this.toastService.open("Подразделение удалёно", "Закрыть", {
            duration : 2000
          });
        });
      }
    }
  }

}

