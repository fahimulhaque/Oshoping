import { Product } from './product';
import {
  ShoppingCart
} from './shopping-carts';
export class ShoppingCartItems {
  items: ShoppingCart[] = [];
  constructor(public itemsMap: { [productId: string]: ShoppingCart}) {

    if (itemsMap) {
      // tslint:disable-next-line:forin
    for (const productId in itemsMap['items']) {
      const item = itemsMap['items'][productId];
      this.items.push(new ShoppingCart(item.product , item.quantity));
    }
  }
  }


  get totalPrice() {
    let sum = 0;
    // tslint:disable-next-line:forin
    for (const productId in this.items) {
      sum += this.items[productId].totalPrice;
    }
    return sum;
  }

  get totalItemsCount() {
    let count = 0;

    if (this.itemsMap) {
      // tslint:disable-next-line:forin
    for (const productId in this.itemsMap['items']) {
      count += this.itemsMap['items'][productId].quantity;
    }
  }
    return count;
  }

  getproductKey(product: Product) {

    let key = '';

    // tslint:disable-next-line:forin
    for (const productId in this.itemsMap['items']) {
      if (this.itemsMap['items'][productId].product.title === product.title) {
        key = productId;
        break; }
    }
    return key;
  }

  getQuantity(product: Product , key: string) {
    if (this.itemsMap) {
    const item = this.itemsMap['items'][key];
    return item ? item.quantity : 0 ;
    }
  }

}
