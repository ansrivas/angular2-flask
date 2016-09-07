import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication';


@Component({
  selector: 'navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  inputLogo = 'assets/img/angularclass-logo.png';
  constructor(private authService: AuthenticationService) { }

  logout() {
    this.authService.logout();
  }
}
