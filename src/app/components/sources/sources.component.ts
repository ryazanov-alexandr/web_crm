import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Source } from 'src/app/models/source';
import { SourcesService } from 'src/app/services/sources/sources.service';
import { ModalSourcesComponent } from '../childComponents/modal-sources/modal-sources.component';

@Component({
  selector: 'app-sources',
  templateUrl: './sources.component.html',
  styleUrls: ['./sources.component.sass']
})
export class SourcesComponent implements OnInit {

  sources : Source[];
  source : Source;

  dataSource = new MatTableDataSource<Source>();

  constructor(
    private sourcesService : SourcesService,
    private modalService : MatDialog,
    private toastService : MatSnackBar,
    private ref : MatDialogRef<ModalSourcesComponent>,
  ) { }

  ngOnInit(): void {
    this.getSources();
  }

  getSources() {
    this.sourcesService.getSources().subscribe((data: Source[]) => {
      this.sources = data;
      this.dataSource.data = this.sources;
    })
  }

  openSourceModal() {
    this.ref = this.modalService.open(ModalSourcesComponent, {
      data : {
        sources : this.sources,
      }, 
      width : '50%'
    });

    this.ref.componentInstance.onChange.subscribe(() => {
      this.dataSource.data = this.sources;
    })
  }

  editSource(source : Source, index : number) {
    this.source = source;
    this.ref = this.modalService.open(ModalSourcesComponent, {
      data : {
        source : this.source,
        sources : this.sources,
      },
      width : '50%'
    });

    this.ref.componentInstance.onChange.subscribe(() => {
      this.dataSource.data = this.sources;
    })
  }

  deleteSource(source : Source, index : number) {
    if(confirm("Удалить?")) {
      if(index) {
        this.sourcesService.deleteSource(source).subscribe(() => {

          this.sources.splice(index, 1);
          this.dataSource.data = this.sources;

          this.toastService.open("Источник удалён", "Закрыть", {
            duration : 2000
          });
        });
      }
    }
  }

}
