import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule,HttpHeaders } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core'
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { ChangeDetectorService } from './services/change/change-detector.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule} from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { UserHomeComponent } from './components/user/home/home.component';
import { UserViewComponent } from './components/user/view/view.component';
import { UserCreateComponent } from './components/user/create/create.component';
import { UserFormComponent } from './components/user/form/form.component';
import { UserTableComponent } from './components/user/table/table.component'

import { ManifestHomeComponent } from './components/manifest/home/home.component';
import { ManifestViewComponent } from './components/manifest/view/view.component';
import { ManifestCreateComponent } from './components/manifest/create/create.component';
import { ManifestFormComponent } from './components/manifest/form/form.component';
import { ManifestTableComponent } from './components/manifest/table/table.component'

import { ShipmentHomeComponent } from './components/shipment/home/home.component';
import { ShipmentViewComponent } from './components/shipment/view/view.component';
import { ShipmentCreateComponent } from './components/shipment/create/create.component';
import { ShipmentFormComponent } from './components/shipment/form/form.component';
import { ShipmentTableComponent } from './components/shipment/table/table.component'

import { GroupHomeComponent } from './components/group/home/home.component';
import { GroupViewComponent } from './components/group/view/view.component';
import { GroupCreateComponent } from './components/group/create/create.component';
import { GroupFormComponent } from './components/group/form/form.component';
import { GroupTableComponent } from './components/group/table/table.component';
import { UserHeaderComponent } from './components/user/header/header.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { EmailComponent } from './components/email/email.component';
import { SendRecoveryComponent } from './components/send-recovery/send-recovery.component';
import { RecoverComponent } from './components/recover/recover.component';
import { PathLocationStrategy, LocationStrategy } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LoginComponent,
    DashboardComponent,
    SidebarComponent,
    TopbarComponent,
    UserHomeComponent,
    UserViewComponent,
    UserCreateComponent,
    UserFormComponent,
    UserTableComponent,

    ManifestHomeComponent,
    ManifestViewComponent,
    ManifestCreateComponent,
    ManifestFormComponent,
    ManifestTableComponent,

    ShipmentHomeComponent,
    ShipmentViewComponent,
    ShipmentCreateComponent,
    ShipmentFormComponent,
    ShipmentTableComponent,

    GroupHomeComponent,
    GroupViewComponent,
    GroupCreateComponent,
    GroupFormComponent,
    GroupTableComponent,
    UserHeaderComponent,
    DialogComponent,
    EmailComponent,
    SendRecoveryComponent,
    RecoverComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatTabsModule,
    MatMenuModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule
  ],
  providers: [
    ChangeDetectorService,
    { provide: LocationStrategy, useClass: PathLocationStrategy } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
