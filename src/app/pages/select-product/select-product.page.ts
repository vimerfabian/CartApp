import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ArrayUtil } from 'src/app/common/utils/array.util';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-select-product',
  templateUrl: './select-product.page.html',
  styleUrls: ['./select-product.page.scss'],
})
export class SelectProductPage implements OnInit {
  product: any = {};
  toppingsOrdered: any = [];
  constructor(
    public router: Router,
    public cartService: CartService,
    private nav: NavController
  ) {
    if (router.getCurrentNavigation().extras.state) {
      const product = this.router.getCurrentNavigation().extras.state;
      console.log('product', product);
      this.setProduct(product);
    }
  }

  setProduct(product: any) {
    this.product = product;
    if (Number(this.product?.quantity || 0) <= 1) {
      this.product.quantity = 1;
    }
    this.calc();
    this.toppingsOrdered = ArrayUtil.groupBy(
      product.productTopping,
      'toppingTypeName'
    );
    console.log('ordered', this.toppingsOrdered);
    console.log('product pos', this.product);
  }

  add(n: number) {
    if (this.product.quantity <= 1 && n < 0) {
      this.product.quantity = 1;
      return;
    }
    this.product.quantity += n;
    this.calc();
  }

  async addToCart() {
    this.calc();
    if (this.product?.idProduct > 0) {
      const product = this.getParsedProduct();
      await this.cartService.addProduct(product);
      this.nav.navigateRoot('/pages/menu');
    }
  }

  getParsedProduct() {
    const product = Object.assign({}, this.product);
    product.toppings = this.product.productTopping.filter(
      (x) => x.selected === true
    );
    return product;
  }
  selectTopping(modifier: any) {
    const idx = this.product.productTopping.findIndex(
      (x) => x.idProductTopping === modifier.idProductTopping
    );
    console.log('idx', idx, 'modifier', modifier);
    this.product.productTopping[idx].selected = true;
    for (let i = 0; i < this.product.productTopping.length; i++) {
      if (
        this.product.productTopping[i].toppingTypeName ===
          this.product.productTopping[idx].toppingTypeName &&
        i !== idx
      ) {
        this.product.productTopping[i].selected = false;
      }
    }
  }

  calc() {
    this.product.total =
      Number(this.product?.quantity || 0) * Number(this.product?.price || 0);
  }

  ngOnInit() {}
}
