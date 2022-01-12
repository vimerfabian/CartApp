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
  list: any = [];
  constructor(
    private addressService: AddressService,
    private authService: AuthService
  ) {}

  ngOnInit() {}
  async updateList() {
    const user = this.authService.getCurrentSession();
    this.list = await this.addressService.getList(user?.idClient).toPromise();
  }

  ionViewWillEnter() {
    this.updateList();
  }

  change(event, id) {
    console.log('id', id, 'event', event.detail.checked);
    if (event.detail.checked) {
      this.addressService.setByDefault(id);
      this.list = this.list.map((x) => {
        if (x.idAddress !== id) {
          x.byDefault = false;
        } else {
          x.byDefault = true;
        }
        return x;
      });
      console.log('list', this.list);
    }
  }
}
