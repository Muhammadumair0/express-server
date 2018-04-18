import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MenuComponent } from "./menu/menu.component";
import { ContactListComponent } from "./contact-list/contact-list.component";
import { ContactComponent } from "./contact/contact.component";
import { AddContactComponent } from "./add-contact/add-contact.component";
import { ApiService } from "./shared/api.service";
import { AuthServiceClass } from "./shared/auth.service";
import { AppLoginComponent } from './app-login/app-login.component';
import { AuthGuard } from "./auth.guard";

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ContactListComponent,
    ContactComponent,
    AddContactComponent,
    AppLoginComponent
  ],
  imports: [BrowserModule, FormsModule, HttpModule, AppRoutingModule],
  providers: [ApiService, AuthServiceClass, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
