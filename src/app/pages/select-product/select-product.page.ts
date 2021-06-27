import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-product',
  templateUrl: './select-product.page.html',
  styleUrls: ['./select-product.page.scss'],
})
export class SelectProductPage implements OnInit {
  product: any = {};
  constructor(public router: Router){
    if (router.getCurrentNavigation().extras.state) {
          const product = this.router.getCurrentNavigation().extras.state;
          console.log('product', product);
          this.setProduct(product);
        }
    }

    setProduct(product: any) {
      this.product = product;
      this.product.quantity = 1;
      this.calc();
    }

    add(n: number) {
      if(this.product.quantity <= 1 && n < 0) {
        this.product.quantity = 1;
        return;
      }
      this.product.quantity += n;
      this.calc();
    }

    calc() {
      this.product.total = Number(this.product?.quantity || 0) * Number(this.product?.price || 0);
    }

  ngOnInit() {
  }

}
