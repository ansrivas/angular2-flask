import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AuthenticationService } from '../authentication';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar';
import { WebService } from '../webservices';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [WebService, AuthenticationService]
})
export class HomeComponent implements OnInit, OnDestroy {

  public heroes = [];
  constructor(private http: Http, private router: Router, private webservice: WebService) { }

  public ngOnInit() {
    this.webservice.isAuthenticated();
  }

  public ngOnDestroy() {
    // Will clear when component is destroyed e.g. route is navigated away from.
    console.log('destroyed');
  }

  public clear() {
    this.heroes = [];
  }

  /**
   * Fetch the data from the python-flask backend
   */
  public getData() {
    this.webservice.getDataFromBackend()
      .subscribe(
      (data) => this.handleData(data),
      (err) => this.logError(err),
      () => console.log('got data')
      );
  }
  private handleData(data: Response) {
    if (data.status === 200) {
      let receivedData = data.json();
      this.heroes = receivedData['Heroes'];
    }
    console.log(data.json());
  }

  private logError(err: Response) {
    console.log('There was an error: ' + err.status);
    if (err.status === 0) {
      console.error('Seems server is down');
    }
    if (err.status === 401) {
      this.router.navigate(['/sessionexpired']);
    }
  }
}
