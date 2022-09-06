import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  protected apiV1: string = 'http://localhost:3000/api/v1';

  constructor() {}

  protected headerJson(): any {
    return { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  }

  protected serviceError(response: Response | any): Observable<never> {
    let err: any = {
      error: {
        status: '',
        message: '',
      },
    };

    if (response instanceof HttpErrorResponse) {
      if (response.statusText === 'Unknown Error') {
        err.error.status = 500;
        err.error.message = 'Erro desconhecido. ';
      }
    }

    if (response.status === 500) {
      err.error.status = 500;
      err.error.message +=
        'Serviço indisponível no momento. Favor voltar mais tarde.';
      return throwError(() => err);
    }

    return throwError(() => response);
  }
}
