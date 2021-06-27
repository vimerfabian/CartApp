import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: any = {};
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.exitFromLogin();
  }

  login() {
    this.authService.login(this.user.username, this.user.password);
  }

}
