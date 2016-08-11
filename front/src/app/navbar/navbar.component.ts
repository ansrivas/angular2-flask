import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication';
import { ROUTER_DIRECTIVES }  from '@angular/router';


@Component({
  moduleId: module.id,
  selector: 'navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class NavbarComponent {

  inputLogo = 'assets/img/angularclass-logo.png';
  constructor(private authService: AuthenticationService) { }

  logout() {
    this.authService.logout();
  }
}
