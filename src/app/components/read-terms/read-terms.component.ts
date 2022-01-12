import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-read-terms',
  templateUrl: './read-terms.component.html',
  styleUrls: ['./read-terms.component.scss'],
})
export class ReadTermsComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  close() {
    this.modalCtrl.dismiss();
  }
}
