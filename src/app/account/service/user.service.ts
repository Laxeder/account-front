import { BehaviorSubject, catchError, finalize, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  private _isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  public get isLoading$() {
    return this._isLoading$.asObservable();
  }

  constructor(private http: HttpClient) {
    super();
  }

  save(user: any): Observable<any> {
    this._isLoading$.next(true);

    return this.http
      .post(`${this.apiV1}/account`, user, this.headerJsonWithToken())
      .pipe(
        catchError(super.serviceError),
        finalize(() => this._isLoading$.next(false))
      );
  }
}
