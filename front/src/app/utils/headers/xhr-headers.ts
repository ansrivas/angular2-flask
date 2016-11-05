import {  Headers, RequestOptions } from '@angular/http';

export function jsonHeader() {
  const headers = new Headers({ 'Content-Type': 'application/json' });
  const options = new RequestOptions({ headers: headers });
  return options;
}
