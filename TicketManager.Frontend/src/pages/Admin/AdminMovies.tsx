import CreateMovieModal from "../../components/Admin/CreateMovieModal"
import { AdminMoviesList } from "../../components/Admin/MovieTable/AdminMoviesList"
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