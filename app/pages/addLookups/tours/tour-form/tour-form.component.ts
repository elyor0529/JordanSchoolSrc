import { LookupsApiService } from './../../../lookups/lookups-api.service';
import { lkpTour } from 'src/app/Models/addLookups/tours/lkpTour';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { ValidationBase } from 'src/app/validationBase';
import { Router, ActivatedRoute } from '@angular/router';
import { SchoolService } from '../../schools/school.service';
import { TourService } from '../tour.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tour-form',
  templateUrl: './tour-form.component.html',
  styleUrls: ['./tour-form.component.scss']
})
export class TourFormComponent implements OnInit {

  
  form:FormGroup;
  loading = false;
  edit = false;
  returnUrl = '/tours/index';
  id: number;
  schoolList: any;
  tourList: any;
  constructor(
    private fb: FormBuilder,
    public validator: ValidationBase,
    private router: Router,
    private schoolService: SchoolService,
    private route: ActivatedRoute,
    private service: TourService,
    private lookupService: LookupsApiService
    
  ) {
    this.getSchoolList();
    this.getTourLookup();
    this.initForm();
   }

  ngOnInit() {
    this.setupUpdate();
  }

  
  initForm() {
    this.form = this.fb.group({
      id: [0],
     tourFullPrice: [''],
     tourHalfPrice: [''],
     tourNameId:['', [Validators.required]],
      schoolId: ['']
    });
  }
  
  getSchoolList(){
    return this.schoolService.schoolList().subscribe(result=>this.schoolList=result);
  }

  getTourLookup(){
    return this.lookupService.getLookupsByType(44).subscribe(result=>this.tourList=result);
  }

  
  addTour() {
    this.service.addTour(this.form.value).subscribe(
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
    this.edit ? this.updateTour() : this.addTour();
    
  }

  public get name(): AbstractControl {
    return this.form.get('id');
  }

  
  updateTour() {
    this.service.updateTour(this.id, this.form.value).subscribe(
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
      this.service.getTour(this.id).subscribe(res => {
          this.form = this.validator.patchForm(this.form, res);
       
      }, err => console.log(err),
      () => this.loading = false);
    });
  }

 
}
