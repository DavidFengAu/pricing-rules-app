import * as _ from 'lodash'
import { Product, ProductId } from '../Products'
import PricingRule from './PricingRule'

export class DiscountRule extends PricingRule {
  private readonly productId: ProductId
  private readonly discountedPrice: number    // price in cents

  constructor(
    name: string,
    productId: ProductId,
    discountedPrice: number
  ) {
    super(name)
    this.productId = productId
    this.discountedPrice = discountedPrice
  }

  execute(products: Product[]): Product[] {
    const [matched, unmatched] = _.partition(products, ({ id }) => id === this.productId)
    // apply the deal to all matched projects
    const discounted = matched.map(p => this.appleDeal(p, this.discountedPrice))
    return _.concat(discounted, unmatched)
  }
}
