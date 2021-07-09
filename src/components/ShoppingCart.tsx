import React from 'react'
import CheckOut from '../models/CheckOut'
import { Product } from '../models/Products'
import { formatPrice } from './utils'

interface IShoppingCartProps {
  checkOut: CheckOut
  setCheckOut: (checkOut: CheckOut) => void
}

const ShoppingCart = ({ checkOut, setCheckOut }: IShoppingCartProps) => {
  const discountedProducts = checkOut.discountedProducts()
  return <>
    <table className="table table-sm table-hover">
      <thead className="thead-light">
        <tr>
          <th scope="col">Product</th>
          <th scope="col">Pricing Rule Applied</th>
          <th scope="col">Price</th>
        </tr>
      </thead>
      <tbody>
        {discountedProducts.length
          ? checkOut.discountedProducts().map((product: Product, i: number) => (
              <tr key={i}>
                <td>{product.name}</td>
                <td>{product.deal?.ruleName}</td>
                <td>{product.deal
                  ? <div className="discounted">
                    <span>{formatPrice(product.deal.price)}</span>
                    <span>{formatPrice(product.price)}</span>
                  </div>
                  : formatPrice(product.price) }
                </td>
              </tr>
            ))
          : <tr><td colSpan={3}>no products</td></tr>
        }
        <tr className="table-success">
          <td><b>Total</b></td>
          <td />
          <td><b>{`$${checkOut.total() / 100}`}</b></td>
        </tr>
      </tbody>
    </table>
    <button
      className="btn btn-danger"
      onClick={() => setCheckOut(checkOut.empty())}
    >Empty Shopping Cart</button>
  </>
}

export default ShoppingCart
