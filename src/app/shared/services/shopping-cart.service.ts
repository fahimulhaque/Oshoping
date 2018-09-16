import { ShoppingCartItems } from 'shared/models/shoppingCartItems';
import {
  ShoppingCart
} from 'shared/models/shopping-carts';
import {
  Product
} from 'shared/models/product';
import {
  async
} from '@angular/core/testing';
import {
  AngularFireDatabase
} from 'angularfire2/database';
import {
  Injectable
} from '@angular/core';

import {
  take , map
} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) {}


  async addToCart(product: Product, key: string) {
    this.updateItemQuantity(product, key, 1);
  }

  async removeFromCart(product: Product, key: string) {
    this.updateItemQuantity(product, key, -1);
  }

  async getCart() {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).snapshotChanges().pipe(
      map((x: any) => new ShoppingCartItems(x.payload.val()))
    );
  }

  async clearcart() {
    const cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }


  private async getOrCreateCartId(): Promise < string > {
    const cartId = localStorage.getItem('cartId');
    if (cartId) {
      return cartId;
    }

    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.payload.key;
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }


  private async updateItemQuantity(product: Product, key: string, change: number) {
    const cartId = await this.getOrCreateCartId();
    const itemRef = this.getItem(cartId, key);
    itemRef.valueChanges().pipe(
      take(1)).subscribe(
      (item: ShoppingCart) => {
        const quantity = (item ? item.quantity : 0) + change;
        if (quantity === 0) {
          itemRef.remove();
        } else {
        itemRef.update({
          product: product,
          quantity: quantity
        });
      }
      });
  }



}
