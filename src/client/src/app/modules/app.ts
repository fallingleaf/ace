import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { AppComponent } from '../components/app';
import { HomeComponent } from '../components/home';
import { PostComponent } from '../components/post';
import { LoginComponent } from '../components/login';
import { SignupComponent } from '../components/signup';
import { NewPostComponent } from '../components/newPost';

import { AuthService } from '../services/auth';
import { TokenService } from '../services/token';
import { APIService } from '../services/api';

import { AppRoutingModule } from './routing';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostComponent,
    LoginComponent,
    SignupComponent,
    NewPostComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [APIService, AuthService, TokenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
