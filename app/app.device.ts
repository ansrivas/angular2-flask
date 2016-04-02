import {Component, Injectable} from 'angular2/core';
import {FORM_PROVIDERS, FormBuilder, Validators, Control, ControlGroup} from 'angular2/common';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { Http, HTTP_PROVIDERS, Headers  } from 'angular2/http';
import {ControlMessages} from './control-message.component';
import {ValidationService} from './validation.service';
import {TodoInput} from './todo-input';
import {TodoService} from './todo-service';
import {TodoList} from './todo-list';
import {StatusSelector} from './status-selector';

@Component({
    selector: 'my-device' ,
    directives: [ControlMessages, TodoInput, TodoList, StatusSelector],
    template: `<header>
    <h1 class="title">Angular 2 HTTP</h1>
    </header>
    <section>
    <h2>Clear Everything
    <button (click)="clearAll()">Clear !</button>
    </h2>
    <hr>
    </section>
    <todo-input> </todo-input>
    <status-selector  (selected)="status=$event"> </status-selector>
    <todo-list [status]="status"> </todo-list>
    <section>
    <h2>Login</h2>
    <form [ngFormModel]="userForm">
    <label for="name">Name</label>
    <input ngControl="name" id="name" />
    <control-messages control="name"></control-messages>

    <label for="password">Password</label>
    <input type="password" ngControl="password" id="password" />


    <label for="email">Email</label>
    <input ngControl="email" id="email" />
    <control-messages control="email"></control-messages>

    <button type="submit" (click)="saveUser()" [disabled]="!userForm.valid">Submit</button>
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

    randomQuote: string;
    secretQuote: string;
    userForm: ControlGroup;
    user: Control;
    email_add: Control;
    password : Control;
    status : string;

    logError(err) {
        console.error('There was an error: ' + err);
    }

    constructor(private _formBuilder: FormBuilder,
        public http: Http) {

            this.user = new Control('', Validators.required);
            this.password = new Control('', Validators.required);
            this.email_add = new Control('', Validators.compose([Validators.required, ValidationService.emailValidator]));
            this.userForm = this._formBuilder.group({
                name: this.user,
                email: this.email_add,
                password : this.password
            });
        }

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
                () => console.log('Secret Quote Complete')
            );
        }

        clearAll() {
            this.randomQuote = "";
            this.secretQuote = "";

        }

        saveUser() {

            if (this.userForm.dirty && this.userForm.valid) {

                let creds = JSON.stringify({ username: this.user.value, email: this.email_add.value });

                var headers = new Headers();
                headers.append('Content-Type', 'application/json');

                this.http.post('http://localhost:8888/authenticate', creds, {
                    headers: headers
                })
                .subscribe(
                    data => this.save(data),
                    err => this.logError(err),
                    () => console.log('Authentication Complete')
                );

            }
        }

        save(data) {
            console.log('Logged into somewhere', data);
        }
    }
