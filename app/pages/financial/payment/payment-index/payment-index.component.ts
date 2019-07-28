import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';
import { Payment } from 'src/app/Models/financial/payment';
import { PaymentService } from '../payment.service';
import { RegParentService } from 'src/app/pages/Reg/parents/reg-parent.service';
import { AppSettings } from 'src/app/app.settings';
import { Settings } from 'src/app/app.settings.model';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';

@Component({
  selector: 'app-payment-index',
  templateUrl: './payment-index.component.html',
  styleUrls: ['./payment-index.component.scss']
})
export class PaymentIndexComponent implements OnInit {



  dataSource: MatTableDataSource<Payment>;
  loading = false;
  parentList: any;


  cols = [
    { field: "id", header: "#" },
    { field: "RegParentId", header: "    رقم الاب    " },
    { field: "voucherId", header: "  رقم الوصل    " },
    { field: "voucherTypeId", header: " نوع الوصل  " },
    { field: "voucherTypeDesc", header: " نوع الوصل " },
    { field: "voucherStatusId", header: " حالة الوصل  " },
    { field: "voucherStatusDesc", header: " حالة الوصل " },
    { field: "debit", header: " عليه  " },
    { field: "credit", header: " له  " },
    { field: "note", header: " ملاحظة  " }
  ]

  public displayedColumns: string[] = this.cols.map(col => col.field).concat('actions');
  public settings: Settings;


  constructor(
    public appSettings: AppSettings,
    private service: PaymentService,
    private parentService: RegParentService,
    private dialog: MatDialog

  ) {

    this.dataSource = new MatTableDataSource<Payment>();
    this.settings = this.appSettings.settings;
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


  addNewPayment() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.direction = "rtl";
    dialogConfig.data = { id: 0,};
    const dialogRef = this.dialog.open(PaymentDialogComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(res => {
      this.getPaymentList();
    }
    );
  }
  
  ngOnInit() {
    this.getPaymentList();
    this.getParentList();
  }

}
