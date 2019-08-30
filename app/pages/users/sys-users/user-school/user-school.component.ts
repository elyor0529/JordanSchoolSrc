import { SchoolService } from './../../../addLookups/schools/school.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ValidationBase } from 'src/app/validationBase';
import { Router, ActivatedRoute } from '@angular/router';
import { userSchoolService } from './userSchool.service';

@Component({
  selector: 'app-user-school',
  templateUrl: './user-school.component.html',
  styleUrls: ['./user-school.component.scss']
})
export class UserSchoolComponent implements OnInit {


  
  form:FormGroup;
  loading = false;
  edit = false;
  returnUrl = '/users/index';
  id: number;
  schoolLis: any;

  constructor(private service: userSchoolService,private schoolService: SchoolService,
    private formbuilder: FormBuilder,
    public validator: ValidationBase,
    private router: Router,
    private route: ActivatedRoute, ) { 
    
    
    }

  ngOnInit() {
    this.getSchoolList();
    this.setupUpdate();
    this.initForm();
  }

  getSchoolList() {
    return this.schoolService.schoolList().subscribe(res => this.schoolLis = res)
  }

  //Update
  setupUpdate() {
    this.route.params.subscribe(params => {
      if (!params.id) {
        return;
      }

      this.id = +params.id;
      this.edit = true;
      this.loading = true;
     
      this.service.getUserById(this.id).subscribe(res => {
        if (res == null) this.edit = false
        else
        this.form = this.validator.patchForm(this.form, res);
    
        console.log(res);
      }, err => { this.edit = false; console.log("xxxxxxxxxxxxxx") },
      () => this.loading = false);
    });
  }

  
  initForm() {
    this.form = this.formbuilder.group({
      id: [0],
      userId: [this.id],
      schoolId: [''],
    
    })
  }


  // public get name(): AbstractControl {
  //   return this.form.get('schoolId');
  // }

  
  submit() {
    
    if (!this.form.valid) {
      this.validator.markFormTouched(this.form);
      return;
    }
       
    this.loading = true;
    this.edit?this.updateUser():this.addUser();
    
  }

  updateUser() {
    this.service.updateUser(this.id, this.form.value).subscribe(
      res => {
        this.router.navigateByUrl(this.returnUrl);
      },
      err => console.log(err)
    );
  }
  //Add
  addUser() {
    this.service.addUser(this.form.value).subscribe(
      res => {
        this.router.navigateByUrl(this.returnUrl);
      },
      err => console.log(err)
    );
  }

  
}
