import {HTTP_PROVIDERS} from 'angular2/http';
import {bootstrap}    from 'angular2/platform/browser';

import {AppDevice} from './app.device';

bootstrap(AppDevice, [HTTP_PROVIDERS]);
