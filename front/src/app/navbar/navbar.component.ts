import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication';

@Component({
  selector: 'navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  public inputLogo = 'assets/img/angularclass-logo.png';
  constructor(private authService: AuthenticationService) { }

  public logout() {
    this.authService.logout();
  }
}
