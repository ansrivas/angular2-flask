import {HTTP_PROVIDERS} from '@angular/http';
import {bootstrap}    from '@angular/platform-browser-dynamic';
import {AppDevice} from './app.device';
import {FORM_PROVIDERS, FormBuilder, Validators} from '@angular/common';
import {TodoService} from './todo-service';

bootstrap(AppDevice, [HTTP_PROVIDERS,FORM_PROVIDERS, TodoService]);

// import {bootstrap}    from '@angular/platform-browser-dynamic';
// import {AppComponent} from './app.component';
//
// bootstrap(AppComponent);
