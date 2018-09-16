import { Observable } from 'rxjs';
import { ShoppingCartItems } from 'shared/models/shoppingCartItems';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { AppUser } from 'shared/models/app-user';
import { AuthService } from 'shared/services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  appUser: AppUser;
  shoppingCartItemCount;
  cart$: Observable<ShoppingCartItems>;
  constructor(private auth: AuthService , private shoppingCartService: ShoppingCartService ) { }


  async ngOnInit() {
    this.auth.AppUser$.subscribe(appUser => this.appUser = appUser);
     this.cart$ = await this.shoppingCartService.getCart();
  }

  logout() {
    this.auth.logout();
  }

}
