export interface Deal {
  ruleName: string,
  price: number
}

export enum ProductId {
  Classic,
  StandOut,
  Premium
}

export class Product {
  readonly id: ProductId
  readonly name: string
  readonly description: string
  readonly price: number    // price in cents
  readonly deal?: Deal

  constructor(
    id: ProductId,
    name: string,
    description: string,
    price: number,
    deal?: Deal
  ) {
    this.id = id
    this.name = name
    this.description = description
    this.price = price
    this.deal = deal
  }

  applyDeal(deal: Deal): Product {
    return new Product(this.id, this.name, this.description, this.price, deal)
  }

  getPrice(): number {
    return this.deal?.price ?? this.price
  }

  toString(): string {
    return JSON.stringify({
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      deal: this.deal
    })
  }
}

export default class Products {
  static readonly products: { [key in ProductId]: Product } = {
    [ProductId.Classic]: new Product(
      ProductId.Classic,
      'Classic Ad',
      'Offers the most basic level of advertisement',
      26999
    ),
    [ProductId.StandOut]: new Product(
      ProductId.StandOut,
      'Stand out Ad',
      'Allows advertisers to use a company logo and use a longer presentation text',
      32299
    ),
    [ProductId.Premium]: new Product(
      ProductId.Premium,
      'Premium Ad',
      'Same benefits as Standout Ad, but also puts the advertisement at the top of the results, allowing higher visibility',
      39499
    )
  }

  static getProduct(id: ProductId): Product {
    return this.products[id]
  }
}
