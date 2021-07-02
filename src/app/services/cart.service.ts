import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';
import { BehaviorSubject, from } from 'rxjs';
const CART_STORAGE = 'CART_STORAGE';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartCount = new BehaviorSubject(0);
  totalPrice = new BehaviorSubject(0);
  subTotalPrice = new BehaviorSubject(0);
  totalTaxes = new BehaviorSubject(0);
  cart = new BehaviorSubject([]);
  constructor(private storage: Storage) {
    this.getCart();
  }

  async addProduct(product: any) {
    const cart = await this.getCart();
    const index = cart.findIndex(x => x.idProduct === product.idProduct);
    if(index >= 0) {
      cart[index] = product;
    } else {
      cart.push(product);
    }
    /*cart = cart.filter(x => x.idProduct !== product.idProduct);
    cart.push(product);*/
    await this.saveCart(cart);
   this.emitValues(cart);
    return cart;
  }

  async removeProduct(idProduct: number) {
    let cart = await this.getCart();
    cart = cart.filter(x => x.idProduct !== idProduct);
    await this.saveCart(cart);
    this.emitValues(cart);

    return cart;
  }

  async getCart(): Promise<any[]> {
    let cart = await from(this.storage.get(CART_STORAGE)).toPromise();
    if(!cart) {
      cart =  [];
    }
    this.emitValues(cart);
    return cart;
  }

  async resetCart() {
    return await this.saveCart([]);
  }


  private async saveCart(cart: any[]) {
    await this.storage.set(CART_STORAGE, cart);
    this.emitValues(cart);
    return true;
  }

  private getTotalPrice(cart: any[]): number {
    return cart.reduce((a,b) => {
      const total = Number(b.price) * Number(b.quantity);
      const taxes = total  * (Number(b.taxes || 0) / 100);
      return Number(a) + (total-taxes);
    },0);
  }

  private getSubTotalPrice(cart: any[]): number {
    return cart.reduce((a,b) => {
      const total = Number(b.price) * Number(b.quantity);
      return Number(a) + (total);
    },0);
  }

  private getTotalTaxes(cart: any[]): number {
    return cart.reduce((a,b) => {
      const total = Number(b.price) * Number(b.quantity) * (Number(b.taxes || 0) / 100);
      return Number(a) + (total);
    },0);
  }

  private emitValues(cart: any[]) {
    this.cartCount.next(cart.length);
    this.totalPrice.next(this.getTotalPrice(cart));
    this.subTotalPrice.next(this.getSubTotalPrice(cart));
    this.totalTaxes.next(this.getTotalTaxes(cart));
    this.cart.next(cart);
  }
}
