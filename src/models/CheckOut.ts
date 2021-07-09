import * as _ from 'lodash'
import Products, { Product, ProductId } from './Products'
import PricingRule  from './rules/PricingRule'

class CheckOut {
  readonly rules: PricingRule[]
  readonly products: Product[]

  constructor(
    rules: PricingRule[] = [],
    products: Product[] = []
  ) {
    this.rules = rules
    this.products = products
  }

  add(productId: ProductId): CheckOut {
    return new CheckOut(this.rules, _.concat(this.products, Products.getProduct(productId)))
  }

  empty(): CheckOut {
    return new CheckOut(this.rules)
  }

  updateRules(rules: PricingRule[]): CheckOut {
    return new CheckOut(rules, this.products)
  }

  discountedProducts(): Product[] {
    return this.rules.reduce((products: Product[], rule: PricingRule) => {
      const [discounted, unDiscounted] = _.partition(products, ({ deal }) => Boolean(deal))
      return _.concat(discounted, rule.execute(unDiscounted))
    }, this.products)
  }

  total(): number {
    return _.sumBy(this.discountedProducts(), product => product.getPrice())
  }
}

export default CheckOut
