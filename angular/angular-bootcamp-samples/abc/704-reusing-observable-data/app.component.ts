import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { CompanyLoader } from './company-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  company: Observable<any>;
  flag = false;

  constructor(loader: CompanyLoader) {
    // this.company = loader.loadOneCompany().pipe(share());
    this.company = loader.loadOneCompany().pipe(shareReplay(1));
  }
}
