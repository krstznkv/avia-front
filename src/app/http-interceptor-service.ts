import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';
import {Injectable} from '@angular/core';
@Injectable()
export class HttpInterceptorService implements HttpInterceptor{

  constructor(private service: ApiService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.service.isUserLoggedIn() && req.url.indexOf('login') === -1 && req.url.indexOf('registration') === -1) {
      const authReq = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Basic ${window.btoa(sessionStorage.getItem(this.service.USER_NAME_SESSION_ATTRIBUTE_NAME)
            + ':'
            + sessionStorage.getItem(this.service.USER_PASSWORD_SESSION_ATTRIBUTE_PASSWORD))}`
        })
      });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
  // Authorization: `Basic ${window.btoa(this.service.username + ':' + this.service.password)}`
}
