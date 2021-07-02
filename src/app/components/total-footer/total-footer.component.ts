import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-total-footer',
  templateUrl: './total-footer.component.html',
  styleUrls: ['./total-footer.component.scss'],
})
export class TotalFooterComponent implements OnInit {
  cartCount = 0;
  totalPrice = 0;
  subTotalPrice = 0;
  totalTaxes = 0;
  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.cartCount.subscribe(x => this.cartCount = x);
    this.cartService.totalPrice.subscribe(x => this.totalPrice = x);
    this.cartService.subTotalPrice.subscribe(x => this.subTotalPrice = x);
    this.cartService.totalTaxes.subscribe(x => this.totalTaxes = x);
  }

}
