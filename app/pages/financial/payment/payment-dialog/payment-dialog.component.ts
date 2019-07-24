import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { RegParentService } from 'src me finnancial/app/pages/Reg/parents/reg-parent.service';
import { Lkplookup } from 'src/app/Models/Lookups/lkplookup';
import { LookupTypes } from 'src/app/Models/Enum/SystemEnum';
import { LookupsApiService } from 'src/app/pages/lookups/lookups-api.service';
import { ValidationBase } from 'src/app/validationBase';
import { PaymentService } from '../payment.service';
import { Payment } from 'src/app/Models/financial/payment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.scss']
})

export class PaymentDialogComponent implements OnInit {

  public form: FormGroup;
  parentList: any; 
  public myDate = new Date();
  public dateFormatted: string;
  voucherTypeList:Lkplookup[];
  VoucherStatusList:Lkplookup[];
  loading = false;
  edit=false;
  id: number;
  public dialogRef: MatDialogRef<PaymentDialogComponent>;
  @Output() event=new EventEmitter<Payment>(true);

  

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    public validator: ValidationBase,
    private parentService: RegParentService,
    private lookupService: LookupsApiService,
    private service: PaymentService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.initForm();
    this.dateFormatted = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');

  }


  initForm() {
    this.form = this.fb.group(
      {
        id: [0],
        RegParentId: ['', [Validators.required]],
        voucherId: [0],
        voucherDate: [this.dateFormatted],
        voucherTypeId: [],
        voucherStatusId: [],
        debit: [0],
        credit: [0],
        note: ['add your note']
      }
    );
  }

  getParentList() {
    return this.parentService.getParentsList()
      .subscribe(res => (this.parentList = res));
  }


  
  setupUpdate() {
    console.log(this.data);
    if (!this.data.id) return;
    this.id = this.data.id;
      this.edit = true;
      this.loading = true;
      this.service.getPaymentById(this.id).subscribe(res => {
        this.form = this.validator.patchForm(this.form, res);
      }, err => console.log(err),
        () => this.loading = false);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }



  private getLookups() {
    this.lookupService.getLookupsByType2([
      LookupTypes.VoucherType,
      LookupTypes.VoucherStatus
    ])
      .subscribe(
        res => {this.fillLookups(res)},
        _err => { console.log("Error") },
        () => { console.log("complete")
        });
  }

  private fillLookups(data: any) {
    data.forEach((element: Lkplookup[]) => {
      switch (element[0].typeId) {
        case LookupTypes.VoucherType:this.voucherTypeList = element; break;
        case LookupTypes.VoucherStatus:this.VoucherStatusList = element; default: break;
      }
    });
  }


  
  submit() {
    if (!this.form.valid) {
      this.validator.markFormTouched(this.form);
      return;
    }
    this.loading = true;
    this.edit ? this.updatePayment() : this.addPayment();
  }

  addPayment() {
    this.service.addPayment(this.form.value).subscribe(
      res => {
       this.event.emit(this.form.value);
        this.dialogRef.close(this.form.value);
      },
      err => console.log('errrrrrr'+err)
    );
  }

  updatePayment() {
    console.log('update');
    this.service.updatePayment(this.id, this.form.value).subscribe(
      res => {
        this.dialogRef.close(this.form.value);
      //  this.router.navigateByUrl(this.returnUrl);
      },
      err => console.log(err)
    );
  }

  ngOnInit() {
    this.setupUpdate();
    this.getParentList();
    this.getLookups();
  }




}
