import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { DynamicFormComponent } from './dynamic-form';

@NgModule({
  declarations: [DynamicFormComponent],
  imports: [BrowserModule, ReactiveFormsModule],
  bootstrap: [DynamicFormComponent]
})
export class AppModule { }
