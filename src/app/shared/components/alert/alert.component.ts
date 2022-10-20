import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';

import { alertType } from '@shared/types/alert-type.type';

enum alertTypeClass {
  Warning = 'warning',
  Message = 'message',
  Success = 'success',
  Danger = 'danger',
  Error = 'error',
  Info = 'info',
}

const alertTypeLabel = new Map<string, string>([
  [alertTypeClass.Message, 'Mensagem'],
  [alertTypeClass.Success, 'Sucesso'],
  [alertTypeClass.Info, 'Informação'],
  [alertTypeClass.Warning, 'Aviso'],
  [alertTypeClass.Danger, 'Perigo'],
  [alertTypeClass.Error, 'Erro'],
]);

const alertTypeIcon = new Map<string, string>([
  [alertTypeClass.Warning, 'bi-exclamation-triangle-fill'],
  [alertTypeClass.Danger, 'bi-exclamation-triangle-fill'],
  [alertTypeClass.Message, 'bi-chat-square-dots-fill'],
  [alertTypeClass.Success, 'bi-check-circle-fill'],
  [alertTypeClass.Info, 'bi-info-circle-fill'],
  [alertTypeClass.Error, 'bi-x-circle-fill'],
]);

const alertTypeColor = new Map<string, string>([
  [alertTypeClass.Success, 'success'],
  [alertTypeClass.Warning, 'warning'],
  [alertTypeClass.Message, 'light'],
  [alertTypeClass.Danger, 'danger'],
  [alertTypeClass.Error, 'danger'],
  [alertTypeClass.Info, 'info'],
]);

const alertTypeBorderColor = new Map<string, string>([
  [alertTypeClass.Message, 'dark border-opacity-25'],
  [alertTypeClass.Success, 'success'],
  [alertTypeClass.Warning, 'warning'],
  [alertTypeClass.Danger, 'danger'],
  [alertTypeClass.Error, 'danger'],
  [alertTypeClass.Info, 'info'],
]);

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent implements OnInit {
  @Input() set type(type: alertType) {
    if (!!type) {
      this.typeLocal = type;
      this.updateType(type);
    }
  }

  @Input() set message(message: string) {
    if (!!message) {
      this.messageLocal = message;
      this.releaseView();
    }
  }

  @Input() set icon(icon: string) {
    if (!!icon) {
      this.iconLocal = icon;
      this.releaseView();
    }
  }

  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

  public borderLocal: string = alertTypeColor.get(
    alertTypeClass.Info
  ) as string;
  public colorLocal: string = alertTypeColor.get(alertTypeClass.Info) as string;
  public labelLocal: string = alertTypeLabel.get(alertTypeClass.Info) as string;
  public iconLocal: string = alertTypeIcon.get(alertTypeClass.Info) as string;

  public typeLocal: alertType = 'info';
  public messageLocal: string = '';
  public isClosed: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.releaseView();
  }

  public updateType(type: alertType): void {
    this.setLabel(type);
    this.setColor(type);
    this.setIcon(type);
  }

  public setLabel(type: alertType) {
    this.labelLocal = alertTypeLabel.get(type) as string;

    this.releaseView();
  }

  public setIcon(type: alertType) {
    this.iconLocal = alertTypeIcon.get(type) as string;

    this.releaseView();
  }

  public setColor(type: alertType) {
    this.colorLocal = alertTypeColor.get(type) as string;
    this.borderLocal = alertTypeBorderColor.get(type) as string;

    this.releaseView();
  }

  private releaseView() {
    this.cdr.detectChanges();
  }

  public onClose() {
    this.isClosed = true;
    this.close.emit(this.isClosed);
  }
}
