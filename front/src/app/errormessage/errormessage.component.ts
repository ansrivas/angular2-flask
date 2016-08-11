import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {  NgForm } from '@angular/common';
import { FormGroup, Validators,
  FormControl, FormControlName,
  REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { disableDeprecatedForms, provideForms } from '@angular/forms';


class Email {
  constructor(public emailAddress: string) {

  }
}

@Component({
  selector: 'app-error-message',
  template: require('./errormessage.component.html'),
  styles: [require('./errormessage.component.css')],
  directives: [REACTIVE_FORM_DIRECTIVES]
})
export class ErrorMessage {

  textmessage: string = 'Forgot your password ?';
  emailModel: Email = new Email('');
  form;

  constructor(private router: Router) {
    let group: any = {};
    group.email = new FormControl('', Validators.required);
    group.type = new FormControl('forgotpass');
    this.form = new FormGroup(group);
  }


  resetPassword() {
    console.log('Reset email is ', this.form.value['email']);
    this.textmessage = 'Reset successful, redirecting !';
    // setTimeout(function() {
    //   window.location.reload();
    // }, 2000);
  }

}
