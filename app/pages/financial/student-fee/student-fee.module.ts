import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentFeeIndexComponent } from './student-fee-index/student-fee-index.component';
import { StudentFeeFormComponent } from './student-fee-form/student-fee-form.component';
import { studentFeeRoutes } from './student-fee.routing';
import { StudentFeeService } from './student-fee.service';

@NgModule({
  declarations: [
    StudentFeeIndexComponent,
    StudentFeeFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(studentFeeRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [StudentFeeService]
})
 
export class StudentFeeModule { }
