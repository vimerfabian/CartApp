import { Component, OnInit } from '@angular/core';
import { AddressService } from 'src/app/services/address.service';
import { AuthService } from 'src/app/services/auth.service';
import { OrderTypeService } from 'src/app/services/order-type.service';
import { PaymentMethodService } from 'src/app/services/payment-method.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  checkout: any = {};
  addressList: any =[];
  paymentMethodList: any =[];
  orderTypeList: any =[];
  constructor(private addressService: AddressService, private paymentMethodService: PaymentMethodService,
    private orderTypeService: OrderTypeService, private authService: AuthService) { }

  ngOnInit() {
    const user = this.authService.getCurrentSession();
    this.addressService.getList(user?.idClient).subscribe(res => {
      this.addressList = res;
    });
    this.paymentMethodService.getList(user?.idClient).subscribe(res => {
      this.paymentMethodList = res;
    });

    this.orderTypeService.getList().subscribe(res => {
      this.orderTypeList = res;
    });
  }
}
