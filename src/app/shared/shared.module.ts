import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { InputAutofocus } from '@shared/directives/input-autofocous.directive';
import { InputFileDirective } from '@shared/directives/input-file.directive';
import { DraggableDirective } from '@shared/directives/draggable.directive';

@NgModule({
  declarations: [InputAutofocus, InputFileDirective, DraggableDirective],
  exports: [InputAutofocus, InputFileDirective, DraggableDirective],
  imports: [CommonModule],
})
export class SharedModule {}
