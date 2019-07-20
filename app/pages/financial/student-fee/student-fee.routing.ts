import { Routes } from '@angular/router';

import { StudentFeeIndexComponent } from './student-fee-index/student-fee-index.component';

import { StudentFeeFormComponent } from './student-fee-form/student-fee-form.component';

export const studentFeeRoutes:Routes=[

    {path:'',
    children:
[
  {path:'', redirectTo:'index',pathMatch:'full'},
  {path:'index', component:StudentFeeIndexComponent },
  {path:'add', component:StudentFeeFormComponent},
  {path:'edit/:id',component:StudentFeeFormComponent},
]},
];