import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ClaimService } from 'src/app/services/claim.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {
  order: any = {};
  claims: any[] = [];

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private claimService: ClaimService
  ) {
    if (router.getCurrentNavigation().extras.state) {
      const order = this.router.getCurrentNavigation().extras.state;
      console.log('order', order);

      this.setOrder(order);
      this.getClaims();
    }
  }

  setOrder(order) {
    this.order = order;
  }

  ngOnInit() {}
  // habia un parametro llamado iem. lo removi
  addClaim() {
    this.navCtrl.navigateForward('/pages/claims/add-claim', {
      state: this.order,
    });
  }

  getClaims(): void {
    this.claimService.getClaimsByOrder(this.order.idOrder).subscribe(
      (data) => {
        console.log('Datos obtenidos:', data);
        this.claims = data;
        console.log('Claims', this.claims);
      },
      (error) => {
        console.error('Error obteniendo claims', error);
      }
    );
  }
}
