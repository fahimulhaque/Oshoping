import { ShoppingCart } from 'shared/models/shopping-carts';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { switchMap } from 'rxjs/operators';
import {
  ActivatedRoute
} from '@angular/router';
import {
  Component, OnInit
} from '@angular/core';
import {
  ProductService
} from 'shared/services/product.service';
import {
  Observable, Subscription
} from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any[] = [];
  filteredProducts: any[];
  category: string;
  cart;

  constructor(
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    private route: ActivatedRoute) {
    this.productService.
    getAll().pipe(
    switchMap(products => {
      this.products = products;
      return route.queryParamMap;
    }))
    .subscribe(params => {
        this.category = params.get('category');

        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.payload.val().category === this.category) :
          this.products;
      });
  }

  async ngOnInit() {
    // tslint:disable-next-line:no-shadowed-variable
    const cart = (await this.shoppingCartService.getCart()).subscribe(cart => this.cart = cart);
  }

}
