import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApplicationComponent } from './application.component';
import { DashboardComponent } from './../../components/application/dashboard/dashboard.component';
import { UsersComponent } from 'src/app/components/application/users/users.component';
import { ApplicationRouterActivate } from './application-router.activate';
import { ApplicantListComponent } from 'src/app/components/application/applicant-list/applicant-list.component';
import { ApplicantFamilyBackgroundListComponent } from 'src/app/components/application/applicant-family-background-list/applicant-family-background-list.component';
import { ApplicantEducBackgroundListComponent } from 'src/app/components/application/applicant-educ-background-list/applicant-educ-background-list.component';
import { ApplicantCivilServiceListComponent } from 'src/app/components/application/applicant-civil-service-list/applicant-civil-service-list.component';
import { ApplicantWorkExperienceListComponent } from 'src/app/components/application/applicant-work-experience-list/applicant-work-experience-list.component';
import { ApplicantTrainingProgramListComponent } from 'src/app/components/application/applicant-training-program-list/applicant-training-program-list.component';
import { ApplicantOtherInfoListComponent } from 'src/app/components/application/applicant-other-info-list/applicant-other-info-list.component';
import { ApplicantGovernmentIssuedIdListComponent } from 'src/app/components/application/applicant-government-issued-id-list/applicant-government-issued-id-list.component';
import { ApplicantDetailComponent } from 'src/app/components/application/applicant-detail/applicant-detail.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [ApplicationRouterActivate],
    component:ApplicationComponent,
    children: [
      { path: '', canActivate: [ApplicationRouterActivate], component:DashboardComponent },
      { path: 'dashboard', canActivate: [ApplicationRouterActivate], component:DashboardComponent },
      { path: 'users', canActivate: [ApplicationRouterActivate], component:UsersComponent },
      { path: 'applicant-list', canActivate: [ApplicationRouterActivate], component:ApplicantListComponent },
      { path: 'applicant-detail/:id', canActivate: [ApplicationRouterActivate], component:ApplicantDetailComponent },
      // { path: 'applicant-family-background', canActivate: [ApplicationRouterActivate], component:ApplicantFamilyBackgroundListComponent},
      // { path: 'applicant-educational-background', canActivate: [ApplicationRouterActivate], component:ApplicantEducBackgroundListComponent},
      // { path: 'applicant-civil-service', canActivate: [ApplicationRouterActivate], component:ApplicantCivilServiceListComponent},
      // { path: 'applicant-work-experience', canActivate: [ApplicationRouterActivate], component:ApplicantWorkExperienceListComponent},
      // { path: 'applicant-training-program', canActivate: [ApplicationRouterActivate], component:ApplicantTrainingProgramListComponent},
      // { path: 'applicant-other-info', canActivate: [ApplicationRouterActivate], component:ApplicantOtherInfoListComponent},
      // { path: 'applicant-gov-issued-id', canActivate: [ApplicationRouterActivate], component:ApplicantGovernmentIssuedIdListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
