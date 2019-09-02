import { LkpSection } from './../../../../Models/addLookups/sections/lkpSection';
import { SectionService } from './../../../addLookups/sections/section.service';

import { Student } from 'src/app/Models/Reg/Students/students';
import { StudentService } from './../student.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators, RequiredValidator } from '@angular/forms';
import { ValidationBase } from 'src/app/validationBase';
import { Router, ActivatedRoute } from '@angular/router';
import { LookupsApiService } from 'src/app/pages/lookups/lookups-api.service';
import { Lkplookup } from 'src/app/Models/Lookups/lkplookup';
import { LookupTypes } from 'src/app/Models/Enum/SystemEnum';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {

  form:FormGroup;
  loading = false;
  edit = false;
  returnUrl = '/students/index';
  id: number;
  students:Student[];


 
  martialList: Lkplookup[];
  citiesList: Lkplookup[];
  religionsList: Lkplookup[];
  nationalList:Lkplookup[];
  countriesList: Lkplookup[];
  idTypesList: Lkplookup[];
  healthStatusList: Lkplookup[];
  genderList: Lkplookup[];
  educationList: Lkplookup[];
  relationList: Lkplookup[];
  YearsList: Lkplookup[];
  TermsList:Lkplookup[];
  sectionList:LkpSection[];
  classSeqList:Lkplookup[];
 

  constructor(
    private formbuilder: FormBuilder,
    public validator: ValidationBase,
    private router: Router,
    private service: StudentService,
    private route: ActivatedRoute,
    private lookup: LookupsApiService,
    private secctionService:SectionService
  ) { 
    this.students=[];
    this.initForm();
  }

  //Add
    addStudent() {
    this.service.addStudent(this.form.value).subscribe(
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
    this.edit?this.updateStudent(): this.addStudent();
    
  }
  public get name(): AbstractControl {
    return this.form.get('firstName');
  }

  initForm() {
    this.form = this.formbuilder.group({
      id: [0],
      studNo:['',[Validators.required]],
      firstName: ['',[Validators.required]],
      parentId: [''],
      idNum: [''],
      firstLName: [''],
      birthDate:[''],
      birthPlace:[''],

      genderId:[''],
      studMobile: [''],
      previousSchool: [''],
      joinYearId: [''],
      joinTermId: [''],
      schoolId:[''],
      sectionId:[''],

      classId:[''],
      classSeqId: [''],
      image: [''],
      email: [''],
      studFace: [''],
      studBrotherSeq:[''],
      studHealthId:[''],

      diseaseName:[''],
      medicamentName: [''],
      note: ['']
     
    })
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
       
        this.service.getStudent(this.id).subscribe(res => {
          this.form = this.validator.patchForm(this.form, res);
      
          console.log(res);
        }, err => console.log(err),
        () => this.loading = false);
      });
    }

    updateStudent() {
      this.service.updateStudent(this.id, this.form.value).subscribe(
        res => {
          this.router.navigateByUrl(this.returnUrl);
        },
        err => console.log(err)
      );
    }

    
  ngOnInit() {

    this.setupUpdate();
    this. getLookups();
    this.getSection();
  }
  

  
  private fillLookups(res: any) {
    res.forEach((element: Lkplookup[])  => {
      console.log("Loop");
       switch ( element[0].typeId) {
         case LookupTypes.MartialStatus:
           this.martialList = element;
           break;
         case LookupTypes.Cities:
           this.citiesList = element;
           break;
         case LookupTypes.Religions:
          this.religionsList = element;
           break;
         case LookupTypes.Countries:
           this.countriesList = element;
           break;
         case LookupTypes.IdTypes:
           this.idTypesList = element;
           break;
         case LookupTypes.HealthStatus:
           this.healthStatusList = element;
           break;
         case LookupTypes.Gender:
           this.genderList = element;
           break;
         case LookupTypes.Nationalities:
             this.nationalList=element;
             break;
         case LookupTypes.EducationLevel:
           this.educationList=element;
           break;
         case LookupTypes.Relationships:
           this.relationList=element;
           break;
           case LookupTypes.Years:
            this.YearsList=element;
            break;
            case LookupTypes.Terms:
              this.TermsList=element;
              break;
              case LookupTypes.ClassSeq:
                this.classSeqList=element;
                break;
         default:
           break;
       }
     }
     );
   }
 
   private getLookups() {
    this.lookup.getLookupsByType2([LookupTypes.MartialStatus, LookupTypes.Countries,
    LookupTypes.IdTypes, LookupTypes.Cities, LookupTypes.Religions, LookupTypes.HealthStatus,
    LookupTypes.Gender, LookupTypes.Nationalities,
  LookupTypes.EducationLevel,LookupTypes.Relationships,
LookupTypes.Years,LookupTypes.Terms, LookupTypes.ClassSeq])
      .subscribe(
        res => this.fillLookups(res),
        _err => { console.log("Error") },
        () => { console.log("Complite")
         // this.setupValidation();
       //   this.setUpUpdate();
        });
  }

  //get sections

  getSection(){
this.secctionService.sectionList().subscribe(
  res=> this.sectionList=res
)
  }
  
}
