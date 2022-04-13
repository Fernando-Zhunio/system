export class CardBrand {
  cards = {
    vi: { name: 'Visa', url: 'https://s3.amazonaws.com/cdn.images/cc/image/ic_visa.svg' },
    mc: { name: 'MasterCard', url: 'https://s3.amazonaws.com/cdn.images/cc/image/ic_mastercard.svg' },
    ax: { name: 'American Express', url: 'https://s3.amazonaws.com/cdn.images/cc/image/ic_amex.svg' },
    di: { name: 'Diners', url: 'https://s3.amazonaws.com/cdn.images/cc/image/ic_diners.svg' },
    dc: { name: 'Discover', url: 'https://s3.amazonaws.com/cdn.images/cc/image/ic_discover.svg' },
    ms: { name: 'Maestro', url: 'https://s3.amazonaws.com/cdn.images/cc/image/ic_maestro.svg' },
    cs: { name: 'Credisensa', url: 'https://s3.amazonaws.com/cdn.images/cc/image/ic_credisensa.png' },
    so: { name: 'Solidario', url: 'https://s3.amazonaws.com/cdn.images/cc/image/ic_alia.svg' },
    up: { name: 'Union Pay', url: 'https://s3.amazonaws.com/cdn.images/cc/image/ic_unionpay.png' }
  };

  public getCard(card: string): any {
    return this.cards[card];
  }

}
