import React, { useEffect, useState } from 'react'
import './App.css'
import CustomerSelector from './components/CustomerSelector'
import ProductList from './components/ProductList'
import RuleList from './components/RuleList'
import ShoppingCart from './components/ShoppingCart'
import CheckOut from './models/CheckOut'
import Customers from './models/Customers'

const App = () => {
  const [customer, setCustomer] = useState('Default')
  const [checkOut, setCheckOut] = useState(new CheckOut(Customers.getPricingRule(customer)))

  useEffect(() => {
    setCheckOut(checkOut.updateRules(Customers.getPricingRule(customer)))
  }, [customer])

  return (
    <div className="app">
      <CustomerSelector customer={customer} setCustomer={setCustomer} />
      <h3>Products</h3>
      <ProductList checkOut={checkOut} setCheckOut={setCheckOut} />
      <h3>Special Pricing Rules</h3>
      <RuleList rules={checkOut.rules}/>
      <h3>Shopping Cart</h3>
      <ShoppingCart checkOut={checkOut} setCheckOut={setCheckOut} />
    </div>
  )
}

export default App
