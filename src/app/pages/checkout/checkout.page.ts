/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { AddressService } from 'src/app/services/address.service';
import { AuthService } from 'src/app/services/auth.service';
import { OrderTypeService } from 'src/app/services/order-type.service';
import { PaymentMethodService } from 'src/app/services/payment-method.service';
import { Stripe } from '@ionic-native/stripe/ngx';
import { environment } from 'src/environments/environment';
import { PaymentService } from 'src/app/services/payment.service';
import {
  PayPal,
  PayPalPayment,
  PayPalConfiguration,
} from '@ionic-native/paypal/ngx';

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
    private stripe: Stripe,
    private paymentService: PaymentService,
    private payPal: PayPal
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
    this.payPal
      .init({
        PayPalEnvironmentProduction: '',
        PayPalEnvironmentSandbox:
          'AeRmttCcJGqi1daNUlBip8KXRa4nSXdVyci4q-ky_WZZcSDkMKvNEMOzfFbIwx-LUC2Mrp-CfBKXtyLw',
      })
      .then(
        () => {
          // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
          this.payPal
            .prepareToRender(
              'PayPalEnvironmentSandbox',
              new PayPalConfiguration({
                // Only needed if you get an "Internal Service Error" after PayPal login!
                //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
              })
            )
            .then(
              () => {
                const payment = new PayPalPayment(
                  '0.1',
                  'USD',
                  'Description',
                  'sale'
                );
                this.payPal.renderSinglePaymentUI(payment).then(
                  () => {
                    // Successfully paid
                    // Example sandbox response
                    //
                    // {
                    //   "client": {
                    //     "environment": "sandbox",
                    //     "product_name": "PayPal iOS SDK",
                    //     "paypal_sdk_version": "2.16.0",
                    //     "platform": "iOS"
                    //   },
                    //   "response_type": "payment",
                    //   "response": {
                    //     "id": "PAY-1AB23456CD789012EF34GHIJ",
                    //     "state": "approved",
                    //     "create_time": "2016-10-03T13:33:33Z",
                    //     "intent": "sale"
                    //   }
                    // }
                  },
                  () => {
                    // Error or render dialog closed without being successful
                  }
                );
              },
              () => {
                // Error in configuration
              }
            );
        },
        () => {
          // Error in initialization, maybe PayPal isn't supported or something else
        }
      );
  }
  placeOrderStripe() {
    this.stripe.setPublishableKey(environment.stripeApiKey);

    const card = {
      // eslint-disable-next-line id-blacklist
      number: '4242424242424242',
      expMonth: 12,
      expYear: 2025,
      cvc: '220',
    };

    this.stripe
      .createCardToken(card)
      .then((token) => {
        console.log('id', token);
        this.paymentService
          .pay({
            amount: 1,
            currency: 'usd',
            token: token.id,
          })
          .subscribe(
            (res) => {
              console.log('paymentres', res);
            },
            (err) => {
              console.log('payment error', err);
            }
          );
      })
      .catch((error) => console.error('err', error));
  }
}
