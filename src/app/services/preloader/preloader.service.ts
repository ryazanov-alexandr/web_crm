import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreloaderService {

  public static fullLoadingCount: number = 0;

  constructor() { 

  }

  getPreloaderCount() : number {
    return PreloaderService.fullLoadingCount;
  }

  showPreloader() : void {
    PreloaderService.fullLoadingCount++;
  }

  hidePreloader() : void {
    PreloaderService.fullLoadingCount--;
  }
}
