import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SchoolFeeIndexComponent } from './school-fee-index/school-fee-index.component';
import { SchoolFeeFormComponent } from './school-fee-form/school-fee-form.component';
import { schoolFeeRoutes } from './school-fee.routing';
import { SchoolFeeService } from './school-fee.service';
import { SchoolFeeDialogComponent } from './school-fee-dialog/school-fee-dialog.component';




@NgModule({
  declarations: [ 
    SchoolFeeIndexComponent,
    SchoolFeeFormComponent,
    SchoolFeeDialogComponent 
  ],
  entryComponents: [
    SchoolFeeDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(schoolFeeRoutes),
    FormsModule,
    ReactiveFormsModule,
    
  ],
  providers: [SchoolFeeService]
})



export class SchoolFeeModule { }
