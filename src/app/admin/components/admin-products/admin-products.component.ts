import {
  ProductService
} from 'shared/services/product.service';
import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  Subscription
} from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: any[];
  filteredProducts: any[];
  subscription: Subscription;
  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe(
      products =>  { this.filteredProducts = this.products = products;
      }
      );
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter(query: string) {
    this.filteredProducts = (query) ?
      this.products.filter( p =>
        p.payload.val().title.toLowerCase().includes(query.toLowerCase())) : this.products ;
  }



}
