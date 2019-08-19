import { RepIndexComponent } from './students/rep-index/rep-index.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RepService } from './rep.service';
import { repRoutes } from './rep.routing';
import { CardRepComponent } from './students/card-rep/card-rep.component';



@NgModule({
  declarations: [
    RepIndexComponent,
    CardRepComponent
  ],
  entryComponents:[
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(repRoutes),

  ],
  providers:[RepService]
})
export class RepModule { }
