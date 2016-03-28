import {Component, Injectable} from 'angular2/core';
import {FORM_PROVIDERS, FormBuilder, Validators} from 'angular2/common';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { Http, HTTP_PROVIDERS,Headers  } from 'angular2/http';
import {ControlMessages} from './control-message.component';
import {ValidationService} from './validation.service';

@Component({
    selector: 'my-device',
    template: `<header>
    <h1 class="title">Angular 2 HTTP</h1>
    </header>
    <section>
    <h2>Clear Everything
    <button (click)="clearAll()">Clear !</button>
    </h2>
    <hr>
    </section>


    <section>
    <h2>Login</h2>
    <form [ngFormModel]="userForm" (submit)="saveUser(userForm.value)">
    <label for="name">Name</label>
    <input ngControl="name" id="name" />
    <control-messages control="name"></control-messages>

    <label for="email">Email</label>
    <input ngControl="email" id="email" />
    <control-messages control="email"></control-messages>

    <button type="submit" [disabled]="!userForm.valid">Submit</button>
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
    <section>` ,
    directives: [ControlMessages]
})


@Injectable()
export class AppDevice {
    title: string;
    data: string;
    username: string;
    email:string;
    randomQuote: string;
    secretQuote: string;
    userForm: any;

    logError(err) {
        console.error('There was an error: ' + err);
    }


    constructor(private _formBuilder: FormBuilder,
        public http: Http) {

            this.userForm = this._formBuilder.group({
                'name': ['', Validators.required],
                'email': ['', Validators.compose([Validators.required, ValidationService.emailValidator]) ] });


                this.username = this.userForm.controls['name'];
                this.email = this.userForm.controls['email']


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

            clearAll(){
                this.randomQuote = "";
                this.secretQuote = "";

            }

            saveUser() {

                if (this.userForm.dirty && this.userForm.valid) {
                    let user = this.userForm.value.name;
                    let em = this.userForm.value.email;
                    let creds = JSON.stringify({ username: user, email: em });

                    var headers = new Headers();
                    headers.append('Content-Type', 'application/json');

                    this.http.post('http://localhost:8888/authenticate', creds, {
                        headers: headers
                    })
                    .subscribe(
                        data => this.save(data) ,
                        err => this.logError(err),
                        () => console.log('Authentication Complete')
                    );

                }
            }

            save(data) {
                console.log('Logged into somewhere', data);
            }
        }
