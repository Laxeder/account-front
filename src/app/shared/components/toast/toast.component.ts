import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ToastDelayAnimation } from '@shared/animations/toast.animation';
import { AlertService } from '@shared/services/alert.service';
import { Toast } from '@shared/models/toast';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  animations: [ToastDelayAnimation],
})
export class ToastComponent implements OnInit {
  public toasts$: Observable<Toast[]> = this.alertService.toasts$;
  public isShow: boolean = true;

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {}

  public toggle() {
    this.isShow = !this.isShow;
  }

  public onClose(toast: Toast) {
    console.log('close alert');

    this.alertService.remove(toast);
  }
}
