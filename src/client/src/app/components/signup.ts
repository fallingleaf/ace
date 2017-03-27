import { Component, Input, OnChanges } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../services/auth';
import { User } from '../models/User';


@Component({
  selector: 'signup-form',
  templateUrl: '../templates/signup.html',
  styleUrls: ['../css/login.css']
})

export class SignupComponent {
  signupForm: FormGroup;

  errorMessage: string = '';

  constructor(
    private auth: AuthService,
    private fb: FormBuilder) {
      this.createForm();
  }

  createForm() {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    const user = this.signupForm.value;
    this.auth.register(user).subscribe(
      result => { console.log(result) },
      err => { this.errorMessage = err; }
    );
    // this.loginForm.reset();
  }

}
