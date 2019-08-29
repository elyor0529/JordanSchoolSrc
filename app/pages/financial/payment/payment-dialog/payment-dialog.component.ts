import { Component, OnInit, EventEmitter, Output, Inject, ViewChild, Renderer2, Renderer } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { RegParentService } from 'src/app/pages/Reg/parents/reg-parent.service';
import { Lkplookup } from 'src/app/Models/Lookups/lkplookup';
import { LookupTypes } from 'src/app/Models/Enum/SystemEnum';
import { LookupsApiService } from 'src/app/pages/lookups/lookups-api.service';
import { ValidationBase } from 'src/app/validationBase';
import { PaymentService } from '../payment.service';
import { Payment } from 'src/app/Models/financial/payment';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { PaymentChequeService } from '../payment-cheque.service';
import { PaymentCheque } from 'src/app/Models/financial/payment-cheque';
import { groupBy, GroupDescriptor } from '@progress/kendo-data-query';
import { GridComponent, AddEvent } from '@progress/kendo-angular-grid';
import { AdmService } from 'src/app/pages/Admission/adm.service';
import { StudentFeeService } from '../../student-fee/student-fee.service';
import { FinItemService } from '../../fin-item/fin-item.service';

const hasClass = (el, className) => new RegExp(className).test(el.className);

const isChildOf = (el, className) => {
  while (el && el.parentElement) {
    if (hasClass(el.parentElement, className)) {
      return true;
    }
    el = el.parentElement;
  }
  return false;
};

const matches = (el, selector) => (el.matches || el.msMatchesSelector).call(el, selector);

const createFormGroup = dataItem => new FormGroup({
  'chequeNo': new FormControl(dataItem.chequeNo),
  'chequeDate': new FormControl(dataItem.chequeDate),
  'chequeValue': new FormControl(dataItem.chequeValue, Validators.required),
  'bankId': new FormControl(dataItem.bankId),
  'paymentId': new FormControl(dataItem.paymentId)


});

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.scss']
})

export class PaymentDialogComponent implements OnInit {

  //////test inline
  public groups: GroupDescriptor[] = [];
  view: PaymentCheque[];
  viewList: PaymentCheque;
  @ViewChild(GridComponent) private grid: GridComponent;
  private editedRowIndex: number;
  private isNew = false;
  private docClickSubscription: any;
  public get isInEditingMode(): boolean {
    return this.editedRowIndex !== undefined || this.isNew;
  }

  public groupChange2(groups: GroupDescriptor[]): void {
    this.groups = groups;
    console.log('groupChange');

    // this.view = groupBy(this.paymentChequesDataSource.data, this.groups);
    console.log('groupChange' + this.view);
  }
  ////////////////////////////////////////////// test inline

  public PaymentformGroup: FormGroup;
  public chequeFormGroup: FormGroup;

  paymentChequesDataSource: MatTableDataSource<PaymentCheque>;
  error: any;
  public myDate = new Date();
  public dateFormatted: string;
  VoucherTypeList: Lkplookup[];
  VoucherStatusList: Lkplookup[];
  PaymentMethodList: Lkplookup[];
  childrenList: any;
  finItemList: any;
  loading = false;
  edit = false;
  id: number;
  id7: number = 7;
  selected: any;
  optionValue: any;
  chequesArray: FormArray;
  @Output() event = new EventEmitter<Payment>(true);



  // paymentChequesCols = [
  //   { field: "id", header: "#" },
  //   { field: "chequeNo", header: "  رقم الوصل    " }
  // ]
  // public paymentChequesDisplayedColumns: string[] = this.paymentChequesCols.map(col => col.field);



  constructor(
    private fb: FormBuilder,
    // private fb2: FormBuilder,
    private datePipe: DatePipe,
    public validator: ValidationBase,
    private studentFeeService: StudentFeeService,
    private finItemService: FinItemService,
    private admService: AdmService,
    private lookupService: LookupsApiService,
    // private service: PaymentService,
    private chequesService: PaymentChequeService,
    public dialogRef: MatDialogRef<PaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ///////
    private renderer: Renderer2
    //////////
  ) {
    this.dateFormatted = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.initForm();
    this.paymentChequesDataSource = new MatTableDataSource<PaymentCheque>();
  }


  initForm() {
    this.PaymentformGroup = this.fb.group(
      {
        id: [0],
        studentId: [],
        yearId: [this.studentFeeService.selectedYearId],
        finItemId: [],
        debit: [0],
        credit: [0],
        //   regParentId: [this.service.selectedParentId, [Validators.required],],
        finItemVoucherSequence: [1],//to be generated 
        voucherDate: [this.dateFormatted],
        paymentMethodId: [],
        paymentMethodDesc: [],
        transferNo: [],
        transferDate: [],
        visaCardNo: [],
        cheques: this.fb.array([
         // this.createCheque()
        ])
      }
    );
  }



  // createCheque(): FormGroup {
  //   return this.fb.group({
  //     id: [0],
  //     chequeNo: [10],
  //     chequeDate: [],
  //     chequeValue: [],
  //     bankId: [],
  //     studentFeeId: [this.id]
  //   });
  // }




  get cheques() {
    return this.PaymentformGroup.get('cheques') as FormArray;
  }

  getChildrenList() {
    return this.admService.getByParent(this.studentFeeService.selectedParentId)
      .subscribe(res => (this.childrenList = res));
  }

