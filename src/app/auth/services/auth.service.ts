import {
  BehaviorSubject,
  delay,
  filter,
  finalize,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { Injectable } from '@angular/core';

import { environment } from '@environments/environment';
import { Storage } from 'src/utils/storage';
import * as jwt from '@utils/jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private storage: Storage = new Storage();

  public get isLoading$(): Observable<boolean> {
    return this._isLoading$.asObservable();
  }

  constructor() {}

  public login(): Observable<any> {
    this._isLoading$.next(true);

    return of({}).pipe(
      switchMap(this.mockLogin),
      filter((response: any) => response.hasOwnProperty('token')),
      map((response: any) => response.token),
      tap((token: string) => this.storage.setItem('token', token)),
      tap((token: string) => this.storage.setItem('user', jwt.decode(token))),
      finalize(() => this._isLoading$.next(false))
    );
  }

  public logout(): Observable<any> {
    return of({}).pipe();
  }

  private mockLogin(): Observable<any> {
    return of({}).pipe(
      delay(2000),
      map(
        () =>
          <any>{
            token: environment.authToken,
          }
      )
    );
  }
}
