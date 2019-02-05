import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'payroll', pathMatch: 'full' },
  { path: 'hr', loadChildren: './hr-files/hr.module#HrModule' },
  { path: 'payroll', loadChildren: './payroll/payroll.module#PayrollModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
