import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Navigation } from 'src/app/models/navigation';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.sass']
})
export class LayoutComponent implements OnInit {

  navigation : Navigation[];
  navMenu : boolean = true;//нужно ли показать навигационную панель
  
  constructor(
    private navigationService : NavigationService,
    private router : Router,
    private authService : AuthService
  ) { 
    //подписываемся на успешное событие перехода по маршрутизатору
    this.router.events.pipe(
      filter((event : any) => event instanceof NavigationEnd)
    ).subscribe((url : any) => {
      //проверяем на какой странице находимся
      if(url.url && url.url.indexOf('login') != 1) {
        //аутентифицировался ли юзер и есть ли меню
        if(this.authService.checkUser() && !this.navigation) {
          this.getMenu();
        }
      }
    });
  }

  ngOnInit(): void {
    //this.getMenu();
  }

  getMenu() : void {
      this.navigationService.getNavigation().subscribe(
        (data : Navigation[]) => {
            this.navigation = data;
            this.navigation.unshift({id: 16, title: 'Главная', path: 'home', parent: 0});
            this.navigation.push({id: 16, title: 'Выйти', path: 'logout', parent: 0});
            console.log(this.navigation);
        }
      );
  }

}