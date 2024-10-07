import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from "./user/register/register.component";
import {RegisterSuccessComponent} from "./user/register-success/register-success.component";

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'register/success', component: RegisterSuccessComponent },
  {path: '', redirectTo: '/register', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
