import { WebpackAsyncRoute } from '@angularclass/webpack-toolkit';
import { provideRouter, RouterConfig } from '@angular/router';
import { SessionExpiredComponent, PageNotFoundComponent }  from './utils';
import { LoginFormComponent } from './login';
import { ErrorMessage } from './errormessage';
import { HomeComponent } from './home';
import { DataResolver } from './app.resolver';

export const routes: RouterConfig = [
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

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];


// Async load a component using Webpack's require with es6-promise-loader and webpack `require`
// asyncRoutes is needed for our @angularclass/webpack-toolkit that will allow us to resolve
// the component correctly

// export const asyncRoutes: AsyncRoutes = {
//   // we have to use the alternative syntax for es6-promise-loader to grab the routes
//   'About': require('es6-promise-loader!./about'),
//   'Detail': require('es6-promise-loader!./+detail'),
// };


// Optimizations for initial loads
// An array of callbacks to be invoked after bootstrap to prefetch async routes
// export const prefetchRouteCallbacks: Array<IdleCallbacks> = [
//   asyncRoutes['About'],
//   asyncRoutes['Detail'],
//   // es6-promise-loader returns a function
// ];


// Es6PromiseLoader and AsyncRoutes interfaces are defined in custom-typings
