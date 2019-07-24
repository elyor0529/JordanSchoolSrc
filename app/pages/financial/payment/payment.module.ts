import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PaymentIndexComponent } from './payment-index/payment-index.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { PaymentDialogComponent } from './payment-dialog/payment-dialog.component';
import { SharedModule } from 'JordanSchoolSrc1807/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { paymentRoutes } from './payment.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentService } from './payment.service';
import {   MatSelectModule, MatFormFieldModule } from '@angular/material';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AppSettings } from 'src/app/app.settings';

@NgModule({
  declarations: [
    PaymentIndexComponent, 
    PaymentFormComponent, 
    PaymentDialogComponent
  ],
  entryComponents:[
    PaymentDialogComponent
  ],

  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(paymentRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule
  ],
  providers:[PaymentService,AppSettings, DatePipe]
})
export class PaymentModule { }
