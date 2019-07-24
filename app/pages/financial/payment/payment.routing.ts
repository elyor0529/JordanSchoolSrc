import { Routes } from '@angular/router';
import { PaymentIndexComponent } from './payment-index/payment-index.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';


export const paymentRoutes:Routes=[

    {path:'',
    children:
[
  {path:'', redirectTo:'index',pathMatch:'full'},
  {path:'index', component:PaymentIndexComponent },
  {path:'add', component:PaymentFormComponent},
  {path:'edit/:id',component:PaymentFormComponent},
  // {path:'view/:id',component:PaymentViewComponent}
]},
];