import { render, screen } from '@testing-library/react'
import React from 'react'
import App from '../App'

test('renders app', () => {
  render(<App />)
  const productsElement = screen.getAllByText(/Shopping Cart/i)
  expect(productsElement).toHaveLength(2)
})
