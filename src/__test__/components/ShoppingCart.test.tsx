import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import ShoppingCart from '../../components/ShoppingCart'
import CheckOut from '../../models/CheckOut'
import Customers from '../../models/Customers'
import Products, { ProductId } from '../../models/Products'

test('Product List Component', () => {
  const mockCallback = jest.fn()
  const checkOut = new CheckOut(Customers.getPricingRule("MYER"))
    .add(ProductId.Premium)
    .add(ProductId.Classic)
  const { container, getByText } = render(<ShoppingCart checkOut={checkOut} setCheckOut={mockCallback} />)

  const premiumAdName = Products.getProduct(ProductId.Premium).name
  expect(getByText(premiumAdName)).toBeInTheDocument()
  const classicAdName = Products.getProduct(ProductId.Classic).name
  expect(getByText(classicAdName)).toBeInTheDocument()

  const emptyButtonElem = container.querySelector("button")
  if (emptyButtonElem) {
    fireEvent.click(emptyButtonElem)
  }
  expect(mockCallback).toHaveBeenCalledTimes(1)
})
