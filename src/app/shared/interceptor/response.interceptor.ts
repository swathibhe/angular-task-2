import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
    HttpResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ToastService } from '../services/toast.service';
import { AuthService } from 'src/app/core/services/authguard/auth.service';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
	/**
   *
   * @param req
   * @param next
   * expected output from api : {message:"", data:[] | {} }
   */
    constructor(private toasterService: ToastService, private authService: AuthService) { }
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            map((event: HttpEvent<any>) => {
                // if (
                // 	event instanceof HttpResponse &&
                // 	Math.floor(event.status / 100) === 2
                // ) {
                // 	console.log('HttpResponse::event =', event, ';');
                // 	this.toasterService.presentToast(event.body.message, 'Success', 'success');
                // } else {
                // 	console.log('event =', event, ';');
                // }
                return event;
            }),
            catchError((err: any, caught) => {
                if (err instanceof HttpErrorResponse) {
                    if (Math.floor(err.status / 100) === 4) {
                        // handle 400 errors
                        // todo load a toast here with err.message - received from server
                        if (err.status === 403) {
                            //  Handling the GSTN API response
                            if (err && err.error.message) {
                                this.toasterService.presentToast(err.error.message, 'Error', 'error');
                            } else {
                                this.toasterService.presentToast(err.error, 'Error', 'error');
                            }
                        } else {
                            if (err.error.message && err.error.message === 'Token invalid.') {
                                // Call logout service
                                this.authService.logout();
                            } else {
                                this.toasterService.presentToast(err.error.message, 'Error', 'error');
                            }
                        }
                    }
                    if (Math.floor(err.status / 100) === 5) {
                        this.toasterService.presentToast(err.error.message, 'Error', 'error');
                    }
                    console.log(err);
                    return throwError(err);
                }
            })
        );
    }
}
