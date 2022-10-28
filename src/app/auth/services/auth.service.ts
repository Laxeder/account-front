import {
  BehaviorSubject,
  catchError,
  filter,
  finalize,
  Observable,
  of,
  pluck,
  tap,
} from 'rxjs';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import * as jwt from '@utils/jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  private _isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  public get isLoading$(): Observable<boolean> {
    return this._isLoading$.asObservable();
  }

  constructor(private http: HttpClient) {
    super();
  }

  public login(body: any): Observable<any> {
    this._isLoading$.next(true);

    return this.http.post(`${this.apiV1}/account/login`, body).pipe(
      catchError(super.serviceError),
      filter((response: any) => response.hasOwnProperty('token')),
      pluck('token'),
      // map((response: any) => response.token),
      tap((token: string) => this.storage.setItem('token', token)),
      tap((token: string) => this.storage.setItem('user', jwt.decode(token))),
      finalize(() => this._isLoading$.next(false))
    );
  }

  public logout(): Observable<any> {
    return of({}).pipe();
  }
}
