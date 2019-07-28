import { RegStudComponent } from './reg-stud/reg-stud.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { regStudRoute } from './reg-stud.routing';
import { RegStudService } from './reg-stud.service';

@NgModule({

    declarations:[
        RegStudComponent

    ],

    imports:[
CommonModule,
SharedModule,
RouterModule.forChild(regStudRoute),
FormsModule,
ReactiveFormsModule

    ],
providers:[RegStudService]
})
export class RegStudModule{}