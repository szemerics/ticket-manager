import { useRef } from 'react'
import { CashierOrdersList } from '../components/Cashier/CashierOrdersList';
import CashierCreateOrderModal from '../components/Cashier/CashierCreateOrderModal';

const Cashier = () => {
  const refreshOrdersRef = useRef<(() => void) | null>(null);

  return (
    <>
      <CashierCreateOrderModal onOrderCreated={() => refreshOrdersRef.current?.()} />
      <CashierOrdersList onRefreshRef={refreshOrdersRef} />
    </>
  )
}

export default Cashier