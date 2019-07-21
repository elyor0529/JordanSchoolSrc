
import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PagesComponent } from './pages/pages.component';
import { BlankComponent } from './pages/blank/blank.component';
import { SearchComponent } from './pages/search/search.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { ErrorComponent } from './pages/errors/error/error.component';
import { FormExampleComponent } from './pages/form-example/form-example.component';



export const routes: Routes = [
    { path: '', loadChildren: './pages/login/login.module#LoginModule' },
    { 
        path: '', 
        component: PagesComponent, children: [
            { path: '', loadChildren: './pages/login/login.module#LoginModule', data: { breadcrumb: 'Login' } },
            { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardModule', data: { breadcrumb: 'Dashboard' } },
            { path: 'users', loadChildren: './pages/users/users.module#UsersModule', data: { breadcrumb: 'Users' } },
            { path: 'dynamic-menu', loadChildren: './pages/dynamic-menu/dynamic-menu.module#DynamicMenuModule', data: { breadcrumb: 'Dynamic Menu' }  },          
            { path: 'ui', loadChildren: './pages/ui/ui.module#UiModule', data: { breadcrumb: 'UI' } },
            { path: 'mailbox', loadChildren: './pages/mailbox/mailbox.module#MailboxModule', data: { breadcrumb: 'Mailbox' } },
            { path: 'chat', loadChildren: './pages/chat/chat.module#ChatModule', data: { breadcrumb: 'Chat' } },
            { path: 'form-controls', loadChildren: './pages/form-controls/form-controls.module#FormControlsModule', data: { breadcrumb: 'Form Controls' } },
            { path: 'tables', loadChildren: './pages/tables/tables.module#TablesModule', data: { breadcrumb: 'Tables' } },
            { path: 'schedule', loadChildren: './pages/schedule/schedule.module#ScheduleModule', data: { breadcrumb: 'Schedule' } },
            { path: 'maps', loadChildren: './pages/maps/maps.module#MapsModule', data: { breadcrumb: 'Maps' } },
            { path: 'charts', loadChildren: './pages/charts/charts.module#ChartsModule', data: { breadcrumb: 'Charts' } },
            { path: 'drag-drop', loadChildren: './pages/drag-drop/drag-drop.module#DragDropModule', data: { breadcrumb: 'Drag & Drop' } },
            { path: 'icons', loadChildren: './pages/icons/icons.module#IconsModule', data: { breadcrumb: 'Material Icons' } },
            { path: 'blank', component: BlankComponent, data: { breadcrumb: 'Blank page' } },
            { path: 'search', component: SearchComponent, data: { breadcrumb: 'Search' } },
            { path: 'search/:name', component: SearchComponent, data: { breadcrumb: 'Search' } },
            { path: 'dynamicForm', component: FormExampleComponent, data: { breadcrumb: 'dynamic Form' } },

            { path: 'lookups', loadChildren: './pages/lookups/lookups.module#LookupsModule', data: { breadcrumb: 'ثوابت النظام' } },
            {path:'schools',loadChildren:'./pages/addLookups/schools/schools.module#SchoolsModule', data:{breadcrumb:'المدارس'}},
            {path:'sections',loadChildren:'./pages/addLookups/sections/section.module#SectionModule', data:{breadcrumb:'الاقسام'}},
            {path:'buses',loadChildren:'./pages/addLookups/Buses/bus.module#BusModule', data:{breadcrumb:'الباصات'}},
            {path:'tours',loadChildren:'./pages/addLookups/tours/tour.module#TourModule', data:{breadcrumb:'الجولات المدرسية'}},
            {path:'classes',loadChildren:'./pages/addLookups/classes/class.module#ClassModule', data:{breadcrumb:' الصفوف الدراسية'}},
 
            //Registration Menu
            {path:'parents',loadChildren:'./pages/Reg/parents/reg-parent.module#RegParentModule', data:{breadcrumb:' تسجيل أولاياء الامور'}},
            {path:'students',loadChildren:'./pages/Reg/student/student.module#StudentModule', data:{breadcrumb:' تسجيل الطلاب'}},
            //Admission
            {path:'admissions',loadChildren:'./pages/Admission/adm.module#AdmModule', data:{breadcrumb:'  القبول'}},
               //Financial
               {path:'financial/finItem',loadChildren:'./pages/financial/fin-item/fin-item.module#FinItemModule', data:{breadcrumb:'    بنود المالية'}},
               {path:'financial/schoolFee',loadChildren:'./pages/financial/school-fee/school-fee.module#SchoolFeeModule', data:{breadcrumb:'    مالية المدرسة  '}},
               {path:'financial/classFee',loadChildren:'./pages/financial/class-fee/class-fee.module#ClassFeeModule', data:{breadcrumb:'     مالية الصفوف  '}},
              {path:'financial/studentFee',loadChildren:'./pages/financial/student-fee/student-fee.module#StudentFeeModule', data:{breadcrumb:'     مالية الطالب  '}}
  

        ]
    },
    { path: 'landing', loadChildren: './pages/landing/landing.module#LandingModule' },
    { path: 'login', loadChildren: './pages/login/login.module#LoginModule' },
    { path: 'register', loadChildren: './pages/register/register.module#RegisterModule' },
    { path: 'error', component: ErrorComponent, data: { breadcrumb: 'Error' } },
    { path: '**', component: NotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
   preloadingStrategy: PreloadAllModules,  // <- comment this line for activate lazy load
   // useHash: true
});