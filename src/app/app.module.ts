import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SortablejsModule } from 'angular-sortablejs';
import { NestableModule } from 'ngx-nestable';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { SignInComponent } from './components/user/sign-in/sign-in.component';
import { SignUpComponent } from './components/user/sign-up/sign-up.component';
import { UserService } from './shared/services/user.service';
import { ApplicationService } from './shared/services/application.service';
import { ProjectflowService } from './shared/services/projectflow.service';

import { AuthGuard } from './core/auth/auth.guard';
import { AuthInterceptor } from './core/auth/auth.interceptor';
import { OtpComponent } from './components/user/otp/otp.component';
import { ApplicationComponent } from './components/application/application.component';
import { BasicInfoComponent } from './components/application/basic-info/basic-info.component';
import { OwnerInfoComponent } from './components/application/owner-info/owner-info.component';
import { LoanInfoComponent } from './components/application/loan-info/loan-info.component';
import { NavigationComponent } from './components/admin/navigation/navigation.component';
import { NavigationOrderComponent } from './components/admin/navigation-order/navigation-order.component';
import { TasksComponent } from './components/project-flow/tasks/tasks.component';
import { ProcessComponent } from './components/project-flow/process/process.component';
import { SubprocessComponent } from './components/project-flow/subprocess/subprocess.component';
import { WorkflowComponent } from './components/project-flow/workflow/workflow.component';
import { DndModule } from "ngx-drag-drop";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    SignInComponent,
    SignUpComponent,
    OtpComponent,
    ApplicationComponent,
    BasicInfoComponent,
    OwnerInfoComponent,
    LoanInfoComponent,
    NavigationComponent,
    NavigationOrderComponent,
    TasksComponent,
    ProcessComponent,
    SubprocessComponent,
    WorkflowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NestableModule,
    DndModule,
    SortablejsModule.forRoot({ animation: 150 })
  ],
  providers: [
    UserService, 
    ProjectflowService,
   // ApplicationService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS,useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
