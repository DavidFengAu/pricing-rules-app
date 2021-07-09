import Products, { ProductId } from '../../../models/Products'
import { DiscountRule } from '../../../models/rules/DiscountRule'

describe('Discount Rule', () => {
  const classicAd = Products.getProduct(ProductId.Classic)
  const standoutAd = Products.getProduct(ProductId.StandOut)

  it('should apply discount to classic ad only', () => {
    const ruleName = 'Discount Rule'
    const rule = new DiscountRule(ruleName, ProductId.Classic, 25999)

    const products = [classicAd, classicAd, standoutAd]
    const discounted = rule.execute(products)

    const discountedClassicAd = classicAd.applyDeal({ ruleName, price: 25999 })
    const expected = [discountedClassicAd, discountedClassicAd, standoutAd]

    expect(discounted.map(p => p.toString())).toEqual(expected.map(p => p.toString()))
  })
})
