import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TemplateButtonComponent } from '@shared/components/template-button/template-button.component';
import { TokenInterceptorModule } from '@shared/models/token.interceptor.module';
import { InputAutofocus } from '@shared/directives/input-autofocous.directive';
import { InputFileDirective } from '@shared/directives/input-file.directive';
import { ButtonComponent } from '@shared/components/button/button.component';
import { DraggableDirective } from '@shared/directives/draggable.directive';
import { AlertComponent } from '@shared/components/alert/alert.component';
import { ToastComponent } from '@shared/components/toast/toast.component';
import { CardComponent } from '@shared/components/card/card.component';

@NgModule({
  declarations: [
    InputFileDirective,
    DraggableDirective,
    ButtonComponent,
    InputAutofocus,
    AlertComponent,
    ToastComponent,
    CardComponent,
    TemplateButtonComponent,
  ],
  exports: [
    InputFileDirective,
    DraggableDirective,
    ButtonComponent,
    InputAutofocus,
    AlertComponent,
    ToastComponent,
    CardComponent,
    TemplateButtonComponent,
    TokenInterceptorModule,
  ],
  imports: [CommonModule],
})
export class SharedModule {}
