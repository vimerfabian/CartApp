import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { OffersService } from 'src/app/services/offers.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  list: Observable<any[]>;
  test: any;
  constructor(
    private offerService: OffersService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.list = this.offerService.getList();
    //this.test = this.offerService.getTest();
  }

  getDays(item) {
    let days = '';
    if (item?.monday) days += ',Monday';
    if (item?.tuesday) days += ',Tuesday';
    if (item?.wednesday) days += ',Wednesday';
    if (item?.thursday) days += ',Thursday';
    if (item?.friday) days += ',Friday';
    if (item?.saturday) days += ',Saturday';
    if (item?.sunday) days += ',Sunday';
    //if(days.length > 0) days = '';
    return days;
  }

  selectOffer(item) {
    this.navCtrl.navigateForward('/pages/offers/add-offer', {
      state: item,
    });
  }
}
