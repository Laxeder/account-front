import { alertType } from '@shared/types/alert-type.type';

export interface Toast {
  type: alertType;
  message: string;
}
