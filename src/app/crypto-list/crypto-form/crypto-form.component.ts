import { Component, NgModule, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coin } from 'src/app/models/Coin.models';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CryptoService } from 'src/app/services/crypto.service';


@Component({
  selector: 'cw-crypto-form',
  template: `
    <div class="col-sm-8 col-sm-offset-2">
      <h2>Enregistrer mes nouveaux investissements</h2>
      <form (ngSubmit)="onSubmit(f)" #f="ngForm">
        <div class="form-group">
          <label>Token</label>
          <select id="name" class="form-select" [ngModel]="defaultToken" name="name">
            <option *ngFor="let coin of coins">{{ coin.symbol | uppercase }}</option>
          </select>
        </div>
        <div class="form-group">
          <label>Quantité</label>
          <input type="text" class="form-control" id="quantityNewToken" ngModel name="quantityNewToken">
        </div>
        <button class="btn btn-success" [disabled]="f.invalid" type="submit" style="margin-top: 10px;" >Enregistrer</button>
      </form>
    </div>
  `,
  styles: [
  ]
})
export class CryptoFormComponent implements OnInit {

  defaultToken = 'BTC';

  coins: Coin[] = [];

  constructor(private formBuilder: FormBuilder, private http: HttpClient,private cryptoService: CryptoService, private router: Router) {}

  ngOnInit(): void {
    this.http
    .get<Coin[]>(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false'
    )
    .subscribe(
      res => {
        console.log(res);
        this.coins = res;
      },
      err => console.log(err)
    );
  }

  onSubmit(form: NgForm) {
    const id = form.value['name'];
    const quantityNewToken = form.value['quantityNewToken'];
    this.cryptoService.addCrypto(id, quantityNewToken);
    this.cryptoService.saveTokensToServer();
    this.router.navigate( ['/token-view'] );
  }

}


