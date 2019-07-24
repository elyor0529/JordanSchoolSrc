

import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SchoolFeeService } from '../school-fee.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FinItem } from 'src/app/Models/financial/fin-item';
import { FinItemService } from '../../fin-item/fin-item.service';
import { ValidationBase } from 'src/app/validationBase';
import { LkpSchool } from 'src/app/Models/addLookups/schools/lkpSchool';
import { SchoolService } from 'src/app/pages/addLookups/schools/school.service';
import { LkpYear } from 'src/app/Models/addLookups/year/LkpYear';
import { YearService } from 'src/app/pages/addLookups/years/year.service';

@Component({
  selector: 'app-school-fee-dialog',
  templateUrl: './school-fee-dialog.component.html',
  styleUrls: ['./school-fee-dialog.component.scss']
})
export class SchoolFeeDialogComponent implements OnInit {


  public form: FormGroup;
  loading = false;
  SchoolDesc: any;
  edit = false;
  returnUrl = '/financial/schoolFee/index';
  id: number;
  finItemList: FinItem[];
  schoolList: LkpSchool[];
  yearList: LkpYear[];
  @Output() event=new EventEmitter<FinItem>(true);
  constructor(
    private fb: FormBuilder,
    public validator: ValidationBase,
    private router: Router,
    private service: SchoolFeeService,
    private finItemService: FinItemService,
    private schoolService: SchoolService,
    private yearService: YearService,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<SchoolFeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.initForm();
    this.SchoolDesc = this.service.selectedSchoolDesc;
  }

  initForm() {
    this.form = this.fb.group({
      id:  [0],
      schoolId: [this.service.selectedSchoolId, [Validators.required]],
      yearId: [this.service.selectedYearId, [Validators.required]],
      finItemId: [1],
    value:[0, [Validators.min(1), Validators.max(2000)],[Validators.required]]
    });
  }

  getFinItemList() {
    this.finItemService.getFinItemList().subscribe(res => this.finItemList = res);
  }


  getSchoolList() {
    this.schoolService.schoolList().subscribe(res => this.schoolList = res);
  }


  getYearList() {
    this.yearService.getYearsList().subscribe(res => this.yearList = res);
  }

  submit() {
    if (!this.form.valid) {
      this.validator.markFormTouched(this.form);
      return;
    }
    this.loading = true;
    this.edit ? this.updateSchoolFee() : this.addSchoolFee();
  }

  addSchoolFee() {
    this.service.addSchoolFee(this.form.value).subscribe(
      res => {
       this.event.emit(this.form.value);
        this.dialogRef.close(this.form.value);
      },
      err => console.log('errrrrrr'+err)
    );
  }

  updateSchoolFee() {
    console.log('update');
    this.service.updateSchoolFee(this.id, this.form.value).subscribe(
      res => {
        this.dialogRef.close(this.form.value);
      //  this.router.navigateByUrl(this.returnUrl);
      },
      err => console.log(err)
    );
  }

  setupUpdate() {
    // this.route.params.subscribe(params => {
    //   if (!params.id) {
    //     return;
    //   }
    console.log(this.data);
    if (!this.data.id) return;
    //  this.id = +params.id;
    this.id = this.data.id;
      this.edit = true;
      this.loading = true;
      this.service.getSchoolFeeById(this.id).subscribe(res => {
        this.form = this.validator.patchForm(this.form, res);
        console.log('res'+res.finItemId+this.form);
        
      }, err => console.log(err),
        () => this.loading = false);
  //  });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.setupUpdate();
    this.getFinItemList();
    this.getSchoolList();
    this. getYearList();

 
  }

}
