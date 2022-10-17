import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { Source } from 'src/app/models/source';
import { SourcesService } from 'src/app/services/sources/sources.service';

@Component({
  selector: 'app-modal-sources',
  templateUrl: './modal-sources.component.html',
  styleUrls: ['./modal-sources.component.sass']
})
export class ModalSourcesComponent implements OnInit {
  form : FormGroup;
  source : Source;

  constructor(
    private sourcesService : SourcesService,
    private toastService : MatSnackBar,
    private ref : MatDialogRef<ModalSourcesComponent>,
    @Inject(MAT_DIALOG_DATA) public data : {
      source : Source,
      sources : Source[], 
    }
  ) { 

    this.source = this.data.source;
    if(!this.source) {
      this.source = new Source();
    }
  }

  @Output() onChange = new EventEmitter();

  get f() { return this.form.controls}

  ngOnInit(): void {

    this.form = new FormGroup({
      title : new FormControl(this.source.title)
    });
  }

  onSubmit() {
    if(this.form.invalid) {
      return;
    }

    this.source = Object.assign(this.source, this.form.value);

    if(this.source.id) {
        this.updateSource();
    }
    else {
      this.saveSource();
    }

    this.form.reset();
    this.ref.close();

  }
  
  saveSource() {
    this.sourcesService.saveSource(this.source).subscribe((source) => {
      this.data.sources.push(source);

      this.toastService.open("Сохранено","Закрыть", {
        duration: 2000
      });

      this.onChange.emit();
    });
  }

  updateSource() {
    this.sourcesService.updateSource(this.source).subscribe((source) => {

      this.toastService.open("Сохранено","Закрыть", {
        duration: 2000
      });

      for(var i = 0; i < this.data.sources.length; i++) {
          if(this.data.sources[i].id == source.id) {
              this.data.sources.splice(i,1, source);
          }
      }

      this.onChange.emit();
    });
  }

}