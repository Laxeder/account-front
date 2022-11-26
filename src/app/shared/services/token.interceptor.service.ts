import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Storage } from '@utils/storage';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  private storage: Storage = new Storage();

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const refresh: any = this.storage.getItem('refresh');
    const token: any = this.storage.getItem('token');

    const reqChanged = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Api-X-Token': refresh,
        // ? Token | Api-X-Token | Api-Token | Authorization | Refresh | Auth
      },
    });

    return next.handle(reqChanged).pipe(
      map((event: HttpEvent<any>) => {
        if (!(event instanceof HttpResponse)) return event;

        const tokenRes = event.headers.get('Bearer');
        const refreshRes = event.headers.get('Api-X-Token');

        if (tokenRes) this.storage.setItem('token', tokenRes);
        if (refreshRes) this.storage.setItem('refresh', refreshRes);

        return event;
      })
    );
  }
}
