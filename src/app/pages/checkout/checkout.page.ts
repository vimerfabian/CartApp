/* eslint-disable @typescript-eslint/naming-convention */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { CartService } from 'src/app/services/cart.service';
import { NavController, ToastController } from '@ionic/angular';
import { OrderService } from 'src/app/services/order.service';
import { HttpStatusEnum } from 'src/app/common/enums/http-status.enum';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
// eslint-disable-next-line no-var
//declare var paypal;
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
  cart: any = [];
  total = 0;
  order: any = {};
  defaultAddress: any = {};
  public payPalConfig?: IPayPalConfig;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild('paypalRef', { static: false }) private paypalRef: ElementRef;
  constructor(
    private addressService: AddressService,
    private paymentMethodService: PaymentMethodService,
    private orderTypeService: OrderTypeService,
    private authService: AuthService,
    private stripe: Stripe,
    private paymentService: PaymentService,
    private payPal: PayPal,
    private cartService: CartService,
    private toast: ToastController,
    private orderService: OrderService,
    private navCtrl: NavController
  ) {}

  async ngOnInit() {
    this.defaultAddress = await this.addressService.getDefaultAddress();
    console.log('deffault address', this.defaultAddress);
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
    this.cart = await this.cartService.getCart();
    this.order = await this.cartService.getOrderToBeSavedFormat(
      this.checkout.idOrderType,
      this.checkout.idAddress
    );
    this.total = Number(this.cartService.totalPrice.getValue());
    console.log('cart', this.cart, 'total test', this.total);
    //console.log('paypal', paypal);
    console.log('order', this.order);
    //this.initPaypal();
    this.initPaypal2();
  }

  onSuccessOrderSaved() {
    this.cartService.resetCart();
    this.navCtrl.navigateRoot('/pages/orders');
  }

  async initPaypal2() {
    const items = this.order.items
      .filter((x) => !x.idOffer)
      .map((x) => {
        const item = {
          name: x?.name || '',
          quantity: '1',
          category: 'DIGITAL_GOODS',
          unit_amount: {
            currency_code: 'USD',
            value: `${Number(x?.total || 0).toFixed(2)}`,
          },
        };
        return item;
      });
    console.log('items before', items);
    Promise.all(
      this.order.offers.map((x) => {
        const item = {
          name: x?.name || '',
          quantity: 1,
          category: 'DIGITAL_GOODS',
          unit_amount: {
            currency_code: 'USD',
            value: `${Number(x?.price || 0).toFixed(2)}`,
          },
        };
        items.push(item);
      })
    );
    console.log('items after', items);
    console.log('total', this.total);
    this.payPalConfig = {
      currency: 'USD',
      clientId: environment.paypalClientId,
      
      
      createOrderOnClient: (data) =>
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: `${this.total}`,
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: `${this.total}`,
                  },
                },
              },
              // eslint-disable-next-line object-shorthand
              items: items,
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data, actions) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
      },
      onClientAuthorization: (data) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
        this.saveOrderOnServer();
        //this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        this.toast
          .create({
            header: 'Order Canceled',
            message: 'The Order has Been Canceled',
            color: 'danger',
            position: 'bottom',
            duration: 3000,
          })
          .then((t) => {
            t.present();
          });
      },
      onError: (err) => {
        console.log('OnError', err);
        this.toast
          .create({
            header: 'Validation Error',
            message: 'Invalid Information',
            color: 'danger',
            position: 'bottom',
            duration: 2000,
          })
          .then((t) => {
            t.present();
          });
      },
      onClick: (data, actions) => {
        console.log();
        console.log('onClick', data, actions);
        //this.resetStatus();
      },
    };
  }
  // async initPaypal() {
  //   const self = this;
  //   paypal
  //     .Buttons({
  //       style: {
  //         layout: 'vertical',
  //       },
  //       purchase_units: [
  //         {
  //           amount: {
  //             currency_code: 'USD',
  //             value: 0.1, //this.total,
  //           },
  //         },
  //       ],
  //       onApprove: async (data: any, actions) => {
  //         console.log('approve', data);
  //         this.saveOrderOnServer();
  //       },
  //       onCancel: (data) => {
  //         // Show a cancel page, or return to cart
  //         console.log('cancel', data);
  //         this.toast
  //           .create({
  //             header: 'Order Canceled',
  //             message: 'The Order has Been Canceled',
  //             color: 'danger',
  //             position: 'bottom',
  //             duration: 3000,
  //           })
  //           .then((t) => {
  //             t.present();
  //           });
  //       },
  //       onError: (err) => {
  //         // Show an error page here, when an error occurs
  //         console.log('err', err);
  //         this.toast
  //           .create({
  //             header: 'Validation Error',
  //             message: 'Invalid Information',
  //             color: 'danger',
  //             position: 'bottom',
  //           })
  //           .then((t) => {
  //             t.present();
  //           });
  //       },
  //     })
  //     .render(this.paypalRef.nativeElement);
  // }

  async saveOrderOnServer() {
    const order = await this.cartService.getOrderToBeSavedFormat(
      this.checkout.idOrderType,
      this.checkout?.idAddress || this.defaultAddress?.idAddress
    );
    this.orderService.saveOrder(order).subscribe(
      (res: any) => {
        console.log('res from server', res);

        this.toast
          .create({
            header: 'Success',
            message: 'Your order is being processed',
            color: 'success',
            position: 'bottom',
            duration: 3000,
          })
          .then((t) => {
            t.present();
          });
        this.onSuccessOrderSaved();
      },
      (err) => {
        console.log('error from paypal', err);
        this.showInternalErrorMessage();
      }
    );
  }

  showInternalErrorMessage() {
    this.toast
      .create({
        header: 'Error',
        message: `your order has been processed, 
        but an error occurred when trying to save in our server, contact the support or restaurant`,
        color: 'danger',
        position: 'bottom',
        duration: 3000,
      })
      .then((t) => {
        t.present();
      });
  }

  ionViewWillEnter() {
    console.log('on will enter');
    //this.initPaypal();
  }
}
