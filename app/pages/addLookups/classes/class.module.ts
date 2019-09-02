import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClassIndexComponent } from './class-index/class-index.component';
import { classRoutes } from './class.routing';
import { ClassService } from './class.service';
import { ClassFormComponent } from './class-form/class-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClassPriceComponent } from './class-price/class-price.component';

@NgModule({
  declarations: [
    ClassIndexComponent,
    ClassFormComponent,
    ClassPriceComponent
  ],
  entryComponents:[
    ClassPriceComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(classRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers:[ClassService]
})
export class ClassModule { }
