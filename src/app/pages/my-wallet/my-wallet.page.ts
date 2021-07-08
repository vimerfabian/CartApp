import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-my-wallet',
  templateUrl: './my-wallet.page.html',
  styleUrls: ['./my-wallet.page.scss'],
})
export class MyWalletPage implements OnInit {
  list: any = [];
  constructor(
    private walletService: WalletService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.updateList();
  }
  async updateList() {
    const user = this.authService.getCurrentSession();
    this.list = await this.walletService.getList(user?.idClient).toPromise();
  }
}
