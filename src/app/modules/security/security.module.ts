import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { SecurityRoutingModule } from './security-routing.module';

import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import {DividerModule} from 'primeng/divider';
import { TabViewModule } from 'primeng/tabview';

import { SecurityComponent } from './security.component';
import { LoginComponent } from '../../components/security/login/login.component';
import { RegisterComponent } from '../../components/security/register/register.component';
import { SharedModule } from '../shared/shared.module';
import { SecurityRouterActivate } from './security-router.activate';

@NgModule({
  declarations: [
    SecurityComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    SecurityRoutingModule,
    MenubarModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    ToastModule,
    DividerModule,
    TabViewModule
  ],
  providers: [
    SecurityRouterActivate
  ]

})
export class SecurityModule { }
