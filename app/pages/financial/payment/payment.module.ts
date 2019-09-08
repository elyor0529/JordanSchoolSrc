import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PaymentIndexComponent } from './payment-index/payment-index.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { PaymentDialogComponent } from './payment-dialog/payment-dialog.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { paymentRoutes } from './payment.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentService } from './payment.service';
import { MatSelectModule, MatFormFieldModule, DateAdapter, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AppSettings } from 'src/app/app.settings';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from 'src/app/app.module';
import { DateFormat } from './date-format';

@NgModule({ 
  declarations: [
    PaymentIndexComponent,
    PaymentFormComponent,
    PaymentDialogComponent
  ],
  entryComponents: [
    PaymentDialogComponent, PaymentFormComponent
  ],

  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(paymentRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    // GridModule,
    // DropDownListModule,
   // BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  providers: [
    PaymentService, AppSettings, DatePipe,
    { provide: DateAdapter, useClass: DateFormat }

  ]
})
export class PaymentModule {

  constructor(private dateAdapter: DateAdapter<Date>) {
    dateAdapter.setLocale('en-in'); // DD/MM/YYYY
  }
}

platformBrowserDynamic().bootstrapModule(AppModule);
