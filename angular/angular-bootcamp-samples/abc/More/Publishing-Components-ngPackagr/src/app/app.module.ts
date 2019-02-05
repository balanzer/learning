import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CopyrightComponent } from './copywrite/copyright.component';
import { CopyrightModule } from './copywrite/copyright.module';

@NgModule({
  imports: [BrowserModule, CopyrightModule],
  entryComponents: [CopyrightComponent]
})
export class AppModule {
  constructor() { }
}
