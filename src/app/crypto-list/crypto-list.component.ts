import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coin } from '../models/Coin.models';

@Component({
  selector: 'cw-crypto-list',
  template: `
  <div class="container">
  <h2>Cryptomonnaies</h2>

  <input type="text" class="form-control bg-dark text-light border0 my-4 me-2 text-center" style="width: 33%" type="search" placeholder="Search" (keyup)="searchCoin()" [(ngModel)]="searchText">

  <table class="table table-dark">
    <thead>
      <tr>
        <th *ngFor="let title of titles">
          {{ title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let coin of filteredCoins; let i = index">
        <td>
          {{ i+1 }}
        </td>
        <td>
          <img [src]="coin.image" alt="{{ coin.name }}" style="width: 2rem">
          <span class="ms-3">
            {{ coin.name }}
          </span>
          <span class="text-muted ms-1">
            {{ coin.symbol | uppercase }}
          </span>
        </td>
        <td>
          {{ coin.current_price.toLocaleString() }} EUR
        </td>
        <td [ngClass]="coin.price_change_percentage_24h > 0 ? 'text-success' : 'text-danger'">
          {{ coin.price_change_percentage_24h.toLocaleString() }}%
        </td>
        <td>
          {{ coin.total_volume.toLocaleString() }} EUR
        </td>
      </tr>
    </tbody>
  </table>
  </div>
  `,
  styles: [
  ]
})
export class CryptoListComponent implements OnInit {

  coins: Coin[] = [];
  filteredCoins: Coin[] = [];
  titles: string[] = [
    '#',
    'Token',
    'Prix',
    'Variations Prix (24h)',
    'Volume 24h'
  ]
  searchText = '';

  constructor(private http: HttpClient) { }

  searchCoin() {
    this.filteredCoins = this.coins.filter(coin => coin.name.toLowerCase().includes(this.searchText.toLowerCase()) || coin.symbol.toLowerCase().includes(this.searchText.toLowerCase()))
  }

  ngOnInit() {

    this.http
    .get<Coin[]>(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false'
    )
    .subscribe(
      res => {
        console.log(res);
        this.coins = res;
        this.filteredCoins = res;
      },
      err => console.log(err)
    );
  }

}
