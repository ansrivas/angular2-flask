import {Component, Injectable} from 'angular2/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { Http, HTTP_PROVIDERS  } from 'angular2/http';

@Component({
    selector: 'my-device',
    template: `<header>
    <h1 class="title">Angular 2 HTTP</h1>
  </header>
  <section>
    <h2>Login</h2>
    <form role="form">
      <div ng-control-group="credentials">
        <label for="username">Username</label>
        <input
          type="text"
          #username
          id="username"
          ng-control="username"
          required>
        <label for="password">Password</label>
        <input
          type="password"
          #password
          id="password"
          ng-control="password"
          required>
      </div>
      <button (click)="authenticate(username, password)">Login!</button>
    </form>
  </section>
  <section>
    <h2>Random Quote</h2>
    <hr>
    <h3>{{ randomQuote }}</h3>
    <button (click)="getRandomQuote()">Get Random Quote!</button>
  <section>
  <section>
    <h2>Secret Quote</h2>
    <hr>
    <h3>{{ secretQuote }}</h3>
    <button (click)="getSecretQuote()">Get Secret Quote!</button>
  <section>`
})



@Injectable()
export class AppDevice {
    title: string;
    data: string;
    quote: string;
    username: string;
    password: string;
    randomQuote: string;
    secretQuote: string;

    logError(err) {
      console.error('There was an error: ' + err);
    }

    constructor(public http: Http) {}

    getRandomQuote() {
      this.http.get('http://localhost:8888/hello')
        .subscribe(
          data => this.randomQuote = data.text(),
          err => this.logError(err.text()),
          () => console.log('Random Quote Complete')
        );
    }
}
