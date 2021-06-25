import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-product',
  templateUrl: './select-product.page.html',
  styleUrls: ['./select-product.page.scss'],
})
export class SelectProductPage implements OnInit {
  product: any = {};
  constructor() { }

  ngOnInit() {
  }

}
