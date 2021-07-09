import { MenuItem, TextField } from '@material-ui/core'
import * as _ from 'lodash'
import React from 'react'
import Customers from '../models/Customers'

interface ICustomerSelectorProps {
  customer: string
  setCustomer: (customer: string) => void
}

const CustomerSelector = ({ customer, setCustomer }: ICustomerSelectorProps) => {
  return (
    <TextField
      select
      label="Customer"
      value={customer}
      style={{ width: '250px' }}
      InputLabelProps={{ shrink: true }}
      onChange={event => setCustomer(event.target.value as string)}
    >
      {_.keys(Customers.customers).map((name, i) => <MenuItem key={i} value={name}>{name}</MenuItem>)}
    </TextField>
  )
}

export default CustomerSelector
