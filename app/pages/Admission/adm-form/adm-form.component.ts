import { Admission } from './../../../Models/Admission/admission';
import { BusService } from './../../addLookups/Buses/bus.service';
import { AdmService } from './../adm.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidationBase } from 'src/app/validationBase';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Lkplookup } from 'src/app/Models/Lookups/lkplookup';
import { LkpSection } from 'src/app/Models/addLookups/sections/lkpSection';
import { LookupTypes } from 'src/app/Models/Enum/SystemEnum';
import { LookupsApiService } from '../../lookups/lookups-api.service';
import { ClassService } from '../../addLookups/classes/class.service';
import { TourService } from '../../addLookups/tours/tour.service';
import { lkpTour } from 'src/app/Models/addLookups/tours/lkpTour';
import { LkpBus } from 'src/app/Models/addLookups/bus/lkpBus';
import { lkpClass } from 'src/app/Models/addLookups/classes/lkpClass';

@Component({
  selector: 'app-adm-form',
  templateUrl: './adm-form.component.html',
  styleUrls: ['./adm-form.component.scss']
})
export class AdmFormComponent implements OnInit {

  @Output() event=new EventEmitter<Admission>(true);
  loading = false;
  public formGroup: FormGroup;
  returnUrl = '/admissions/index';
  edit = false;
  id: number;
  parentId:any;
  fatherName:any;
  tourValue:any;
  tourTypeValue:any;
  tourPrice:any=0;

  
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
  classList:lkpClass[];
  tourList: lkpTour[];
  busList: LkpBus[];
  tourTypeList:Lkplookup[];
  
  constructor( private router: Router,
    public validator: ValidationBase,
    private fb: FormBuilder,
    private service: AdmService,
    private route: ActivatedRoute,
    private lookup: LookupsApiService,
    private classService: ClassService,
    private tourService:TourService,
    private busService: BusService
    ) { 

      this.parentId=this.service.sParentId;
      this.fatherName=this.service.sParentName;
      this.iniForm();
    }

    message:string;
pp:string;
  ngOnInit() {
   
    this.getLookups();
    this. getClassList();
    this.getTourList();
    this.getBusList();

      this.service.currentMessage.subscribe(message => this.message = message);
      
   //   this.service.currentParentIdParam.subscribe(p => this.parentId = p);

//this.parentId=this.service.sParentId;
//console.log(this.parentId);

  }

  getClassList(){
    return this.classService.classList().subscribe(res=>this.classList=res);
  }
  getTourList(){
    return this.tourService.tourList().subscribe(res=>this.tourList=res);
  }
  getBusList(){
    return this.busService.busList().subscribe(res=>this.busList=res);
  }

  newMessage() {
    let x = this.service.changeMessage("Hello from Sibling");
   // console.log(this.message);
  }

  iniForm(){
    this.formGroup=this.fb.group({

      id:[0],
      firstName:[null],
      parentId:[this.parentId],
      studNo:[null],
      schoolId:[null],
      sectionId:[null],
      nationalityId:[null],
      fatherName:[this.fatherName],
      entryDate:[null],
      religionId:[null],
      birthDate:[null],
      genderId:[null],
      yearId:[null],
      classId:[null],
      classSeqId:[null],
      tourId:[null],
      tourTypeId:[null],
      busId:[null],
      tourPrice:[0],
      studentBrotherSeq:[null],
      brotherDescountType:[null],
      busNote:[null],
      note:[null],


    });
  }

  
  addStud() {
    this.service.admInsert(this.formGroup.value).subscribe(
      res => {
        this.event.emit(this.formGroup.value);
        this.router.navigateByUrl(this.returnUrl);
      },
      err => console.log(err)
    );
  }

  submit() {
    if (!this.formGroup.valid) {
      this.validator.markFormTouched(this.formGroup);
      return;
    }

    this.loading = true;
   /* this.edit ? this.updateLookup() :*/ this.addStud();
  }

  public get name(): AbstractControl {
    return this.formGroup.get('firstName');
  }
  
/// Fill Lookups

private fillLookups(res: any) {
  console.log("------begin----------");
  
  console.log(res);
  
  res.forEach((element: Lkplookup[])  => {
    console.log("1)"+element[0].typeId+" "+element[0].aname);
   // console.log("2)"+element[1].typeId+" "+element[1].aname);
    console.log(element);
     switch ( element[0].typeId) {  //1
       case LookupTypes.MartialStatus:
         this.martialList = element; //1 2 3......
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
              case LookupTypes.TourType:
                this.tourTypeList=element;
       default:
         break;
     }
   }
   );
 }

 
 private getLookups() {

  console.log("start res1");
  
  this.lookup.getLookupsByType2([LookupTypes.MartialStatus, LookupTypes.Countries,
  LookupTypes.IdTypes, LookupTypes.Cities, LookupTypes.Religions, LookupTypes.HealthStatus,
  LookupTypes.Gender, LookupTypes.Nationalities,
LookupTypes.EducationLevel,LookupTypes.Relationships,
  LookupTypes.Years,LookupTypes.Terms, LookupTypes.ClassSeq, LookupTypes.TourType])
    .subscribe(
      res => {this.fillLookups(res), console.log("res="); console.log(res);
      },
      _err => { console.log("Error") },
      () => { console.log("Complite")
       // this.setupValidation();
     //   this.setUpUpdate();
      });
}


/// Tour Calculations

onTourChange(){
let n=-1;
  let tourIndex=this.tourList.findIndex(i=>i.id===this.tourValue);
  let tourTypeIndex =this.tourTypeList.findIndex(i=>i.id===this.tourTypeValue);

  let tourFullPrice=this.tourList[tourIndex].tourFullPrice;
  let tourHalfPrice=this.tourList[tourIndex].tourHalfPrice;

  if(tourTypeIndex>=0 && tourIndex>=0){
    if(tourTypeIndex===2)
    this.tourPrice=tourFullPrice;
    else
    this.tourPrice=tourHalfPrice;

  }

  console.log("index="+tourTypeIndex+"   value="+this.tourTypeValue+
  "  tourIndex="+tourIndex+"  tourValue="+this.tourValue);
   console.log("index= "+tourIndex+"  F="+tourFullPrice+" H="+tourHalfPrice+
   "  tourTypeIndex="+tourTypeIndex+" tourPrice="+this.tourPrice);

}

}
