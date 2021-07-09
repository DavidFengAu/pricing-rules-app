import * as _ from 'lodash'
import CheckOut from '../../models/CheckOut'
import Customers from '../../models/Customers'
import Products, { ProductId } from '../../models/Products'

describe('Check Out', () => {
  const classicAd = Products.getProduct(ProductId.Classic)
  const standoutAd = Products.getProduct(ProductId.StandOut)
  const premiumAd = Products.getProduct(ProductId.Premium)

  it('should not apply pricing rules for Default customers', () => {
    const rules = Customers.getPricingRule()
    const checkOut = new CheckOut(rules)
      .add(ProductId.Classic)
      .add(ProductId.StandOut)
      .add(ProductId.Premium)

    const expectedTotal = _.sumBy([classicAd, standoutAd, premiumAd], p => p.price)
    expect(checkOut.total()).toEqual(expectedTotal)
  })

  it('should apply "3 for 2 deal on Classic Ads" rule for SecondBite', () => {
    const rules = Customers.getPricingRule('SecondBite')
    const checkOut = new CheckOut(rules)
      .add(ProductId.Classic)
      .add(ProductId.Classic)
      .add(ProductId.Classic)
      .add(ProductId.Premium)

    const expectedTotal = _.sumBy([classicAd, classicAd, premiumAd], p => p.price)
    expect(checkOut.total()).toEqual(expectedTotal)
  })

  it('should apply "$299.99 on Stand out Ads" rule for SecondBite', () => {
    const rules = Customers.getPricingRule('Axil Coffee Roasters')
    const checkOut = new CheckOut(rules)
      .add(ProductId.StandOut)
      .add(ProductId.StandOut)
      .add(ProductId.StandOut)
      .add(ProductId.Premium)

    const expectedTotal = _.sum([29999, 29999, 29999, premiumAd.price])
    expect(checkOut.total()).toEqual(expectedTotal)
  })

  it('should apply both "5 for 4 deal on Stand out Ads" and "$389.99 on Premium Ads" rules for MYER', () => {
    const rules = Customers.getPricingRule('MYER')
    const checkOut = new CheckOut(rules)
      .add(ProductId.Classic)
      .add(ProductId.StandOut)
      .add(ProductId.StandOut)
      .add(ProductId.StandOut)
      .add(ProductId.StandOut)
      .add(ProductId.StandOut)
      .add(ProductId.StandOut)
      .add(ProductId.Premium)
      .add(ProductId.Premium)

    const expectedTotal = _.sum([
      classicAd.price,
      standoutAd.price,
      standoutAd.price,
      standoutAd.price,
      standoutAd.price,
      0,
      standoutAd.price,
      38999,
      38999
    ])
    expect(checkOut.total()).toEqual(expectedTotal)
  })
})
