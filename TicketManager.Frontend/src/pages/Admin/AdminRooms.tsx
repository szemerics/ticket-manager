import { useRef } from "react"
import { AdminRoomsList } from "../../components/Admin/Rooms/AdminRoomsList"
import CreateRoomModal from "../../components/Admin/Rooms/CreateRoomModal";



const AdminRooms = () => {
  const refreshRoomsRef = useRef<(() => void) | null>(null);

  return (
    <>
      <CreateRoomModal onRoomCreated={() => refreshRoomsRef.current?.()} />
      <AdminRoomsList onRefreshRef={refreshRoomsRef} />
    </>
  )
}

export default AdminRooms