import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'session-expired',
  template: `<div class="well center-block" style="width:300px;">
                  <div class="panel panel-danger">
                  <div class="panel-heading text-center center-block">
                  Sorry your session has expired !</div>
                  <div class="panel-body">
                    <a class="btn btn-large btn-info center-block"
                        (click)="redirectToLogin()" >
                        Login
                    </a>
                  </div>
            </div>
            </div>`
})
export class SessionExpiredComponent {
  constructor(private router: Router) { }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
