import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/auth/login/login.component';
import { BaseComponent } from './core/layout/base/base.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: BaseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
