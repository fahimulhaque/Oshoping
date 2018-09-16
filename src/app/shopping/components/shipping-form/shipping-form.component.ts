import { ShoppingCartItems } from 'shared/models/shoppingCartItems';
import { AuthService } from 'shared/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy , Input } from '@angular/core';
import { Order } from 'shared/models/order';
import { OrderService } from 'shared/services/order.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit , OnDestroy {
  shipping: any = {};
  userId: string;
  userSubscription: Subscription;
  @Input('cart') cart: ShoppingCartItems;

  constructor(private orderService: OrderService , private router: Router , private authService: AuthService) { }

  ngOnInit() {
  this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);

  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    const order = new Order(this.userId , this.shipping , this.cart);
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success' , result.key]);
  }

}
