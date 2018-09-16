import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { query } from '@angular/core/src/render3/query';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private  db: AngularFireDatabase , private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order) {
  const result = await this.db.list('/orders').push(order);
  this.shoppingCartService.clearcart();
  return result;
  }

  getOrders() {
    return this.db.list('/orders').valueChanges();
  }

  getOrdersByUser(userId: string) {
    return this.db.list('/orders' , ref => ref.orderByChild('userId').equalTo(userId)).valueChanges();
  }
}
