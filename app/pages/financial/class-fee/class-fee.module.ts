import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { classFeeRoutes } from './class-fee.routing';
import { ClassFeeService } from './class-fee.service';
import { ClassFeeIndexComponent } from './class-fee-index/class-fee-index.component';
import { ClassFeeFormComponent } from './class-fee-form/class-fee-form.component';

@NgModule({
  declarations: [
    ClassFeeIndexComponent,
    ClassFeeFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(classFeeRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ClassFeeService]
})
 



export class ClassFeeModule { }
