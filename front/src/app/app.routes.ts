import { Routes, RouterModule } from '@angular/router';
import { SessionExpiredComponent, PageNotFoundComponent }  from './utils';
import { LoginFormComponent } from './login';
import { ErrorMessage } from './errormessage';
import { HomeComponent } from './home';

import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: 'login', component: LoginFormComponent },
  { path: 'sessionexpired', component: SessionExpiredComponent },
  { path: 'forgot-password', component: ErrorMessage },
  { path: 'home', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent },
];
