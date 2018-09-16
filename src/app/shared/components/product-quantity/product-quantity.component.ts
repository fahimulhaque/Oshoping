import { ShoppingCartItems } from 'shared/models/shoppingCartItems';
import { Product } from 'shared/models/product';
import { Component, OnInit , Input } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {

  @Input('product') product: Product;
  @Input('key') key;
  @Input('shoppingCartItems') shoppingCartItems: ShoppingCartItems;
  constructor(private cartService: ShoppingCartService ) {
  }

  addToCart() {
    this.cartService.addToCart(this.product , this.key);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product , this.key);
  }

}
