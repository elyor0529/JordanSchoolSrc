import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinItemIndexComponent } from './fin-item-index/fin-item-index.component';
import { FinItemFormComponent } from './fin-item-form/fin-item-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { finItemRoutes } from './fin-item.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemsControl } from '@ngu/carousel/lib/ngu-carousel/ngu-carousel';
import { FinItemService } from './fin-item.service';
import { FinItemViewComponent } from './fin-item-view/fin-item-view.component';
import { PagingComponent } from '../../tables/paging/paging.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material';

@NgModule({
  declarations: [
    FinItemIndexComponent, 
    FinItemFormComponent, FinItemViewComponent 
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(finItemRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
    
  ],
  providers:[FinItemService]
})
export class FinItemModule { }
