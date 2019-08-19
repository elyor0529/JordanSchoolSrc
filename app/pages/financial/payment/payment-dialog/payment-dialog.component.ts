import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { RegParentService } from 'src/app/pages/Reg/parents/reg-parent.service';
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

  public formGroup: FormGroup;
  parentList: any;
  error:any;
  public myDate = new Date();
  public dateFormatted: string;
  VoucherTypeList: Lkplookup[];
  VoucherStatusList: Lkplookup[];
  PaymentMethodList: Lkplookup[];
  loading = false;
  edit = false;
  id: number;
  @Output() event = new EventEmitter<Payment>(true);



  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    public validator: ValidationBase,
    private parentService: RegParentService,
    private lookupService: LookupsApiService,
    private service: PaymentService,
    public dialogRef: MatDialogRef<PaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dateFormatted = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.initForm();


  }


  initForm() {
    // console.log(regParentId);

    this.formGroup = this.fb.group(
      {
        id: [0],
        regParentId: [this.service.selectedParentId, [Validators.required],],
        voucherId: [1],
        voucherDate: [this.dateFormatted],
        voucherTypeId: [],
        voucherStatusId: [],
        paymentMethodId:[],
        yearId: [this.service.selectedYearId],
        debit: [0],
        credit: [0],
        transferNo:[''],
        transferDate:[''],
        visaCardNo:[],
        note: ['add your note']
      }
    );
   // this.formGroup.controls['regParentId'].disable()
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
      this.formGroup = this.validator.patchForm(this.formGroup, res);
    }, err => console.log(err),
      () => this.loading = false);
  }

  closeDialog(): void {
    console.log('didi wah');

    this.dialogRef.close();
  }


  submit() {
    //null;
  }

  private getLookups() {
    this.lookupService.getLookupsByType2([
      LookupTypes.VoucherType,
      LookupTypes.VoucherStatus,
      LookupTypes.PaymentMethod
    ])
      .subscribe(
        res => { this.fillLookups(res) },
        _err => { console.log("Error") },
        () => {
          console.log("complete")
        });
  }

  private fillLookups(data: any) {
    data.forEach((element: Lkplookup[]) => {
      let defVal;
      let value;
      switch (element[0].typeId) {
        case LookupTypes.VoucherType: this.VoucherTypeList = element;
          defVal = element.findIndex(i => i.defaultValue === 1);
          try { value = element[defVal].id; } catch (error) { };
          this.formGroup.get("voucherTypeId").setValue(value);
          break;

        case LookupTypes.VoucherStatus: this.VoucherStatusList = element; default:
          defVal = element.findIndex(i => i.defaultValue === 1);
          try { value = element[defVal].id; } catch (error) { };
          this.formGroup.get("voucherStatusId").setValue(value);
          break;

          case LookupTypes.PaymentMethod: this.PaymentMethodList = element; 
            defVal = element.findIndex(i => i.defaultValue === 1);
            try { value = element[defVal].id; } catch (error) { };
            this.formGroup.get("paymentMethodId").setValue(value);
            break;


      }
    });
  }



  submitPayment() {

    if (!this.formGroup.valid) {
      this.validator.markFormTouched(this.formGroup);
      return;
    }
    this.loading = true;
    this.edit ? this.updatePayment() : this.addPayment();
  }

  addPayment() {
    console.log(this.formGroup.value);
    
    this.service.addPayment(this.formGroup.value).subscribe(
      res => {
        this.event.emit(this.formGroup.value);
        this.dialogRef.close(this.formGroup.value);
      },
      err => {
        console.log('errrrrrr' + err)
      }
    );
  }

  updatePayment() {
    console.log('update');
    this.service.updatePayment(this.id, this.formGroup.value).subscribe(
      res => {
        this.dialogRef.close(this.formGroup.value);
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
