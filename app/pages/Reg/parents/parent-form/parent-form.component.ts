import { Lkplookup } from './../../../../Models/Lookups/lkplookup';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { RegParentService } from '../reg-parent.service';
import

 { ValidationBase } from 'src/app/validationBase';
import { Router, ActivatedRoute } from '@angular/router';
import { LookupTypes } from 'src/app/Models/Enum/SystemEnum';
import { LookupsApiService } from 'src/app/pages/lookups/lookups-api.service';
import { forEach } from '@angular/router/src/utils/collection';
import { LookupFilter } from 'src/app/Models/Lookups/LookupFilter';

@Component({
  selector: 'app-parent-form',
  templateUrl: './parent-form.component.html',
  styleUrls: ['./parent-form.component.scss']
})


export class ParentFormComponent implements OnInit {

  martial: Lkplookup[];
  martialList: Lkplookup[];
  cities: Lkplookup[];
  citiesList: Lkplookup[];
  religions: Lkplookup[];
  religionsList: Lkplookup[];
  nationalList:Lkplookup[];
  countries: Lkplookup[];
  countriesList: Lkplookup[];
  idTypes: Lkplookup[];
  idTypesList: Lkplookup[];
  healthStatus: Lkplookup[];
  healthStatusList: Lkplookup[];
  bloodType: Lkplookup[];
  bloodTypeList: Lkplookup[];
  personTitles: Lkplookup[];
  personTitlesList: Lkplookup[];
  genders: Lkplookup[];
  genderList: Lkplookup[];
  educationList: Lkplookup[];
  relationList: Lkplookup[];

  lookupFilter: LookupFilter;
  form:FormGroup;
  loading = false;
  edit = false;
  returnUrl = '/parents/index';
  id: number;
  constructor(
    private formbuilder: FormBuilder,
    public validator: ValidationBase,
    private router: Router,
    private service: RegParentService,
    private route: ActivatedRoute,
    private lookup: LookupsApiService
  ) { 
    this.lookupFilter = new LookupFilter();
    this. getLookups2();
    this.initForm();
   // 
  }

  ngOnInit() {
   
    this.setupUpdate();
  }
  
  
  addParent() {
    this.service.addParent(this.form.value).subscribe(
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
    this.edit?this.updateParent(): this.addParent();
  
    
  }
  public get name(): AbstractControl {
    return this.form.get('firstName');
  }
  
  
  initForm() {
    this.form = this.formbuilder.group({
      id: [0],
      idNum:[''],
      firstName: ['', [Validators.required]],
      secondName: ['', [Validators.required]],
      familyName: ['', [Validators.required]],
      firstLName: [''],
      secondLName: [''],
      familyLName: [''],
      motherName:[null],
      religionId:[null],
      nationalityId:[null],
      cityId:[null],
      locality1:[null],
      locality2:[null],
      address:[null],
      street:[null],
      buildingNo:[null],
      fatherEducationId:[null],
      fatherSpec:[null],
      matherEducationId:[null],
      matherSpec:[null],
      parentRelationId:[null],
      parentName:[null],
      parentWork:[null],
      familySize:[null],
      familyIncome:[null],
      familyAssistance:[null],
      refugeeCardNo:[null],
      tel:[null],
      fatherMobile:[null],
      motherMobile:[null],
      smsParent:[null],
      smsMobile:[null],
      parentEmail:[null],
      parentFace:[null],
      note:[null]

     
    });
  }

  //element:Lkplookup[];

  private fillLookups(res: any) {
   console.log("begin");
   res.forEach((element: Lkplookup[])  => {
   // for(let element of res){
     console.log("Loop");
    //  console.log(element[element.typeId]);
      switch ( element[0].typeId) {
        case LookupTypes.MartialStatus:
          this.martial = element;
          this.martialList = this.martial;
          break;
        case LookupTypes.Cities:
          this.cities = element;
          this.citiesList = this.cities;
          break;
        case LookupTypes.Religions:
          
          this.religions = element;
          this.religionsList = this.religions;
          
          break;
          
        case LookupTypes.Countries:
          this.countries = element;
          this.countriesList = this.countries;
          break;
        case LookupTypes.IdTypes:
          this.idTypes = element;
          this.idTypesList = this.idTypes;
          break;
        case LookupTypes.HealthStatus:
          this.healthStatus = element;
          this.healthStatusList = this.healthStatus;
          break;
        case LookupTypes.BloodType:
          this.bloodType = element;
          this.bloodTypeList = this.bloodType;
          break;
        case LookupTypes.PersonTitle:
          this.personTitles = element;
          this.personTitlesList = this.personTitles;
          break;
        case LookupTypes.Gender:
          this.genders = element;
          this.genderList = this.genders;
          break;
        case LookupTypes.Nationalities:
            this.nationalList=element;
        case LookupTypes.EducationLevel:
          this.educationList=element;
        case LookupTypes.Relationships:
          this.relationList=element;
        default:
          break;
      }
    }
    );
  }

  private getLookups2() {
    this.lookup.getLookupsByType2([LookupTypes.MartialStatus, LookupTypes.Countries,
    LookupTypes.IdTypes, LookupTypes.Cities, LookupTypes.Religions, LookupTypes.HealthStatus,
    LookupTypes.BloodType, LookupTypes.PersonTitle, LookupTypes.Gender, LookupTypes.Nationalities,
  LookupTypes.EducationLevel,LookupTypes.Relationships])
      .subscribe(
        res => this.fillLookups(res),
        _err => { console.log("Error") },
        () => { console.log("Complite")
         // this.setupValidation();
       //   this.setUpUpdate();
        });
  }
  /*
  private getLookups2() {
    this.lookup.getLookupsByType2([LookupTypes.MartialStatus, LookupTypes.Countries,
    LookupTypes.IdTypes, LookupTypes.Cities,  LookupTypes.HealthStatus,
    LookupTypes.BloodType, LookupTypes.PersonTitle, LookupTypes.Gender,LookupTypes.Religions])
      .subscribe(
        res => {console.log(res), this.fillLookups(res)},
        _err => { console.log("error") },
        () => {
          console.log("comlite");
        //  this.setupValidation();
         // this.setUpUpdate();
        });
  }
  */

  private getLookups() {
    this.lookup.getLookupsByType2([LookupTypes.MartialStatus, LookupTypes.Religions]).subscribe(res => {
     console.log(LookupTypes.MartialStatus),
     console.log(LookupTypes.Religions),
      console.log(res),
      res.forEach((element: Lkplookup[]) => {
        console.log(element[0].typeId);
        switch (element[0].typeId) {
          case LookupTypes.MartialStatus:
            this.martialList = element;
            break;
          case LookupTypes.Religions:
            this.religionsList = element;
            break;
          default:
            break;
        }
      });
    });
  }

  //-----------Update

  
  updateParent() {
    this.service.updateParent(this.id, this.form.value).subscribe(
      res => {
        console.log("*updateParent*");
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
      console.log('setupUpdate, id='+this.id);
      this.service.getParentById(this.id).subscribe(res => {
        this.form = this.validator.patchForm(this.form, res);
        console.log(res);
      }, err => console.log(err),
      () => this.loading = false);
    });
  }

  
}
