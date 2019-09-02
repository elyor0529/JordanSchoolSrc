import { ClassPriceComponent } from './class-price/class-price.component';
import { ClassFormComponent } from './class-form/class-form.component';
import { Routes, RouterModule } from '@angular/router';
import { ClassIndexComponent } from './class-index/class-index.component';

export const classRoutes: Routes = [
  { path:'',
children:[
  {path:'',redirectTo:"index"},
  {path:'index',component:ClassIndexComponent},
  { path: 'add', component: ClassFormComponent },
  { path: 'edit/:id', component: ClassFormComponent },
  { path: 'price', component: ClassPriceComponent },
]
},
];

//export const BusRoutes = RouterModule.forChild(routes);
