import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ValidationBase } from 'src/app/validationBase';
import { Router, ActivatedRoute } from '@angular/router';
import { SectionService } from 'src/app/pages/addLookups/sections/section.service';
import { SchoolService } from 'src/app/pages/addLookups/schools/school.service';
import { FinItemService } from '../fin-item.service';
import { Lkplookup } from 'src/app/Models/Lookups/lkplookup';
import { LookupFilter } from 'src/app/Models/Lookups/LookupFilter';
import { LookupsApiService } from 'src/app/pages/lookups/lookups-api.service';
import { LookupTypes } from 'src/app/Models/Enum/SystemEnum';

@Component({
  selector: 'app-fin-item-form',
  templateUrl: './fin-item-form.component.html',
  styleUrls: ['./fin-item-form.component.scss']
})
export class FinItemFormComponent implements OnInit {

  cdType: Lkplookup[];
  cdTypeList: Lkplookup[];

  vpType: Lkplookup[];
  vpTypeList: Lkplookup[];

  lookupFilter: LookupFilter;

  form: FormGroup;
  loading = false;
  edit = false;
  returnUrl = '/financial/finItem/index';
  id: number;

  constructor(
    private fb: FormBuilder,
    public validator: ValidationBase,
    private router: Router,
    private service: FinItemService,
    private route: ActivatedRoute,
    private lookupService: LookupsApiService

  ) {
    this.lookupFilter = new LookupFilter();
    this.getLookups2();
    this.initForm();
  }



  private getLookups2() {
    this.lookupService.getLookupsByType2([
      LookupTypes.CDType,
      LookupTypes.VPType
    ])
      .subscribe(
        res => {
         // console.log('essssss'+(res[0].aname));
          this.fillLookups(res)
         
        },
        _err => { console.log("Error") },
        () => {
          console.log("complete")
        });
  }



  private fillLookups(data: any) {
    console.log("begin");
    data.forEach((element: Lkplookup[]) => {
      // for(let element of res){
      console.log("Loop");
      //  console.log(element[element.typeId]);
      switch (element[0].typeId) {
        case LookupTypes.CDType:
         { this.cdTypeList = element;
          console.log ('cdType'+'11');
        //  this.cdTypeList = this.cdType;
        }
          break;
        case LookupTypes.VPType:
          this.vpType = element;
          console.log ('VPType'+'11');
          this.vpTypeList = this.vpType;
        default:
          break;
      }
    }
    );
  }

  ngOnInit() {
    this.setupUpdate();
  }


  initForm() {
    this.form = this.fb.group({
      id: [0],
      arDesc: ['', [Validators.required]],
      laDesc: [''],
      cdTypeId: [''],
      vpTypeId: ['']
    });
  }




  submit() {

    if (!this.form.valid) {
      this.validator.markFormTouched(this.form);
      return;
    }

    this.loading = true;
    this.edit ? this.updateFinItem() : this.addFinItem();

  }


  addFinItem() {
    this.service.addFinItem(this.form.value).subscribe(
      res => {
        this.router.navigateByUrl(this.returnUrl);
      },
      err => console.log(err)
    );
  }


  updateFinItem() {
    this.service.updateFinItem(this.id, this.form.value).subscribe(
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
      this.service.getFinItemById(this.id).subscribe(res => {
        this.form = this.validator.patchForm(this.form, res);
      }, err => console.log(err),
        () => this.loading = false);
    });
  }


  public get name(): AbstractControl {
    return this.form.get('arDesc');
  }

}
