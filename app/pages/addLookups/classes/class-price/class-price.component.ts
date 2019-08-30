import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { ValidationBase } from 'src/app/validationBase';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ClassService } from '../class.service';
import { SectionService } from '../../sections/section.service';
import { SchoolService } from '../../schools/school.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PriceService } from '../price.service';
import { users } from 'src/app/Models/Users/users';
import { lkpClass } from 'src/app/Models/addLookups/classes/lkpClass';

@Component({
  selector: 'app-class-price',
  templateUrl: './class-price.component.html',
  styleUrls: ['./class-price.component.scss']
})
export class ClassPriceComponent implements OnInit {

  form: FormGroup;
  loading = false;
  edit = false;
  Tokendata: users;
  returnUrl = '/classes/price';
  id: number;
  schoolId = this.service.sSchoolId;
  yearId: any;
  @Output() event = new EventEmitter<lkpClass>(true);
  constructor(private router: Router,
    public validator: ValidationBase,
    private fb: FormBuilder,
    private service: PriceService,
    private route: ActivatedRoute,
    private sectionService: SectionService,
    public dialogRef: MatDialogRef<ClassPriceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private schoolService: SchoolService) {
    
    
    this.Tokendata = JSON.parse(localStorage.getItem("token")) as users;
    this.yearId = this.Tokendata.id;
    
    
  }

  ngOnInit() {

    this.iniForm();
    this.setupUpdate();
  }

  
  iniForm() {
   
    this.form = this.fb.group({
      id: [0],
      classId: [this.data.classId],
      yearId: [this.yearId],
      classFees: [null, [Validators.max(9999)]],
     

    });
  }

  
  submit() {
    //null;
  }
  
  closeDialog(): void {
    this.dialogRef.close();
  }
  public get name(): AbstractControl {
    return this.form.get('classFees');
  }

  submit2() {
    if (!this.form.valid) {
   

      this.validator.markFormTouched(this.form);
      return;
    }

    this.loading = true;
    this.edit ? this.updateClass() : this.addClass();
  }

  //Add
  addClass() {
  console.log("ADD")
    this.service.addClass(this.form.value).subscribe(
      res => {
      //  this.event.emit(this.form.value);
        this.dialogRef.close(this.form.value);
      },
      err => console.log(err)
    );
  }
  
  //Update
  setupUpdate() {
   
 console.log("UPDATE")
    if (!this.data.classId) {
      return;
    }

   
    // this.id = +params.id;
    this.edit = true;
    this.loading = true;
   
    this.service.getClass(this.data.classId, this.yearId).subscribe(res => {
     // console.log(res)
      if (res != null)
        this.form = this.validator.patchForm(this.form, res);
      else
        this.edit=false
    },
    error=>this.edit=false);
  }

  


  
  updateClass() {
    console.log(this.id);
    this.service.getClass(this.data.classId,this.yearId).subscribe(da => {
      console.log("da.id="+da.id)
      this.service.updateClass(da.id, this.form.value).subscribe(
        res => {
          this.dialogRef.close(this.form.value);
        },
        err => console.log(err)
      );
      
    });
}

}
