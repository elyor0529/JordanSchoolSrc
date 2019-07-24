import { AdmDialogComponent } from "./../adm-dialog/adm-dialog.component";
import { regParents } from "./../../../Models/Reg/Parents/reg-parents";
import { RegParentService } from "./../../Reg/parents/reg-parent.service";
import { Admission } from "./../../../Models/Admission/admission";
import { Component, OnInit, ViewChild } from "@angular/core";
import { AdmService } from "../adm.service";
import {
  MatPaginator,
  MatTableDataSource,
  MatDialog,
  MatDialogConfig
} from "@angular/material";
import { analytics } from "../../dashboard/dashboard.data";
import { FormControl } from "@angular/forms";
import { ReplaySubject, Subject } from "rxjs";
import { log } from "util";
import { DeleteDialogComponent } from "src/app/shared/delete-dialog/delete-dialog.component";
import { UsersService } from "../../users/users.service";
import { LoginService } from '../../login/login.service';

@Component({
  selector: "app-adm-index",
  templateUrl: "./adm-index.component.html",
  styleUrls: ["./adm-index.component.scss"]
})
export class AdmIndexComponent implements OnInit {
  parentList: regParents;
  schoolList: any;
  loading = false;
  parentId: any;
  fatherName: any;
  selected: any;
  ///Father Data
  fatherFirstName: any;
  fatherSecondName: any;
  fatherFamilyName: any;
  fatherReligionName: any;
  fatherNationalityName: any;
  fatherCityName: any;
  fatherAddress: any;
  fatherTel: any;
  fatherMobile: any;
  motherMobile: any;
  showSaveButton: boolean = false;
  showForm: boolean = false;
  classPrice: number;
  totalPrice: number;
  currentYear: any;
  currentYearId: number;
  schoolName: any;

  cols = [
    { field: "id", header: "#" },
    { field: "firstName", header: "إسم الطالب " },
    { field: "birthDate", header: "تاريخ الميلاد  ", type: "date" },
    { field: "genderName", header: "الجنس  " },
    { field: "className", header: "  الصف" },
    { field: "classPrice", header: "سعر الصف" },
    { field: "classSeqName", header: "الشعبة" },
    // { field: "descountType", header: "نوع الخصم" },
    //{ field: "descountValue", header: "قيمة الخصم" },
    { field: "tourName", header: "مشترك بالباص - المنطقة" },
    { field: "tourTypeName", header: " نوع إشتراك الباص" },
    { field: "tourPrice", header: "مبلغ إشتراك الباص" },
    { field: "totalPrice", header: "المبلغ المطلوب" },
    { field: "yearId", header: "yearId", type: "hidden" }
  ];
  dataSource: MatTableDataSource<Admission> = new MatTableDataSource<
    Admission
  >();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumns: string[] = this.cols
    .map(col => col.field)
    .concat("actions");

  message: string;

  constructor( 
    private service: AdmService,
    private parentService: RegParentService,
    public dialog: MatDialog,
    private userService: LoginService
  ) {
  
    
    this.userService.getUser("admin", "admin").subscribe(res => {
      this.schoolName = res.schoolName;
    });
   // this.schoolName = this.userService.sSchoolName;
    console.log("scjoolName"+this.schoolName);

    this.getCurrentYear();
    this.currentYear = this.service.sCurrentYear;
    console.log(this.currentYear);
    //this.getAdmList();
    this.getParentList();
    // this.selected=this.service.sSelected;
    //  this.onParentChanged(this.selected);
    //   console.log("++ "+this.selected);
  }

  ngOnInit() {
    // this.dataSource.filterPredicate = (data: Admission, filter: string) => {
    // return data.parentId == +filter;  };
    this.getCurrentYear();
    //this.currentYear = this.service.sCurrentYear;
    this.service.currentMessage.subscribe(message => (this.message = message));
    this.service.currentParentIdParam.subscribe(p => (this.parentId = p));
  }

