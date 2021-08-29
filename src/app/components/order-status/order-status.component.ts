/* eslint-disable no-underscore-dangle */
import { Component, Input, OnInit } from '@angular/core';
import {
  OrderStatus,
  OrderStatusColor,
  OrderStatusColorLiteral,
  OrderStatusMessageLiteral,
} from 'src/app/common/enums/order-status.enum';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss'],
})
export class OrderStatusComponent implements OnInit {
  _status: number;
  constructor() {}

  ngOnInit() {}

  @Input() set status(value) {
    // eslint-disable-next-line no-underscore-dangle
    this._status = Number(value);
    this.getStatusColor();
    this.getStatusMessage();
  }

  getStatusMessage() {
    return OrderStatusMessageLiteral[this._status] || '';
  }

  getStatusColor() {
    return OrderStatusColorLiteral[this._status] || '';
  }
}
