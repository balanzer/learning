import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';

import { CopywriteComponent } from './copywrite/copywrite.component';

@NgModule({
  declarations: [CopywriteComponent],
  imports: [BrowserModule],
  // Tell Angular it needs to compile our component in to a component factory
  entryComponents: [CopywriteComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    // Convert our Angular component in to a web component
    const copywrite = createCustomElement(CopywriteComponent, {
      injector
    });
    // Add our component to the browser's list of custom elements
    customElements.define('app-copywrite', copywrite);
  }
  // A module that is bootstrapped must define either a bootstrap property or
  // an ngDoBootstrap method. Since this module is just here as a container,
  // we just use this empty ngDoBootstrap
  ngDoBootstrap() { }
}
