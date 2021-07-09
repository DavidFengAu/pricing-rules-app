import { ProductId } from './Products'
import { DiscountRule } from './rules/DiscountRule'
import { EveryNForMRule } from './rules/EveryNForMRule'
import PricingRule from './rules/PricingRule'

export default class Customers {
  static readonly customers: { [key in string]: PricingRule[] } = {
    'Default': [],
    'SecondBite': [
      new EveryNForMRule('3 for 2 deal on Classic Ads', ProductId.Classic, 3, 2)
    ],
    'Axil Coffee Roasters': [
      new DiscountRule('$299.99 on Stand out Ads', ProductId.StandOut, 29999)
    ],
    'MYER': [
      new EveryNForMRule('5 for 4 deal on Stand out Ads', ProductId.StandOut, 5, 4),
      new DiscountRule('$389.99 on Premium Ads', ProductId.Premium, 38999)
    ]
  }

  static getPricingRule(customerName: string): PricingRule[] {
    return this.customers[customerName] ?? []
  }
}
