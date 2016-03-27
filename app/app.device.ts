import {Component, Injectable} from 'angular2/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { Http, HTTP_PROVIDERS,Headers  } from 'angular2/http';

@Component({
    selector: 'my-device',
    template: `<header>
    <h1 class="title">Angular 2 HTTP</h1>
    </header>
    <section>
    <h2>Clear Everything
    <button (click)="clearAll()">Clear !</button>
    </h2>
    </section>
    <section>
    <h2>Login</h2>
    <form role="form">
    <div ng-control-group="credentials">
    <label for="username">Username</label>
    <input type="text" #username id="username" ng-control="username" required>
    <label for="password">Password</label>
    <input  type="password" #password id="password" ng-control="password" required>
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
        this.http.get('http://localhost:8888/random')
        .subscribe(
            data => this.randomQuote = data.text(),
            err => this.logError(err.text()),
            () => console.log('Random Quote Complete')
        );
    }

    getSecretQuote() {
        this.http.get('http://localhost:8888/secret')
        .subscribe(
            data => this.secretQuote = data.text(),
            err => this.logError(err.text()),
            () => console.log('Random Quote Complete')
        );
    }

    clearAll(){
        this.randomQuote = "";
        this.secretQuote = "";

    }
    authenticate(data) {
        var username = data.credentials.username;
        var password = data.credentials.password;

        var creds = "username=" + username + "&password=" + password;

        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        this.http.post('http://localhost:8888/authenticate', creds, {
            headers: headers
        })
        .map(res => res.json())
        .subscribe(
            data => this.saveJwt(data.id_token),
            err => this.logError(err),
            () => console.log('Authentication Complete')
        );
    }

    saveJwt(jwt) {
            console.log('Authentication Complete', jwt);
    }
}
class CredentialsModel {
    username: string;
    password: string;
}
