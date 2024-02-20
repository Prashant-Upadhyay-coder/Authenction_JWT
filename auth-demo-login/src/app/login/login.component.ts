import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email!: string;
  password!: string;
  role!: string;
  error!: string;
  token!: string | null;


  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  login() {
    this.authenticationService.login(this.email, this.password, this.role)
      .subscribe(
        response => {
          this.token = this.authenticationService.getToken();
          console.log('Login successful');
        },
        error => {
          console.error('Login failed', error);
        }
      );
  }
}
