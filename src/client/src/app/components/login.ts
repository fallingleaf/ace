import { Component, Input, OnChanges } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../services/auth';
import { User } from '../models/User';


@Component({
  selector: 'login-form',
  templateUrl: '../templates/login.html',
  styleUrls: ['../css/login.css']
})

export class LoginComponent {
  loginForm: FormGroup;

  errorMessage: string = '';

  constructor(
    private auth: AuthService,
    private fb: FormBuilder) {
      this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  onSubmit() {
    const user = this.loginForm.value;
    this.auth.login(user).subscribe(
      result => { console.log(result) },
      err => { this.errorMessage = err; }
    );
    // this.loginForm.reset();
  }

}
