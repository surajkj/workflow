import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { SignUpComponent } from './components/user/sign-up/sign-up.component';
import { SignInComponent } from './components/user/sign-in/sign-in.component';
import { OtpComponent } from './components/user/otp/otp.component';
import { AuthGuard } from './core/auth/auth.guard';
import { ApplicationComponent } from '@app/components/application/application.component';
import { BasicInfoComponent } from '@app/components/application/basic-info/basic-info.component';
import { OwnerInfoComponent } from '@app/components/application/owner-info/owner-info.component';
import { LoanInfoComponent } from '@app/components/application/loan-info/loan-info.component';
import { NavigationComponent } from '@app/components/admin/navigation/navigation.component';
import { NavigationOrderComponent } from '@app/components/admin/navigation-order/navigation-order.component';
import { ProcessComponent } from '@app/components/project-flow/process/process.component';
import { SubprocessComponent } from '@app/components/project-flow/subprocess/subprocess.component';
import { WorkflowComponent } from '@app/components/project-flow/workflow/workflow.component';
import { TasksComponent } from '@app/components/project-flow/tasks/tasks.component';

export const appRoutes: Routes = [
  { path: 'dashboard', component: HomeComponent },
  { path: 'navigation', component: NavigationComponent },
  { path: 'navigation-order', component: NavigationOrderComponent },
  { path: 'create-process', component: ProcessComponent },
  { path: 'create-subprocess', component: SubprocessComponent },
  { path: 'create-task', component: TasksComponent },
  { path: 'create-workflow', component: WorkflowComponent },
  { path: 'application/basic-info', component: ApplicationComponent,
    children: [{ path: '', component: BasicInfoComponent }]
  },
  {
    path: 'application/owner-info', component: ApplicationComponent,
    children: [{ path: '', component: OwnerInfoComponent }]
  },
  {
    path: 'application/loan-info', component: ApplicationComponent,
    children: [{ path: '', component: LoanInfoComponent }]
  },
  {
    path: 'signup', component: UserComponent,
    children: [{ path: '', component: SignUpComponent }]
  },
  {
    path: 'login', component: UserComponent,
    children: [{ path: '', component: SignInComponent }]
  },
  {
    path: 'otp', component: UserComponent,
    children: [{ path: '', component: OtpComponent }]
  },
  { path: '', redirectTo: '/signup', pathMatch: 'full' }

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
