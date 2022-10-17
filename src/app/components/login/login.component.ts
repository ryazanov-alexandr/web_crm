import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ResponseHttp } from 'src/app/models/responseHttp';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public submitted: boolean = false; //была ли отправлена форма
  public loading: boolean = false;//отправляется ли форма 
  public returnUrl: string = "/home"; //путь куда будет перенаправлен юзер посл auth 
  public error: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  get f() {
    return this.loginForm.controls;//получаем доступ к контролам формы(email, pas)
  }

  ngOnInit(): void {
    this.userLogout();
    this.setLoginForm();
  }

  userLogout() : void {
    this.authService.logout();
    setTimeout(() => {
      this.router.navigate(['login'])
    },100);
  }

  setLoginForm() : void {
    this.loginForm = this.formBuilder.group({
      email : ['', Validators.required],
      password : ['', Validators.required]
    });
  }

  //при отправке формы
  onSubmit() : boolean {
    this.submitted = true;

    //правильно ли заполнена форма
    if(this.loginForm.invalid) {
      return false;
    }


    this.authService.login(this.f.email.value, this.f.password.value)
    .pipe(catchError((error: any) => {

      this.error = (error.error as ResponseHttp).errors.message;
      return throwError(error);
    }))
    .subscribe((data) => {
      if(data) {
        this.router.navigate(this.redirectTo())
      }
    });

    return true;
  }

  redirectTo(): any[] {
    if(this.route.snapshot.paramMap.get('returnUrl')) {
      return [this.route.snapshot.paramMap.get('returnUrl')];
    }

    return [this.returnUrl];

  }

}
