import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  distinctUntilChanged,
  filter,
  finalize,
  first,
  map,
  Observable,
} from 'rxjs';

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

    if (!!token && !!refresh) {
      req = req.clone({
        setHeaders: {
          Bearer: token,
          'Api-X-Token': refresh,
          //? Token | Api-X-Token | Api-Token | Authorization | Refresh | Auth
        },
      });
    }

    return next.handle(req).pipe(
      distinctUntilChanged(),
      map((event: HttpEvent<any>) => {
        // if (!(event instanceof HttpResponse)) return event;

        // const res = event.clone();

        // console.log(event)

        // const tokenRes = event.headers.get('Bearer');
        // const refreshRes = event.headers.get('Api-X-Token');

        // if (tokenRes) this.storage.setItem('token', tokenRes);
        // if (refreshRes) this.storage.setItem('refresh', refreshRes);

        return event;
      })
    );
  }
}
