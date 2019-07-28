import { Routes } from '@angular/router';
import { RegStudComponent } from './reg-stud/reg-stud.component';


export const regStudRoute:Routes=[
{

    path:'',
    children:[
        {path:'',redirectTo:'index'},
        {path:'index',component:RegStudComponent },
        // {path:'add', component:ParentFormComponent},
        // {path:'edit/:id', component:ParentFormComponent},
        // {path:'view/:id',component:ParentViewComponent}
    ]
}


]