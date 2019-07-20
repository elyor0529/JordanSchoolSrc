import { Routes } from '@angular/router';
import { SchoolFeeFormComponent } from './school-fee-form/school-fee-form.component';
import { SchoolFeeIndexComponent } from './school-fee-index/school-fee-index.component';

export const schoolFeeRoutes:Routes=[

    {path:'',
    children:
[
  {path:'', redirectTo:'index',pathMatch:'full'},
  {path:'index', component:SchoolFeeIndexComponent },
  {path:'add', component:SchoolFeeFormComponent},
  {path:'edit/:id',component:SchoolFeeFormComponent},
]},
];