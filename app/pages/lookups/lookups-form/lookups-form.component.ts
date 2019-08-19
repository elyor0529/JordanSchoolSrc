import { LookupsApiService } from './../lookups-api.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidationBase } from 'src/app/validationBase';
import { LookupTypeApiService } from '../lookup-type-api.service';

@Component({
  selector: 'app-lookups-form',
  templateUrl: './lookups-form.component.html',
  styleUrls: ['./lookups-form.component.scss']
})
export class LookupsFormComponent implements OnInit {

  loading = false;
  public lookupForm: FormGroup;
  returnUrl = '/lookups/index';
  edit = false;
  id: number;
  typeId: any;


  public typeList:any[]

  constructor(private service:LookupsApiService,
    private router: Router,
    public validator: ValidationBase,
    private fb: FormBuilder,
    private typeService: LookupTypeApiService,
    private route: ActivatedRoute) { 
      this.initForm();
      this.getTypes();
    }


    
 public getTypes(){
  return this.typeService.LookupTypes().subscribe(
    get=>{console.log(get),this.typeList=get},
    err=>console.log('error'),
    ()=>console.log('Complite')
  )
}
  ngOnInit() {
   
    this.typeId = this.service.sTypeId;
    this.setupUpdate();
    //this.initForm();
   // this.getTypes();

  }

  
  initForm() {
    this.lookupForm = this.fb.group({
      id: [0],
      aname: ['', [Validators.required]],
      lname: [''],
      value:[''],
      typeId: [,[Validators.required]]
    });
  }

  
  addLookup() {
    this.service.addLookup(this.lookupForm.value).subscribe(
      res => {
        this.router.navigateByUrl(this.returnUrl);
      },
      err => console.log(err)
    );
  }
  submit() {
    if (!this.lookupForm.valid) {
      this.validator.markFormTouched(this.lookupForm);
      return;
    }

    this.loading = true;
    this.edit ? this.updateLookup() : this.addLookup();
  }
  
  updateLookup() {
    this.service.updateLookup(this.id, this.lookupForm.value).subscribe(
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
      this.service.getLookup(this.id).subscribe(res => {
        this.lookupForm = this.validator.patchForm(this.lookupForm, res);
      }, err => console.log(err),
      () => this.loading = false);
    });
  }

  
  public get name(): AbstractControl {
    return this.lookupForm.get('aname');
  }

}
