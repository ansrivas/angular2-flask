import { Component, OnInit, Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';


@Injectable()
export class WebService implements OnInit {
  constructor(private authService: AuthenticationService) { }

  ngOnInit() { }

  public getDataFromBackend() {
    return this.authService.postResource('', '/api/getdata');
  }

  public isAuthenticated() {
    if (!this.authService.isAuthenticated()) {
      this.authService.clearUserDataAndRedirect();
    }
  }
}
