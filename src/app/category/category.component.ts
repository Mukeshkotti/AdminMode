import { Component, OnInit } from '@angular/core';
import { AppService } from '../_services/app.service';
import { Category } from '../_models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categoryList: Category[];

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.getCategory().subscribe(res => {
      this.categoryList = this.appService.prepareCategory(res['payload'].product_category);
      console.log(this.categoryList);
    }, err => {

    });
  }

}
