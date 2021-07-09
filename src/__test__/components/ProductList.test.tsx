import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import ProductList from '../../components/ProductList'
import CheckOut from '../../models/CheckOut'
import { ProductId } from '../../models/Products'

test('Product List Component', () => {
  const mockCallback = jest.fn()
  const checkOut = new CheckOut().add(ProductId.Classic)
  const { container } = render(<ProductList checkOut={checkOut} setCheckOut={mockCallback} />)
  const addButtonElem = container.querySelector("button")
  if (addButtonElem) {
    fireEvent.click(addButtonElem)
  }
  expect(mockCallback).toHaveBeenCalledTimes(1)
})
