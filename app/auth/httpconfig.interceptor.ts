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
import { MatSnackBar } from '@angular/material';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImp0aSI6IjEiLCJleHAiOjE1NjQ5MjYxNjAsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTg0ODgiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjU4NDg4In0.97rNbzt1xDX20igyHdYQktAifOOBp5I7jYP3KcpsdSQ';

    constructor(
        private snackBar: MatSnackBar) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.token || null}`,
             //   Locale: localStorage.getItem('locale') || 'en-US',
                Url: window.location.href,
                'Access-Control-Allow-Origin': '*'
            }
        });

        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                return event;
            }), catchError((error: HttpErrorResponse) => {

                let errorMessage = '';
                if (error.error instanceof ErrorEvent) {
                    // client-side error
                    errorMessage = `Error: ${error.error.message}`;
                } else {
                    // server-side error
                    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                }

                this.snackBar.open(errorMessage, null, {
                    duration: 5000,
                    horizontalPosition: 'end',
                    verticalPosition: 'top'
                });
                return throwError(error);
            }));
    }
}
