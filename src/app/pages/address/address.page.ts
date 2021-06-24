import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {
  list: any[] = [1,2,3,4,5];
  constructor() { }

  ngOnInit() {
  }

}
