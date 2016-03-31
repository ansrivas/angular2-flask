import {HTTP_PROVIDERS} from 'angular2/http';
import {bootstrap}    from 'angular2/platform/browser';
import {AppDevice} from './app.device';
import {FORM_PROVIDERS, FormBuilder, Validators} from 'angular2/common';
import {TodoService} from './todo-service';

bootstrap(AppDevice, [HTTP_PROVIDERS,FORM_PROVIDERS, TodoService]);
