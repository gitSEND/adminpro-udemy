import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { APP_ROUTES } from './app.route';

import { AppComponent } from './app.component';
import { RegisterComponent } from './login/register.component';
import { LoginComponent } from './login/login.component';

import { PagesModule } from './pages/pages.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent],
  imports: [BrowserModule, APP_ROUTES, PagesModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
