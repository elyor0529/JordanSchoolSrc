import { TourIndexComponent } from './tour-index/tour-index.component';
import { Routes, RouterModule } from '@angular/router';
import { TourFormComponent } from './tour-form/tour-form.component';

export const tourRoutes: Routes = [
  { path:'',
  children:[
    {path:'', redirectTo:'index'},
    {path:'index', component:TourIndexComponent},
    {path:'add',component:TourFormComponent},
    {path:'edit/:id',component:TourFormComponent}
  ]
 },
];

//export const TourRoutes = RouterModule.forChild(routes);
