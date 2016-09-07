import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { LoginFormComponent } from './login/login.component';
import { AppState } from './app.service';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  template: `<main>
                <router-outlet></router-outlet>
            </main>`,
  styleUrls: ['./app.style.css']
})
export class App implements OnInit {

  constructor(public appState: AppState) { }

  ngOnInit() {
    console.log('Initial App State');
  }
}
