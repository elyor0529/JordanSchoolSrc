import { RegStudComponent } from './reg-stud/reg-stud.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { regStudRoute } from './reg-stud.routing';
import { RegStudService } from './reg-stud.service';
import { GetParentComponent } from './get-parent/get-parent.component';
import { MatSelectModule, MatFormFieldModule } from '@angular/material';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({

    declarations:[
        RegStudComponent,
        GetParentComponent

    ],

    imports:[
CommonModule,
SharedModule,
RouterModule.forChild(regStudRoute),
FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatFormFieldModule,
        NgxMatSelectSearchModule

    ],
providers:[RegStudService]
})
export class RegStudModule{}