  getAdmList() {
    return this.service
      .admissionList()
      .subscribe(res => (this.dataSource.data = res));
  }
  getParentList() {
    return this.parentService
      .getParentsList()
      .subscribe(res => (this.parentList = res));
  }

  getCurrentYear() {
    return this.service
      .getCurrentYear()
      .subscribe(
        res => (
          (this.service.sCurrentYear = res.aName),
          (this.currentYear = res.aName),
          (this.service.sCurrentYearId = res.id),
          (this.currentYearId = res.id)
        )
      );
  }

  onParentChanged(filterValue: string) {
    this.selected = filterValue;
    this.service.sSelected = filterValue;
    this.parentId = filterValue;
    let x = this.service.changeParentId(this.parentId);
    this.service.sParentId = filterValue;
    // console.log(": "+this.selected);
    // console.log(fatherName);
    //  this.service.currentParentIdParam.subscribe(p => this.parentId = p);
    //this.dataSource.filter = filterValue+"";
    //this.dataSource.
    this.service.getByParent(filterValue).subscribe(res => {
      this.dataSource.data = res;
      //   res[0]!=null? this.fatherName=res[0].parentId:this.fatherName="";
      // console.log('** '+this.fatherName);
    });

    // console.log(event);
    // console.log(index);

    this.service.getStudParent(filterValue).subscribe(res => {
      this.fatherName = res[0].fatherFullName;
      this.parentId = res[0].id;
      this.fatherFirstName = res[0].fatherFirstName;
      this.fatherSecondName = res[0].fatherSecondName;
      this.fatherFamilyName = res[0].fatherFamilyName;
      this.fatherReligionName = res[0].religionName;
      this.fatherNationalityName = res[0].nationalityName;
      this.fatherCityName = res[0].cityName;
      this.fatherAddress = res[0].address;
      this.fatherTel = res[0].tel;
      this.fatherMobile = res[0].fatherMobile;
      this.motherMobile = res[0].motherMobile;

      this.service.sParentName = this.fatherName;
      this.showSaveButton = true;

      // console.log( this.parentId);
      // console.log(res);
    });
  }

  //Dialog

  addNewStudent() {
    const dialogConfig = new MatDialogConfig();

    //dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    //   dialogConfig.position = {
    //     'top': '0',
    //     left: '0'
    // };
    dialogConfig.direction = "rtl";
    dialogConfig.data = { id: 0, classPrice: 0, totalPrice: 0 };
    const dialogRef = this.dialog.open(AdmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      res != null ? this.onParentChanged(res.parentId) : "";
    });
  }

  updateStud(id, classPrice, totalPrice, yearId: number, elementYear: number) {
    console.log("yearId=" + yearId + "  elementYear=" + elementYear);
    if (yearId != elementYear) return;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.direction = "rtl";
    dialogConfig.data = {
      id: id,
      classPrice: classPrice,
      totalPrice: totalPrice
    };
    const dialogRef = this.dialog.open(AdmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      res != null ? this.onParentChanged(res.parentId) : "";
    });
  }
  addNewStudent2() {
    const dialogRef = this.dialog.open(AdmDialogComponent, {
      //data: {issue: issue }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        // this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
        // this.refreshTable();
      }
    });
  }
  displayForm(show: boolean) {
    this.showForm = show;
  }

  onSave(data: Admission) {
    this.onParentChanged("" + data.parentId);
  }

  //Delete

  openDeleteDialog(adm: Admission) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        // name: `${adm.firstName}`,
        name: `${adm.yearId}`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteStudent(adm);
      }
    });
  }

  deleteStudent(adm: Admission) {
    this.loading = true;
    this.service.admDelete(adm.id).subscribe(
      res => {
        this.handleSuccess();
      },
      err => {
        this.handleErrors(), (this.loading = false);
      },
      () => (this.loading = false)
    );
  }

  // this.parentId
  private handleSuccess() {
    // this.getAdmList();
    this.onParentChanged(this.parentId);
  }

  private handleErrors() {}
}
