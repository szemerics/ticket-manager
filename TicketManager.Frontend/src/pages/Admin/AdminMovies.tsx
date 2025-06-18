import CreateMovieModal from "../../components/Admin/Movies/CreateMovieModal"
import { AdminMoviesList } from "../../components/Admin/Movies/AdminMoviesList"
import { useRef } from "react"

const AdminMovies = () => {
  const refreshMoviesRef = useRef<(() => void) | null>(null);

  return (
    <>
      <CreateMovieModal onMovieCreated={() => refreshMoviesRef.current?.()} />
      <AdminMoviesList onRefreshRef={refreshMoviesRef} />
    </>
  )
}

export default AdminMovies