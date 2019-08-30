import { AdmIndexComponent } from './adm-index/adm-index.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdmService } from './adm.service';
import { admRoutes } from './adm.routing';
import { AdmFormComponent } from './adm-form/adm-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatSelectModule } from '@angular/material';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdmDialogComponent } from './adm-dialog/adm-dialog.component';
import { LoginService } from '../login/login.service';
import { AdmParentComponent } from './adm-parent/adm-parent.component';
//import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  declarations: [
   AdmIndexComponent,
   AdmFormComponent,
   AdmDialogComponent,
    AdmParentComponent
    
  ],
  entryComponents:[
    AdmDialogComponent,
    AdmParentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(admRoutes),
    FormsModule,
    ReactiveFormsModule,
    // BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule
    // ,
    // TextMaskModule

  ],
  providers:[AdmService,LoginService]
})
export class AdmModule { }
