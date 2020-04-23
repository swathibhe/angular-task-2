import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppData } from '../services/app-data.service';
import { map } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = AppData.token.value;
    let headers = req.headers;
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Content-Type', 'application/json');
    if (token) {
      headers = headers.append('x-access-token', token);
    }
    req = req.clone({ headers });
    // return next.handle(req);
    return next.handle(req)
      .pipe(map(event => {
        if (event instanceof HttpResponse) {
          if (event.headers.get('x-access-token')) {
            AppData.token.next(event.headers.get('x-access-token'));
            //	this.storage.setItem('token', token);
            console.log(event.headers.get('x-access-token'));

          }
        }
        return event;
      }));
  }
}