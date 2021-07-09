import React from 'react'
import PricingRule from '../models/rules/PricingRule'

interface IRuleListProps {
  rules: PricingRule[]
}

const RuleList = ({ rules }: IRuleListProps) => {
  return (
    <table className="table table-sm table-bordered table-hover">
      <thead className="thead-light">
      <tr>
        <th scope="col">Rule Name</th>
      </tr>
      </thead>
      <tbody>
      {rules.length
        ? rules.map((rule: PricingRule, i: number) => <tr key={i}><td>{rule.name}</td></tr>)
        : <tr><td colSpan={3}>no rules</td></tr>}
      </tbody>
    </table>
  )
}

export default RuleList
