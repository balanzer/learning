import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

//Material Design - Imports- Starts
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";

//Material Design - Imports- Ends

import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    //Material Module Imports  - starts
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule
    //Material Module Imports  - Ends
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
