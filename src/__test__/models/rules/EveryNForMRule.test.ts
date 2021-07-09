import Products, { ProductId } from '../../../models/Products'
import { EveryNForMRule } from '../../../models/rules/EveryNForMRule'

describe('Discount Rule', () => {
  const classicAd = Products.getProduct(ProductId.Classic)
  const standoutAd = Products.getProduct(ProductId.StandOut)

  it('should apply discount to classic ad only', () => {
    const ruleName = 'Every N For M Rule'
    const rule = new EveryNForMRule(ruleName, ProductId.Classic, 3, 2)

    const products = [classicAd, classicAd, classicAd, classicAd, standoutAd]
    const discounted = rule.execute(products)

    const discountedClassicAds = [
      classicAd.applyDeal({ ruleName, price: classicAd.price }),
      classicAd.applyDeal({ ruleName, price: classicAd.price }),
      classicAd.applyDeal({ ruleName, price: 0 })
    ]
    const expected = [...discountedClassicAds, classicAd, standoutAd]

    expect(discounted.map(p => p.toString())).toEqual(expected.map(p => p.toString()))
  })
})
