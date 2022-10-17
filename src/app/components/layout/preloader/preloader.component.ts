import { Component, OnInit } from '@angular/core';
import { PreloaderService } from 'src/app/services/preloader/preloader.service';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.sass']
})
export class PreloaderComponent implements OnInit {

  constructor(
    public preloaderService : PreloaderService
  ) { }

  ngOnInit(): void {
  }

}
