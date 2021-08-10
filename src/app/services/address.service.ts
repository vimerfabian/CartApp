import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private url: string;
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private navCtrl: NavController
  ) {
    this.url = environment.apiUrl + '/Address';
  }

  save(client) {
    const path = '/saveaddress';
    return this.httpClient.post(this.url + path, client);
  }

  getList(clientId: number | string) {
    const url = this.url + `/getaddressbyclient?id=${clientId}`;
    return this.httpClient.get(url);
  }

  async checkUserHaveAddress() {
    const user = this.authService.getCurrentSession();
    const list: any = await this.getList(user?.idClient).toPromise();
    console.log('addresses', list);
    return list.length > 0;
  }

  async getDefaultAddress() {
    const user = this.authService.getCurrentSession();
    const list: any = await this.getList(user?.idClient).toPromise();
    let address = list.find((x) => x.byDefault === true);
    if (!address) {
      address = list[0];
    }
    return address;
  }

  goToAddAddressPage() {
    this.navCtrl.navigateForward('/pages/address/add-address');
  }

  getCityList() {
    return this.httpClient.get(environment.apiUrl + '/City/getcity');
  }

  getStateList() {
    return this.httpClient.get(environment.apiUrl + '/State/getstate');
  }

  setByDefault(id: number) {
    return this.httpClient.get(this.url + `?id=${id}`);
  }
}
