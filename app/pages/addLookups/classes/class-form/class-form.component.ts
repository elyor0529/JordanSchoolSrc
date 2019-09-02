import { SchoolService } from './../../schools/school.service';
import { LkpSection } from 'src/app/Models/addLookups/sections/lkpSection';
import { SectionService } from 'src/app/pages/addLookups/sections/section.service';
import { ClassService } from './../class.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidationBase } from 'src/app/validationBase';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { LkpSchool } from 'src/app/Models/addLookups/schools/lkpSchool';


@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.scss']
})
export class ClassFormComponent implements OnInit {

 
  form:FormGroup;
  loading = false;
  edit = false;
  returnUrl = '/classes/index';
  id: number;

  schoolId = this.service.sSchoolId;
  sectionList: LkpSection[];
  schoolList: LkpSchool[];
  classGenderList = [{ id: 0, desc: "جميعا" }, { id: 1, desc: "الاولاد" }, { id: 2, desc: "البنات" }];

  constructor( private router: Router,
    public validator: ValidationBase,
    private fb: FormBuilder,
    private service: ClassService,
    private route: ActivatedRoute,
    private sectionService: SectionService,
  private schoolService:SchoolService) { }

  ngOnInit() {
    this.iniForm();
    this.getSchoolList();
    this.onSchoolChange(this.schoolId);
    this.setupUpdate();
  }

  
  getSchoolList() {
    return this.schoolService.schoolList().subscribe(res => {
    this.schoolList = res;
      
    })
  }

  onSchoolChange(schoolId) {
    this.getSectionList(schoolId);
  }

  getSectionList(schoolId) {
    return this.sectionService.sectionBySchoolList(schoolId).subscribe(res => this.sectionList = res)
  }
  
  iniForm() {
   
    this.form = this.fb.group({
      id: [0],
      aname: [null, [Validators.required]],
      lname: [null],
      capacity: [0, [Validators.max(999)]],
      age: [0,[Validators.max(20)]],
      schoolId: [this.schoolId],
      sectionId: [null],    
      classGender:[0]

    });
  }

 
   
  //Add
  addClass() {
    this.service.addClass(this.form.value).subscribe(
      res => {
        this.router.navigateByUrl(this.returnUrl);
      },
      err => console.log(err)
    );
  }
  
  submit() {
    
    if (!this.form.valid) {
      this.validator.markFormTouched(this.form);
      return;
    }
       
    this.loading = true;
     this.edit ? this.updateClass() :
      this.addClass();
    
  }

  public get name(): AbstractControl {
    return this.form.get('aname');
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
     
      this.service.getClass(this.id).subscribe(res => {
        this.form = this.validator.patchForm(this.form, res);
    
      }, err => console.log(err),
      () => this.loading = false);
    });
  }

  updateClass() {
    this.service.updateClass(this.id, this.form.value).subscribe(
      res => {
        this.router.navigateByUrl(this.returnUrl);
      },
      err => console.log(err)
    );
  }




}
