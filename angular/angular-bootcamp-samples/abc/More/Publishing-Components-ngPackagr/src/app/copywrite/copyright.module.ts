import { NgModule } from '@angular/core';
import { CopyrightComponent } from './copyright.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [CopyrightComponent],
  exports: [CopyrightComponent],
  imports: [CommonModule]
})
export class CopyrightModule {

}
