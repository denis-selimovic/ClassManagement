import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { NavbarComponent } from './components/auth/navbar/navbar.component';

import { UserService } from './services/user/user.service';
import { AuthGuardService } from './services/guards/auth-guard.service';
import { UserDashboardComponent } from './components/dashboard/user-dashboard/user-dashboard.component';
import { GuestDashboardComponent } from './components/dashboard/guest-dashboard/guest-dashboard.component';
import { GuestHeaderComponent } from './components/headers/guest-header/guest-header.component';
import { SearchBarComponent } from './components/input/search-bar/search-bar.component';

const appRoutes: Routes = [
  { path: '', component: GuestDashboardComponent },
  { path: 'register', component: LoginComponent },
  { path: 'login', component: RegisterComponent },
  { path: 'dashboard', component: UserDashboardComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    UserDashboardComponent,
    GuestDashboardComponent,
    GuestHeaderComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [
    UserService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
