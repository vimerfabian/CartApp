import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, from } from 'rxjs';
const CART_STORAGE = 'CART_STORAGE';
const OFFERS_STORAGE = 'OFFERS_STORAGE';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartCount = new BehaviorSubject(0);
  totalPrice = new BehaviorSubject(0);
  subTotalPrice = new BehaviorSubject(0);
  totalTaxes = new BehaviorSubject(0);
  cart = new BehaviorSubject([]);
  offers = new BehaviorSubject([]);
  constructor(private storage: Storage) {
    this.storage.create();
    this.getCart();
  }

  async addProduct(product: any, edit: boolean = false) {
    const total = Number(product.price) * Number(product.quantity);
    const taxes = total * (Number(product.taxes || 0) / 100);
    product.total = total + taxes;
    let cart = await this.getCart();
    // const index = cart.findIndex((x) => x.idProduct === product.idProduct);
    // if (index >= 0) {
    //   if (cart[index]?.idOffer > 0) {
    //     return;
    //   }
    //   cart[index] = product;
    // } else {
    //   cart.push(product);
    // }
    if (edit) {
      cart = cart.filter((x) => x.idProduct !== product.idProduct);
    }
    cart.push(product);
    /*cart = cart.filter(x => x.idProduct !== product.idProduct);
    cart.push(product);*/
    await this.saveCart(cart);
    this.emitValues(cart);
    return cart;
  }

  async addOffer(offer: any) {
    console.log('adding offer', offer);
    const offers = await this.getOffers();
    const index = offers.findIndex((x) => x.idOffer === offer.idOffer);
    if (index >= 0) {
      offers[index] = offer;
    } else {
      offers.push(offer);
    }
    /*await Promise.all(
      offer.products.map(async (x) => {
        x.price = 0;
        await this.addProduct(x);
      })
    );*/
    /*cart = cart.filter(x => x.idProduct !== product.idProduct);
    cart.push(product);*/
    await this.saveOffers(offers);
    this.emitValues(this.cart.value);
    return offers;
  }

  async removeOffer(idOffer: number) {
    let offers = await this.getOffers();
    offers = offers.filter((x) => x.idOffer !== idOffer);
    await this.removeProductsFromOffer(idOffer);
    await this.saveOffers(offers);
    this.emitValues(this.cart.value);

    return offers;
  }

  async removeProduct(idProduct: number) {
    let cart = await this.getCart();
    cart = cart.filter((x) => x.idProduct !== idProduct);
    await this.saveCart(cart);
    this.emitValues(cart);
    return cart;
  }

  async removeProductByIndex(index: number) {
    // eslint-disable-next-line prefer-const
    let cart = await this.getCart();
    cart.splice(index, 1);
    await this.saveCart(cart);
    this.emitValues(cart);
    return cart;
  }

  async removeProductByIdInOffer(idProduct: number, idOffer: number) {
    // eslint-disable-next-line prefer-const
    let cart = await this.getCart();
    console.log('cart state before', cart);
    cart = cart.filter((x) => {
      const res = x.idProduct === idProduct && x.idOffer === idOffer;
      console.log(
        `x.idProduct`,
        x.idProduct,
        'idProduct',
        idProduct,
        'x.idOffer',
        x.idOffer,
        'idPffer',
        idOffer,
        'pass',
        res,
        `prueba a ${x.idProduct === idProduct} b: ${x.idOffer === idOffer}`
      );
      return !res;
    });
    console.log('cart state after', cart);
    await this.saveCart(cart);
    this.emitValues(cart);
    return cart;
  }

  async removeProductsFromOffer(idOffer: number) {
    // eslint-disable-next-line prefer-const
    let cart = await this.getCart();
    cart = cart.filter((x) => x.idOffer !== idOffer);
    await this.saveCart(cart);
    this.emitValues(cart);
    return cart;
  }

  async getCart(): Promise<any[]> {
    let cart = await from(this.storage.get(CART_STORAGE)).toPromise();
    if (!cart) {
      cart = [];
    }
    this.emitValues(cart);
    return cart;
  }

  async getOffers() {
    let offers = await from(this.storage.get(OFFERS_STORAGE)).toPromise();
    if (!offers) {
      offers = [];
    }
    //this.emitValues(this.cart.value);
    return offers;
  }

  async resetCart() {
    await this.saveOffers([]);
    return await this.saveCart([]);
  }

  async getOrderToBeSavedFormat(idOrderType: number, idAddress: number) {
    let items = await this.getCart();
    items = items.map((x) => {
      // x.toppings = x.productTopping.map((pt) => {
      //   pt.selected = true;
      //   return pt;
      // });
      delete x.productTopping;
      return x;
    });
    const order: any = {};
    order.total = this.totalPrice.value;
    order.taxes = this.totalTaxes.value;
    order.idPaymentMethod = 1;
    order.macAddress = 'AA:AA:AA:AA:AA';
    order.idOrderType = idOrderType;
    order.idAddress = idAddress || 0;
    order.items = items;
    order.offers = [];
    const offers: any[] = await this.getOffers();
    order.offers = offers.map((x) => {
      delete x.products;
      return x;
    });
    return order;
  }

  private async saveCart(cart: any[]) {
    await this.storage.set(CART_STORAGE, cart);
    this.emitValues(cart);
    return true;
  }

  private async saveOffers(offers: any[]) {
    await this.storage.set(OFFERS_STORAGE, offers);
    return true;
  }

  private getTotalPrice(cart: any[], offers: any[] = []): number {
    const cartPrice = cart
      .filter((x) => !x.idOffer)
      .reduce((a, b) => {
        const total = Number(b.price) * Number(b.quantity);
        const taxes = total * (Number(b.taxes || 0) / 100);
        return Number(a) + (total + taxes);
      }, 0);
    const offersPrice = offers.reduce((a, b) => {
      const total = Number(b.price);
      const taxes = 0; //total * (Number(b.taxes || 0) / 100);
      return Number(a) + (total + taxes);
    }, 0);
    return cartPrice + offersPrice;
  }

  private getSubTotalPrice(cart: any[], offers: any[] = []): number {
    const cartPrice = cart
      .filter((x) => !x.idOffer)
      .reduce((a, b) => {
        const total = Number(b.price) * Number(b.quantity);
        return Number(a) + total;
      }, 0);
    const offerPrice = offers.reduce((a, b) => {
      const total = Number(b.price);
      return Number(a) + total;
    }, 0);
    return cartPrice + offerPrice;
  }

  private getTotalTaxes(cart: any[]): number {
    return cart
      .filter((x) => !x.idOffer)
      .reduce((a, b) => {
        const total =
          Number(b.price) * Number(b.quantity) * (Number(b.taxes || 0) / 100);
        return Number(a) + total;
      }, 0);
  }

  private async emitValues(cart: any[]) {
    const offers: any[] = await this.getOffers();
    this.cartCount.next(cart.filter((x) => !x.idOffer).length + offers.length);
    this.totalPrice.next(this.getTotalPrice(cart, offers));
    this.subTotalPrice.next(this.getSubTotalPrice(cart, offers));
    this.totalTaxes.next(this.getTotalTaxes(cart));
    this.cart.next(cart);
  }
}
