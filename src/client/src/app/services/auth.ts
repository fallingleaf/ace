import { Injectable, Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { User } from '../models/User';

import { TokenService } from './token';
import { APIService } from './api';

@Injectable()
export class AuthService {
  private tokenName = 'auth.token';

  constructor(private token: TokenService, private api: APIService) { }

  isLoggedIn(): boolean {
      let token = this.token.getToken();
      return token !== null;
      // return tokenNotExpired(null, token);
  }

  login(user: User): Observable<boolean> {
      let headers: Headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      return this.api.request({
          url: '/auth/token/',
          method: 'POST',
          headers: headers,
          body: `email=${user.email}&password=${user.password}`,
          withAuthorization: false,
      })
      .map(res => {
          let token = res['token'];
          console.log("token ...", token);

          if (!token) {
              throw new Error("no token in response");
          }

          this.token.storeToken(token);
          return true;
      });
  }

  register(user: User): Observable<boolean> {
      return this.api.request({
          url: '/api/register/',
          method: 'POST',
          body: JSON.stringify({ name: user.name, email: user.email, password: user.password }),
          withAuthorization: false,
      })
          .map(res => {
              let meta = res.meta;
              if (!meta) {
                  throw new Error("no meta in response");
              }
              if (meta.status < 200 || meta.status > 300) {
                  return false;
              }
              return true;
          });
  }
}
