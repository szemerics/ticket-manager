import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/api'
import { IMovie } from '../interfaces/IMovie'

const Movie = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState<IMovie>();

  useEffect(() => {
    api.Movies.getMovieById(id!).then(res => {
      setMovie(res.data)
    })
  }, [])
  

  return (
    <>
      <h1>{movie?.title}</h1>
      <p>{movie?.description}</p>
      <p>Year: {movie?.year}</p>
      <p>Length: {movie?.lengthInMinutes} minutes</p>
      <p>Minimum Age: {movie?.minimumAge}</p>
      <p>Categories: {movie?.categories.join(', ')}</p>
    </>
  )
}

export default Movie