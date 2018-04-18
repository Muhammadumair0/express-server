import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';
import { AddContactComponent } from "./add-contact/add-contact.component";
import { AppLoginComponent } from "./app-login/app-login.component";
import { AuthGuard } from "./auth.guard"

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'api/contacts',
    component: ContactListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "new",
    component: AddContactComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "login",
    component: AppLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
