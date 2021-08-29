import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { ArrayUtil } from 'src/app/common/utils/array.util';
import { CartService } from 'src/app/services/cart.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-select-product',
  templateUrl: './select-product.page.html',
  styleUrls: ['./select-product.page.scss'],
})
export class SelectProductPage implements OnInit {
  product: any = {};
  offer: any = { idOffer: 0 };
  toppingsOrdered: any = {};
  edit = false;
  constructor(
    public router: Router,
    public cartService: CartService,
    private nav: NavController,
    private toastCtrl: ToastController
  ) {
    if (router.getCurrentNavigation().extras.state) {
      const state = this.router.getCurrentNavigation().extras.state;
      const product = state.product;
      this.edit = state?.edit || false;
      const offer: any = state?.offer || { idOffer: 0 };
      product.idOffer = offer?.idOffer;
      console.log('product to be a', product, 'offer', offer);
      this.setProduct(product, offer);
    }
  }

  setProduct(product: any, offer: any) {
    this.product = product;
    if (Number(this.product?.quantity || 0) <= 1) {
      this.product.quantity = 1;
    }
    this.calc();
    this.toppingsOrdered = ArrayUtil.groupBy(
      product.productTopping,
      'toppingTypeName'
    );
    // for(const category of this.toppingsOrdered) {
    //   for(const modifier of category) {
    //     if(modifier)
    //   }
    // }
    this.setByDefaultToppings();
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
    const isValid = this.isValid();
    if (!isValid) {
      return;
    }
    this.calc();
    if (this.product?.idProduct > 0) {
      const product = this.getParsedProduct();
      await this.cartService.addProduct(product, this.edit);
      this.nav.pop();
    }
  }
  setByDefaultToppings() {
    this.product.productTopping.map((x) => {
      if (x.byDefault === true) {
        this.selectTopping(x);
      }
    });
  }

  isValid(): boolean {
    if (!this.isValidForOffer()) {
      return false;
    }
    const keys = Object.keys(this.toppingsOrdered);
    for (const key of keys) {
      const minRequired: number = this.toppingsOrdered[key][0].required;
      console.log('min required', minRequired);
      if (
        this.product.productTopping.filter(
          (x) => x.selected === true && x.toppingTypeName === key
        ).length < minRequired
      ) {
        this.toastCtrl
          .create({
            header: 'Warning',
            message: `Min modifiers for ${key} is ${minRequired}, please select more`,
            duration: 3500,
            color: 'warning',
          })
          .then((t) => t.present());
        return false;
      }
    }
    return true;
  }

  isValidForOffer() {
    if (this.product.idOffer > 0) {
      const quantityInCart = this.cartService.cart.value
        .filter(
          (cp) =>
            cp.idProduct === this.product.idProduct &&
            cp.idOffer === this.product.idOffer.idOffer
        )
        // eslint-disable-next-line arrow-body-style
        .reduce((a, b) => {
          return Number(a) + Number(b.quantity);
        }, 0);
      if (quantityInCart + this.product.quantity > this.product.quantityOffer) {
        //present invlaid message
        this.toastCtrl
          .create({
            header: 'Warning',
            message: `Max of this product in offer is ${this.product.quantityOffer} add less to apply to this offer`,
            duration: 3500,
            color: 'warning',
          })
          .then((t) => t.present());
        return false;
      }
    }

    return true;
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

    this.product.productTopping[idx].selected =
      !this.product.productTopping[idx].selected;
    const countSelected =
      this.product.productTopping.filter(
        (x) => x.selected === true && x.idToppingType === modifier.idToppingType
      ).length || 0;
    console.log('productTopping', this.product.productTopping[idx]);
    console.log(
      'idx',
      idx,
      'modifier',
      modifier,
      'countselected',
      countSelected,
      'combine',
      this.product.productTopping[idx].combine
    );
    console.log('product', this.product);
    if (countSelected - 1 > this.product.productTopping[idx].combine) {
      this.product.productTopping[idx].selected = false;
      return;
    }
    return;
    for (let i = 0; i < this.product.productTopping.length; i++) {
      if (
        this.product.productTopping[i].toppingTypeName ===
          this.product.productTopping[idx].toppingTypeName &&
        i !== idx &&
        this.product.productTopping[i].selected !== true
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
