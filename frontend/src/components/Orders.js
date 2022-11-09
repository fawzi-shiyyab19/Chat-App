import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Order from './Order';
import {io} from 'socket.io-client';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const res = await axios.get('http://localhost:3003/orders');
    setOrders(res.data);
  }

  useEffect(() => {
    const socket = io('ws://localhost:3003');

    socket.on('connection', () => {
      console.log('connected To server');
    });

    socket.on('order-added', () => {
      getOrders();
    });

    socket.on('disconnect', () => {
      console.log('Disconnected!!!!');
    });
  }, [])

  useEffect(() => {
    getOrders();
  }, [])

  return (
    <div>
      {orders && orders.map( order => (
        <div key={order._id}> <Order order={order} /> </div>
      ))}
    </div>
  )
}