import { Component, Injectable, ViewChild, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { AuthenticationService } from '../authentication/authentication.service';
import { UserComponent } from '../utils/user';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: `login`,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  // Here we tell Angular that we want the form
  // directives to be available in this component
  providers: [AuthenticationService]
})
export class LoginFormComponent implements OnInit {

  public inputLogo = 'assets/img/angularclass-logo.png';
  public model: UserComponent = new UserComponent(1, '', '');
  public logintext: string = 'Sign in to continue to the portal';
  public color: string = 'black';
  public myForm: FormGroup;
  public forgotPassword: boolean = false;

  constructor(private _service: AuthenticationService, private router: Router) {
    let group: any = {};
    group.username = new FormControl('', Validators.required);
    group.password = new FormControl('', Validators.required);
    group.type = new FormControl('login');
    this.myForm = new FormGroup(group);
  }

  public ngOnInit() {
    console.log('Inside the login page');

    if (this._service.isAuthenticated()) {
      console.log('We are authenticated, why go to login page again');
      this.router.navigate(['/home']);
    }
  }

  public loginUser() {

    let body = {
      username: this.myForm.controls['username'].value,
      password: this.myForm.controls['password'].value
    };
    this._service.login(body)
      .subscribe((data) => {
        this.router.navigate(['/home']);
      },
      (error) => this.handleError(error)
      );
  }
  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    this.color = 'red';
    this.logintext = errMsg;
    return Observable.throw(errMsg);
  }
}
