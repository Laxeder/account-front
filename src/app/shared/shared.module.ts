import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { InputAutofocus } from '@shared/directives/input-autofocous.directive';
import { InputFileDirective } from '@shared/directives/input-file.directive';
import { ButtonComponent } from '@shared/components/button/button.component';
import { DraggableDirective } from '@shared/directives/draggable.directive';
import { AlertComponent } from '@shared/components/alert/alert.component';
import { ToastComponent } from '@shared/components/toast/toast.component';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [
    InputFileDirective,
    DraggableDirective,
    ButtonComponent,
    InputAutofocus,
    AlertComponent,
    ToastComponent,
    CardComponent
  ],
  exports: [
    InputFileDirective,
    DraggableDirective,
    ButtonComponent,
    InputAutofocus,
    AlertComponent,
    ToastComponent,
    CardComponent
  ],
  imports: [CommonModule],
})
export class SharedModule {}
