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
import { GuestFooterComponent } from './components/footer/guest-footer/guest-footer.component';
import { CourseService } from './services/course/course.service';
import { CourseListComponent } from './components/lists/course-list/course-list.component';
import { CourseItemComponent } from './components/lists/course-item/course-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserHeaderComponent } from './components/headers/user-header/user-header.component';
import { MainMenuComponent } from './components/menus/main-menu/main-menu.component';
import { MyCoursesComponent } from './components/main/my-courses/my-courses.component';
import { MyAssignmentsComponent } from './components/main/my-assignments/my-assignments.component';
import { CoursesComponent } from './components/main/courses/courses.component';
import { CourseGridItemComponent } from './components/lists/course-grid-item/course-grid-item.component';
import { AssignmentService } from './services/assignment/assignment.service';
import { AssignmentItemComponent } from './components/lists/assignment-item/assignment-item.component';
import { AssignmentUploadComponent } from './components/input/assignment-upload/assignment-upload.component';

const appRoutes: Routes = [
  { path: '', component: GuestDashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: UserDashboardComponent, children: [
      { path: 'my-courses', component: MyCoursesComponent },
      { path: 'my-assignments', component: MyAssignmentsComponent },
      { path: 'courses', component: CoursesComponent }
    ]}
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
    SearchBarComponent,
    GuestFooterComponent,
    CourseListComponent,
    CourseItemComponent,
    UserHeaderComponent,
    MainMenuComponent,
    MyCoursesComponent,
    MyAssignmentsComponent,
    CoursesComponent,
    CourseGridItemComponent,
    AssignmentItemComponent,
    AssignmentUploadComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    UserService,
    CourseService,
    AssignmentService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
