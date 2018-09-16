import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from 'shared/services/category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  categories$: Observable < any[] > ;
  @Input ('category') category;
  constructor(private categoryService: CategoryService) {
    this.categories$ = this.categoryService.getAll();
  }

  ngOnInit() {
  }

}
