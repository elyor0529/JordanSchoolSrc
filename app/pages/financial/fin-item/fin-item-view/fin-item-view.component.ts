import { Component, OnInit } from '@angular/core';
import { FinItem } from 'src/app/Models/financial/fin-item';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ValidationBase } from 'src/app/validationBase';
import { Router, ActivatedRoute } from '@angular/router';
import { RegParentService } from 'src/app/pages/Reg/parents/reg-parent.service';
import { regParents } from 'src/app/Models/Reg/Parents/reg-parents';
import { FinItemService } from '../fin-item.service';

@Component({
  selector: 'app-fin-item-view',
  templateUrl: './fin-item-view.component.html',
  styleUrls: ['./fin-item-view.component.scss']
})
export class FinItemViewComponent implements OnInit {

  public finItem: FinItem;

  returnUrl = '/financial/finItem/index';
  id: number;
  heroes = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];
  myHero = this.heroes[2];

  loading = false;

  constructor(
    private service: FinItemService,
    private route: ActivatedRoute) {
    this.finItem = new FinItem();
  }

  ngOnInit() {
    this.viewData();
  }

  viewData() {
    this.route.params.subscribe(params => {
      if (!params.id) {
        return;
      }
      this.id = +params.id;
      this.loading = true;
      this.service.getFinItemById(this.id).subscribe(
        res => {
        this.finItem = res
        console.log('res'+this.finItem.arDesc)
      }, err => console.log(err),
        () => this.loading = false);
    });
  }
}

