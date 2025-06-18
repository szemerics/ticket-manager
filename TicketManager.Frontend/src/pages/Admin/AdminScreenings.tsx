import { AdminScreeningsList } from "../../components/Admin/Screenings/AdminScreeningsList"
import { useRef } from "react"

const AdminScreenings = () => {
  const refreshScreeningsRef = useRef<(() => void) | null>(null);


  return (
    <>
      <AdminScreeningsList onRefreshRef={refreshScreeningsRef}/>
    </>
  )
}

export default AdminScreenings