import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.scss'],
})
export class CartStatusComponent implements OnInit {
  cartCount = 0;
  totalPrice = 0;
  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.cartCount.subscribe(x => {
      this.cartCount = x;
    });
    this.cartService.totalPrice.subscribe(x => {
      this.totalPrice = x;
    });
  }

}
