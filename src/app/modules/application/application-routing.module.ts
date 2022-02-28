import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApplicationComponent } from './application.component';
import { DashboardComponent } from './../../components/application/dashboard/dashboard.component';
import { UsersComponent } from 'src/app/components/application/users/users.component';
import { ApplicationRouterActivate } from './application-router.activate';

const routes: Routes = [
  {
    path: '',
    canActivate: [ApplicationRouterActivate],
    component:ApplicationComponent,
    children: [
      { path: '', canActivate: [ApplicationRouterActivate], component:DashboardComponent },
      { path: 'dashboard', canActivate: [ApplicationRouterActivate], component:DashboardComponent },
      { path: 'users', canActivate: [ApplicationRouterActivate], component:UsersComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
