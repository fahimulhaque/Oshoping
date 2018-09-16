import { ShoppingCartItems } from 'shared/models/shoppingCartItems';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product;
  @Input('key') key;
  @Input('showActions') showActions = true;
  @Input('shoppingCartItems') shoppingCartItems: ShoppingCartItems;
  constructor(private cartService: ShoppingCartService ) {
   }

  addToCart() {
    this.cartService.addToCart(this.product , this.key);
  }

}
