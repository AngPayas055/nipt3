import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { ApplicationRoutingModule } from './application-routing.module';
import { ApplicationRouterActivate } from './application-router.activate';

// PRIMENG MODULES
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import {TabViewModule} from 'primeng/tabview';  
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {InputNumberModule} from 'primeng/inputnumber';
import {RadioButtonModule} from 'primeng/radiobutton';
import {DialogModule} from 'primeng/dialog';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { MessageService } from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {SpeedDialModule} from 'primeng/speeddial';


// COMPONENTS
import { DashboardComponent } from 'src/app/components/application/dashboard/dashboard.component';
import { ApplicationComponent } from './application.component';
import { AppTopBarComponent } from './application.topbar.component';
import { AppFooterComponent } from './application.footer.component';
import { AppMenuComponent } from './application.sidebar.component';
import { CheckboxModule } from 'primeng/checkbox';
import { UsersComponent } from 'src/app/components/application/users/users.component';

@NgModule({
  declarations: [
    ApplicationComponent,
    DashboardComponent,
    AppTopBarComponent,
    AppMenuComponent,
    AppFooterComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ApplicationRoutingModule,
    MenubarModule,
    SidebarModule,
    ButtonModule,
    MenuModule,
    TabViewModule,
    CardModule,
    InputTextModule,
    CalendarModule,
    TableModule,
    DropdownModule,
    InputNumberModule,
    CheckboxModule,
    RadioButtonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextareaModule,
    ToastModule,
    ConfirmDialogModule,
    ProgressSpinnerModule,
    SpeedDialModule
  ], 
  exports: [
    // applicant components
    //Applicationg Layout Components
    AppTopBarComponent,
    AppMenuComponent,
    AppFooterComponent,
  ],
  providers: [
    ApplicationRouterActivate,
    DialogService, 
    FormBuilder, 
    MessageService, 
    ConfirmationService,
    DatePipe,
    DynamicDialogRef
  ],
  bootstrap: [ApplicationModule]
})
export class ApplicationModule { }
