import * as _ from 'lodash'
import { Product, ProductId } from '../Products'
import PricingRule from './PricingRule'

export class EveryNForMRule extends PricingRule {
  private readonly productId: ProductId
  private readonly buyQuantity: number
  private readonly forQuantity: number

  constructor(
    name: string,
    productId: ProductId,
    buyQuantity: number,
    forQuantity: number
  ) {
    super(name)
    this.productId = productId
    this.buyQuantity = buyQuantity
    this.forQuantity = forQuantity
  }

  /**
   * Given the retail price and the order of the product in a rule group, return 0 if it should be free
   */
  private getDiscountPrice(retailPrice: number, order: number) {
    return order < this.forQuantity ? retailPrice : 0
  }

  execute(products: Product[]): Product[] {
    // partition products by if the product could apply this rule
    const [matched, unmatched] = _.partition(products, ({ id }) => id === this.productId)
    // group products every "buy Quantity"
    const discounted = _.chunk(matched, this.buyQuantity).flatMap((aDeal: Product[]) => {
      // if products in a group equals to "buy Quantity", apply the deal and return. Otherwise, just return it as is.
      return aDeal.length === this.buyQuantity
        ? aDeal.map((p, i) => this.appleDeal(p, this.getDiscountPrice(p.price, i)))
        : aDeal
    })
    // concat discounted products and unmatched products
    return _.concat(discounted, unmatched)
  }
}
