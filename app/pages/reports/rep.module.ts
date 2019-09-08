import { RepIndexComponent } from './students/rep-index/rep-index.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RepService } from './rep.service';
import { repRoutes } from './rep.routing';
import { CardRepComponent } from './students/card-rep/card-rep.component';
import { StudentsNamesRepComponent } from './students/students-names-rep/students-names-rep.component';
import { StudentsNamesParamsComponent } from './students/students-names-params/students-names-params.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';



@NgModule({
  declarations: [
    RepIndexComponent,
    CardRepComponent,
    StudentsNamesRepComponent,
    StudentsNamesParamsComponent
  ],
  entryComponents:[
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(repRoutes),
    NgxMatSelectSearchModule 

  ],
  providers:[RepService]
})
export class RepModule { }
