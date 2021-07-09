import { render } from '@testing-library/react'
import React from 'react'
import RuleList from '../../components/RuleList'
import Customers from '../../models/Customers'

test('Rule List Component', () => {
  const rules = Customers.getPricingRule("MYER")
  const { getByText } = render(<RuleList rules={rules} />)
  expect(getByText(rules[0].name)).toBeInTheDocument()
})
