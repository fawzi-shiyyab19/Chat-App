import React from 'react'

export default function Order(props) {
  return (
    <div>
      <p>{props.order.customer}</p>
      <p>{props.order.price}</p>
    </div>
  )
}