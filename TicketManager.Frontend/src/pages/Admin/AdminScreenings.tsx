import { AdminScreeningsList } from "../../components/Admin/Screenings/AdminScreeningsList"
import { useRef } from "react"
import CreateScreeningModal from "../../components/Admin/Screenings/CreateScreeningModal";

const AdminScreenings = () => {
  const refreshScreeningsRef = useRef<(() => void) | null>(null);


  return (
    <>
      <CreateScreeningModal onScreeningCreated={() => refreshScreeningsRef.current?.()} />
      <AdminScreeningsList onRefreshRef={refreshScreeningsRef}/>
    </>
  )
}

export default AdminScreenings