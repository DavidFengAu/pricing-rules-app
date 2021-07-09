import { Product } from '../Products'

export default abstract class PricingRule {
  readonly name: string

  protected constructor(name: string) {
    this.name = name
  }

  abstract execute(products: Product[]): Product[]

  protected appleDeal(product: Product, discountedPrice: number): Product {
    return product.applyDeal({
      ruleName: this.name,
      price: discountedPrice
    })
  }
}
