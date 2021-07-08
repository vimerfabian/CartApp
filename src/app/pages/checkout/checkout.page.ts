import { Component, OnInit } from '@angular/core';
import { AddressService } from 'src/app/services/address.service';
import { AuthService } from 'src/app/services/auth.service';
import { OrderTypeService } from 'src/app/services/order-type.service';
import { PaymentMethodService } from 'src/app/services/payment-method.service';
import { Stripe } from '@ionic-native/stripe/ngx';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  checkout: any = {};
  addressList: any = [];
  paymentMethodList: any = [];
  orderTypeList: any = [];

  constructor(
    private addressService: AddressService,
    private paymentMethodService: PaymentMethodService,
    private orderTypeService: OrderTypeService,
    private authService: AuthService,
    private stripe: Stripe
  ) {}

  ngOnInit() {
    const user = this.authService.getCurrentSession();
    this.addressService.getList(user?.idClient).subscribe((res) => {
      this.addressList = res;
    });
    this.paymentMethodService.getList(user?.idClient).subscribe((res) => {
      this.paymentMethodList = res;
    });

    this.orderTypeService.getList().subscribe((res) => {
      this.orderTypeList = res;
    });
  }

  placeOrder() {
    this.stripe.setPublishableKey(environment.stripeApiKey);

    const card = {
      // eslint-disable-next-line id-blacklist
      number: '4242424242424242',
      expMonth: 12,
      expYear: 2020,
      cvc: '220',
    };

    this.stripe
      .createCardToken(card)
      .then((token) => console.log(token.id))
      .catch((error) => console.error(error));
  }
}
