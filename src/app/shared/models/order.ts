import {
  ShoppingCartItems
} from './shoppingCartItems';

export class Order {
  datePlaced: number;
  items: any[];

  constructor(public userId: string, public shipping: any, shoppingCartItems: ShoppingCartItems) {
    this.datePlaced = new Date().getTime();
    this.items = shoppingCartItems.items.map(i => {
      return {
        product: {
          title: i.product.title,
          imageUrl: i.product.imageUrl,
          price: i.product.price,
        },
        quantity: i.quantity,
        totalPrice: i.totalPrice
      };
    });
  }
}
