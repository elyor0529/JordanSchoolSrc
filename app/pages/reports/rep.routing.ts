

import { Routes, RouterModule } from '@angular/router';
import { RepIndexComponent } from '../reports/students/rep-index/rep-index.component';
import { CardRepComponent } from './students/card-rep/card-rep.component';

export const repRoutes: Routes = [
  { path:'',
  children:[
    {path:'', redirectTo:'index'},
    { path: 'index', component: RepIndexComponent },
    {path:'cardRep/:id', component:CardRepComponent}
  ]
 },
];

//export const TourRoutes = RouterModule.forChild(routes);
