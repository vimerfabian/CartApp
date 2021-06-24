import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';

import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    let contentType = 'application/json';
    // contentType != "application/json" ? "application/text" : contentType,
    if (request.headers.has('Content-Type')) {
      contentType = request.headers.get('Content-Type');
    }
    request = request.clone({
      setHeaders: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Access-Control-Allow-Origin': '*',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Access-Control-Allow-*': '*',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': contentType
      },
    });

    console.log('headers', request.headers);
    return next.handle(request);
  }
}
