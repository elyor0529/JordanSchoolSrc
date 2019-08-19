import { RouterModule } from '@angular/router';
import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourIndexComponent } from './tour-index/tour-index.component';
import { tourRoutes } from './tour.routing';
import { TourService } from './tour.service';
import { TourFormComponent } from './tour-form/tour-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TourIndexComponent,
    TourFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(tourRoutes),
    FormsModule,
    ReactiveFormsModule

  ],
  providers:[TourService]
})
export class TourModule { }
