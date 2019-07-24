import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.scss']
})

export class PaymentDialogComponent implements OnInit {

  public form: FormGroup;
  public now:Date =new Date();
  public myDate = new Date();
  public dateFormatted:string;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) { 
    this.dateFormatted = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');

  }


  initForm() {
    this.form = this.fb.group(
      {
        id: [0],
        RegParentId:['',[Validators.required]],
        voucherId:[0],
        voucherDate:[this.dateFormatted],
        voucherTypeId:[],
        voucherStatusId:[],
        debit:[0],
        credit:[0],
        note:['add your note']
      }
    );
  }

  ngOnInit() {
     this.initForm();
  }

  currentDate() {
    const currentDate = new Date();
    return currentDate.toISOString().substring(0,10);
  }

  
}
