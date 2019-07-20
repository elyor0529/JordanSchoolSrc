import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidationBase } from 'JordanSchoolSrc1807/app/validationBase';
import { Router, ActivatedRoute } from '@angular/router';
import { SchoolFeeService } from '../school-fee.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FinItem } from 'src/app/Models/financial/fin-item';
import { FinItemService } from '../../fin-item/fin-item.service';

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
  @Output() event=new EventEmitter<FinItem>(true);


  constructor(
    private fb: FormBuilder,
    public validator: ValidationBase,
    private router: Router,
    private service: SchoolFeeService,
    private finItemService: FinItemService,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<SchoolFeeDialogComponent>

  ) {
    this.initForm();
    this.SchoolDesc = this.service.selectedSchoolDesc;

  }




  initForm() {
    this.form = this.fb.group({
      id: [0],
      schoolId: [this.service.selectedSchoolId, [Validators.required]],
      yearId: [1, [Validators.required]],
      finItemId: [1],
      value: [0]
    });
  }

  getFinItemList() {
    this.finItemService.getFinItemList().subscribe(res => this.finItemList = res);
  }

  submit() {

    if (!this.form.valid) {
      console.log("not valid");

      this.validator.markFormTouched(this.form);
      return;
    }

    this.loading = true;
    this.edit ? this.updateSchoolFee() : this.addSchoolFee();

  }



  addSchoolFee() {
    this.service.addSchoolFee(this.form.value).subscribe(
      res => {
       // this.router.navigateByUrl(this.returnUrl);
       this.event.emit(this.form.value);
       
        this.dialogRef.close(this.form.value);
      },
      err => console.log('errrrrrr'+err)
    );
  }


  updateSchoolFee() {
    this.service.updateSchoolFee(this.id, this.form.value).subscribe(
      res => {
        this.router.navigateByUrl(this.returnUrl);
      },
      err => console.log(err)
    );
  }


  setupUpdate() {
    this.route.params.subscribe(params => {
      if (!params.id) {
        return;
      }

      this.id = +params.id;
      this.edit = true;
      this.loading = true;
      this.service.getSchoolFeeById(this.id).subscribe(res => {
        this.form = this.validator.patchForm(this.form, res);
      }, err => console.log(err),
        () => this.loading = false);
    });
  }



  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.setupUpdate();

    this.getFinItemList();
  }

}
