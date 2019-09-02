

import { Routes, RouterModule } from '@angular/router';
import { RepIndexComponent } from '../reports/students/rep-index/rep-index.component';
import { CardRepComponent } from './students/card-rep/card-rep.component';
import { StudentsNamesParamsComponent } from './students/students-names-params/students-names-params.component';

export const repRoutes: Routes = [
  { path:'',
  children:[
    {path:'', redirectTo:'index'},
    { path: 'index', component: RepIndexComponent },
    {path:'cardRep/:id', component:CardRepComponent},
    {path:'ClassStudentsList', component:StudentsNamesParamsComponent}
  ]
 },
];

//export const TourRoutes = RouterModule.forChild(routes);
