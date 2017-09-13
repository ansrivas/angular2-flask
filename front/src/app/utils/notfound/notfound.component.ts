import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  template: `
  <div class="container">
    <div class="row">
      <div class="span12">
        <div class="hero-unit center">
            <h1>Page Not Found <small><font face="Tahoma" color="red">Error 404</font></small></h1>
            <br />
            <p>The page you requested could not be found, either contact your webmaster</p>
            <p> Use your browsers <b>Back</b> button to go back</p>
            <p><b>Or you could just press this neat little button:</b></p>
            <a (click)="redirectToLogin()" class="btn btn-large btn-info"> Take me to login page</a>
          </div>
          <br />
          <!-- By ConnerT HTML & CSS Enthusiast -->
      </div>
    </div>
  </div>
    `,
  styles: [`.center {text-align: center; margin-left: auto; \
     margin-right: auto; margin-bottom: auto; margin-top: auto;}`]
})
export class NotFoundComponent {
  constructor(private router: Router) { }
  public redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
