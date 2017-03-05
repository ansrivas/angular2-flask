import {  Headers, RequestOptions } from '@angular/http';

export function jsonHeader() {
  const header = new Headers({ 'Content-Type': 'application/json' });
  const options = new RequestOptions({
    headers: header
  });
  return options;
}
