import { useRef } from "react";
import { AdminUsersList } from "../../components/Admin/Users/AdminUsersList";


const AdminUsers = () => {

  const refreshUsersRef = useRef<(() => void) | null>(null);
  return (
    <AdminUsersList onRefreshRef={refreshUsersRef}/>


  )
}

export default AdminUsers