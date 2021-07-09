import * as _ from 'lodash'
import React from 'react'
import CheckOut from '../models/CheckOut'
import Products, { Product } from '../models/Products'
import { formatPrice } from './utils'

interface IProductListProps {
  checkOut: CheckOut
  setCheckOut: (checkOut: CheckOut) => void
}

const ProductList = ({ checkOut, setCheckOut }: IProductListProps) => {
  return (
    <table className="table table-bordered table-hover">
      <thead className="thead-light">
        <tr>
          <th scope="col">Product</th>
          <th scope="col">Description</th>
          <th scope="col">Retail Price</th>
          <th scope="col" />
        </tr>
      </thead>
      <tbody>
        {_.values(Products.products).map((product: Product, i: number) => (
          <tr key={i}>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>{formatPrice(product.price)}</td>
            <td>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setCheckOut(checkOut.add(product.id))}
              >Add</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ProductList
