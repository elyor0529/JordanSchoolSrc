import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';
import { Payment } from 'src/app/Models/financial/payment';
import { PaymentService } from '../payment.service';
import { RegParentService } from 'src/app/pages/Reg/parents/reg-parent.service';
import { AppSettings } from 'src/app/app.settings';
import { Settings } from 'src/app/app.settings.model';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';
import { YearService } from 'src/app/pages/addLookups/years/year.service';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-payment-index',
  templateUrl: './payment-index.component.html',
  styleUrls: ['./payment-index.component.scss']
})
export class PaymentIndexComponent implements OnInit {



  dataSource: MatTableDataSource<Payment>;
  loading = false;
  parentList: any;
  yearsList: any;
  parentId: any;

  cols = [
    { field: "id", header: "#" },
    //  { field: "regParentId", header: "    رقم الاب    " },
    //{ field: "fatherName", header: "ولي الأمر" },
    { field: "yearDesc", header: " السنة  " },
    { field: "voucherId", header: "  رقم الوصل    " },
    //  { field: "voucherTypeId", header: " نوع الوصل  " },
    { field: "voucherTypeDesc", header: " نوع الوصل " },
    //  { field: "voucherStatusId", header: " حالة الوصل  " },
    { field: "voucherStatusDesc", header: " حالة الوصل " },
    { field: "debit", header: " عليه  " },
    { field: "credit", header: " له  " }//,
    // { field: "note", header: " ملاحظة  " }
  ]

  public displayedColumns: string[] = this.cols.map(col => col.field).concat('actions');
  public settings: Settings;


  constructor(
    public appSettings: AppSettings,
    private service: PaymentService,
    private parentService: RegParentService,
    private dialog: MatDialog,
    private yearService: YearService

  ) {

    this.dataSource = new MatTableDataSource<Payment>();
    this.settings = this.appSettings.settings;
  }


  getYearsList() {
    return this.yearService.getYearsList().subscribe(result => this.yearsList = result);
  }

  getPaymentList() {
    this.service.getPaymentList().subscribe(result => {
      this.dataSource.data = result
    },
      err => console.log("error in getPaymentList"),
      () => console.log("Comlit getPaymentList")
    )
  }


  getParentList() {
    return this.parentService
      .getParentsList()
      .subscribe(res => (this.parentList = res));
  }

  onParentChanged(filterValue: number) {
    //this.dataSource.filter = filterValue + "";
    this.service.selectedParentId = filterValue;
    this.service.getByParentIdYearId().subscribe(
      res => {
        this.dataSource.data = res
      });
  }


  onYearChanged(filterValue: number) {
   // this.dataSource.filter = filterValue + "";
    this.service.selectedYearId = filterValue;
    this.service.getByParentIdYearId().subscribe(
      res => {
        this.dataSource.data = res
      });
  }


  addNewPayment() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.direction = "rtl";
    dialogConfig.data = { id: 0, };
    const dialogRef = this.dialog.open(PaymentDialogComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(res => {
      this.getPaymentList();
    }
    );
  }

  updatePayment(paymentId) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.direction = "rtl";
    dialogConfig.data = { id: paymentId };
    const dialogRef = this.dialog.open(PaymentDialogComponent, dialogConfig);
  }

  openDeleteDialog(model: Payment) {
    const dialogoRef = this.dialog.open(DeleteDialogComponent, {
      data:
      {
        name: `${model.voucherTypeDesc}`
      }
    });
    dialogoRef.afterClosed().subscribe(
      result => {
        (result === true)
        this.deletePayment(model);
      }
    );
  }
  deletePayment(model: Payment) {
    this.loading = true;
    this.service.deletePayment(model.id).subscribe(
      res => this.handleSuccess(),
      err => {
        this.handleErrors()
        this.loading = false
      },

      () => this.loading = false
    )
    err => { }
  }


  private handleSuccess() {
    this.getPaymentList();
  }

  private handleErrors() {

  }
  ngOnInit() {
    this.getPaymentList();
    this.getParentList();
    this.getYearsList();
  }

}
