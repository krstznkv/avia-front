import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';
import {TicketService} from './ticket.service';

export class HttpInterceptorService implements HttpInterceptor{
  constructor(private service: ApiService, private service2: TicketService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.service.isUserLoggedIn() && req.url.indexOf('login') === -1 && req.url.indexOf('registration') === -1) {
      const authReq = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Basic ${window.btoa(this.service.username + ':' + this.service.password)}`
        })
      });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
