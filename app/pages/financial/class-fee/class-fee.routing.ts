import { Routes } from '@angular/router';
import { ClassFeeIndexComponent } from './class-fee-index/class-fee-index.component';
import { ClassFeeFormComponent } from './class-fee-form/class-fee-form.component';


export const classFeeRoutes:Routes=[

    {path:'',
    children:
[
  {path:'', redirectTo:'index',pathMatch:'full'},
  {path:'index', component:ClassFeeIndexComponent },
  {path:'add', component:ClassFeeFormComponent},
  {path:'edit/:id',component:ClassFeeFormComponent},
]},
];