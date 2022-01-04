export class Coin {
  constructor(
  public id: string,
  public image: string,
  public current_price: number,
  public price_change_percentage_24h: number,
  public total_volume: number,
  public symbol: string,
  public name: string,
  public quantityNewToken: number) {}
}
