import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptionsArgs, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { TokenService } from './token';
import { AppConfig } from '../app.config';


@Injectable()
export class APIService {
    private apiUrl: string;
    private DONE = 4;

    constructor(
        private http: Http,
        private token: TokenService,
    ) {
        this.apiUrl = AppConfig.apiUrl;
    }

    getHeaders(withAuthorization: boolean) {
        if (withAuthorization === undefined) {
            withAuthorization = true;
        }

        let headers = new Headers();
        headers.append('Content-Type', 'application/json')
        headers.append('Accept', 'application/json');

        if (withAuthorization) {
            headers.append('Authorization', `Bearer ${this.token.getToken()}`);
        }

        return headers;
    }

    request(options: any): Observable<any> {
        let url = options.url;
        let headers = this.getHeaders(options.withCredentials);
        let method = options.method || 'GET';

        return this.http.request(url, {
                method: method,
                headers: options.headers || headers,
                body: options.body,
            })
            .map(res => res.json())
            .catch(err => {

                console.log("request error...", err.toString());
                if (err.status !== 200) {
                    return Observable.throw(err.json());
                }

                return Observable.throw("Unhandled error");
            });
    }

    uploadForm(data: FormData, options: any): Observable<any> {
      return Observable.create((observer:Observer<any>) => {
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        let url = options.url;

        xhr.onreadystatechange = () => {
          if(xhr.readyState == this.DONE) {
            if(xhr.status == 200) {
              observer.next(JSON.parse(xhr.response));
              observer.complete();
            }
            else {
              observer.error(xhr.response);
            }
          }
        }

        xhr.open('POST', url, true);
        xhr.send(data);

      });
    }
}
