import React, { useRef } from 'react'
import { AdminOrdersList } from '../../components/Admin/Orders/AdminOrdersList'

const AdminOrders = () => {
  const refreshOrdersRef = useRef<(() => void) | null>(null);

  return (
    <AdminOrdersList onRefreshRef={refreshOrdersRef} />
  )
}

export default AdminOrders