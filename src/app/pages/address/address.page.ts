import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AddressService } from 'src/app/services/address.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {
  list:  Observable<any>;
  constructor(private addressService: AddressService, private authService: AuthService) { }

  ngOnInit() {
    const user = this.authService.getCurrentSession();
    this.list = this.addressService.getList(user?.idClient);
  }

}
