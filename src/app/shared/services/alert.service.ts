import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { Toast } from '@shared/models/toast';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private _toasts$: BehaviorSubject<Toast[]> = new BehaviorSubject<Toast[]>([]);
  private toasts: Toast[] = <Toast[]>[];
  private toastsLocal: Toast[] = [];

  public get toasts$(): Observable<Toast[]> {
    return this._toasts$.asObservable();
  }

  constructor(private ngbModal: NgbModal) {}

  public add(toast: Toast, delay: number) {
    const count = this.toasts.length * 200;

    this.toasts.push(toast);

    setTimeout(() => {
      this._toasts$.next(this.toastsLocal);
      this.toastsLocal.push(toast);

      this.remove(toast, delay);
    }, count);
  }

  public remove(toast: Toast, delay: number = 0) {
    setTimeout(() => {
      this.toastsLocal = this.toastsLocal.filter((t: Toast) => t !== toast);
      this.toasts = this.toasts.filter((t: Toast) => t !== toast);

      this._toasts$.next(this.toastsLocal);
    }, delay);
  }

  public success(message: string, delay: number = 6000) {
    const toast: Toast = { type: 'success', message };

    this.add(toast, delay);
  }

  public error(message: string, delay: number = 6000) {
    const toast: Toast = { type: 'error', message };

    this.add(toast, delay);
  }

  public danger(message: string, delay: number = 6000) {
    const toast: Toast = { type: 'danger', message };

    this.add(toast, delay);
  }

  public warn(message: string, delay: number = 6000) {
    const toast: Toast = { type: 'warning', message };

    this.add(toast, delay);
  }

  public info(message: string, delay: number = 6000) {
    const toast: Toast = { type: 'info', message };

    this.add(toast, delay);
  }

  public message(message: string, delay: number = 6000) {
    const toast: Toast = { type: 'message', message };

    this.add(toast, delay);
  }
}