  getFinItemList() {
    return this.finItemService.getFinItemList()
      .subscribe(res => (this.finItemList = res));
  }

  getPaymentChequeList() {
    return this.chequesService.getChequesListByPaymentId(this.id)
      .subscribe(res => {
        this.paymentChequesDataSource.data = res[1],
          // this.viewList.chequeNo
          this.viewList = res,
          console.log('resssss paymentId ' + this.viewList.studentFeeId),
          console.log(res)
      }
      );
  }

  setupUpdate() {
    console.log(this.data);
    if (!this.data.id) return;
    this.id = this.data.id;
    this.edit = true;
    this.loading = true;
    this.studentFeeService.getStudentFeeById(this.id).subscribe(res => {
      this.PaymentformGroup = this.validator.patchForm(this.PaymentformGroup, res);
    }, err => console.log(err),
      () => this.loading = false);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }


  submit() {
  }

  private getLookups() {
    this.lookupService.getLookupsByType2([
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
        case LookupTypes.PaymentMethod: this.PaymentMethodList = element;
          defVal = element.findIndex(i => i.defaultValue === 1);
          try { value = element[defVal].id; } catch (error) { };
          this.PaymentformGroup.get("paymentMethodId").setValue(value);
          break;
      }
    });
  }



  submitPayment() {
    if (!this.PaymentformGroup.valid) {
      this.validator.markFormTouched(this.PaymentformGroup);
      return;
    }
    this.loading = true;
    this.edit ? this.updatePayment() : this.addPayment();
  }




  addPayment() {
    this.studentFeeService.addStudentFee(this.PaymentformGroup.value).subscribe(
      res => {
        this.event.emit(this.PaymentformGroup.value);
        this.dialogRef.close(this.PaymentformGroup.value);
      },
      err => {
        console.log('errrrrrr' + err)
      }
    );
  }

  updatePayment() {
    console.log('update');
    this.studentFeeService.updateStudentFee(this.id, this.PaymentformGroup.value).subscribe(
      res => {
        this.dialogRef.close(this.PaymentformGroup.value);
      },

      err => {
        console.log(err),
          console.log('------------------------------dd---------'),
          console.log(this.PaymentformGroup.value);
      }
    );
  }

  ngOnInit() {
    this.setupUpdate();
    this.getChildrenList();
    this.getFinItemList();
    this.getLookups();
    if (!this.id == null)
      this.getPaymentChequeList();

    this.docClickSubscription = this.renderer.listen('document', 'click', this.onDocumentClick.bind(this));
  }

  public ngOnDestroy(): void {
    this.docClickSubscription();
  }


  public addHandler(): void {
  //  this.closeEditor();
    console.log('addHandler');
    this.chequeFormGroup = this.fb.group({
      id: [0],
      chequeNo: [10],
      chequeDate: [],
      chequeValue: [],
      bankId: [],
      studentFeeId: [this.id]
    });



    /*
        this.chequeFormGroup = createFormGroup({
          'chequeNo': 10,
          'chequeDate': '',
          'chequeValue': 10,
          'bankId': 1,
          'paymentId': 7,
          // 'id':5,
        });*/


    this.isNew = true;

    this.grid.addRow(this.chequeFormGroup);
  }


  public cellClickHandler({ isEdited, dataItem, rowIndex }): void {
    console.log('cellClickHandler');
    if (isEdited || (this.chequeFormGroup && !this.chequeFormGroup.valid)) {
      return;
    }

    this.saveCurrent();
    this.chequeFormGroup = createFormGroup(dataItem);
    this.editedRowIndex = rowIndex;
    this.grid.editRow(rowIndex, this.chequeFormGroup);
  }




  public cancelHandler(): void {
    console.log('cancelHandler');
    this.closeEditor();
  }




  // public groupChange(groups: GroupDescriptor[]): void {
  //   this.groups = groups;
  //   //  this.view = groupBy(this.chequesService.products(), this.groups);
  // }




  private closeEditor(): void {
    console.log('closeEditor');
    this.grid.closeRow(this.editedRowIndex);
    this.isNew = false;
    console.log('isNew = false');
    this.editedRowIndex = undefined;
    this.chequeFormGroup = undefined;
  }


  private onDocumentClick(e: any): void {
    console.log('onDocumentClick');
    if (this.chequeFormGroup && this.chequeFormGroup.valid &&
      !matches(e.target, '#productsGrid tbody *, #productsGrid .k-grid-toolbar .k-button')) {
      console.log('onDocumentClick is valid');
      this.saveCurrent();
    }
  }



  private saveCurrent(): void {
    console.log('saveCurrent');
    if (this.chequeFormGroup) {
      this.chequesArray = this.PaymentformGroup.get('cheques') as FormArray;
     // debugger;
      this.chequesArray.push(this.chequeFormGroup);
      // this.chequesService.addPaymentCheque(this.chequeFormGroup.value).subscribe(
      //   res => {
      //   },
      //   err => {
      //     console.log('error in chequeFormGroup save' + err)
      //   }
      // );

      console.log('saveCurrent chequeFormGroup');
      console.log(this.chequeFormGroup);
      console.log(this.chequeFormGroup.value);
      console.log('saveCurrent chequeFormGroup');
      console.log('is new   ' + this.isNew);

      this.closeEditor();
    }
  }

  //////////////////

}
