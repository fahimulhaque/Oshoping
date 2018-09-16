import { Product } from './../../../shared/models/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$: Observable < any > ;
  productWithMetadata = {};
  product: any = {};
  id;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) {
    this.categories$ = categoryService.getAll();
    console.log(this.categories$.subscribe(cat => console.log(cat)));
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.get(this.id).pipe(
        take(1)).subscribe(
        p =>  {
          this.productWithMetadata = p;
          this.product = p.payload.val();
         }
      );
    }
  }

  ngOnInit() {}

  save(product) {

    if (this.id) {
      this.productService.update(this.id, product);
    } else {
      this.productService.create(product);
    }
    this.router.navigateByUrl('/admin/products', {
      skipLocationChange: true
    });
  }

  delete() {
    if (!confirm('Are you sure you want to delete this products')) {
      return;
    }
    this.productService.delete(this.id);
    this.router.navigateByUrl('/admin/products', {
      skipLocationChange: true
    });
  }
}
