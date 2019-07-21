import { Routes } from '@angular/router';
import { FinItemIndexComponent } from './fin-item-index/fin-item-index.component';
import { FinItemFormComponent } from './fin-item-form/fin-item-form.component';
import { FinItemViewComponent } from './fin-item-view/fin-item-view.component';

export const finItemRoutes:Routes=[

    {path:'',
    children:
[
  {path:'', redirectTo:'index',pathMatch:'full'},
  {path:'index', component:FinItemIndexComponent },
  {path:'add', component:FinItemFormComponent},
  {path:'edit/:id',component:FinItemFormComponent},
  {path:'view/:id',component:FinItemViewComponent}
]},
];