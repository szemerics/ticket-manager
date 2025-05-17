import { Grid, Text } from '@mantine/core';
import { MovieCard } from './MovieCards/MovieCard';
import { useEffect, useState } from 'react';
import api from '../../api/api';
import { IMovie } from '../../interfaces/IMovie';

interface Category {
  id: number;
  name: string;
}

const Movies = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    api.Movies.getMovies().then(res => {
      setMovies(res.data);
    });

    api.Movies.getCategories().then(res => {
      setCategories(res.data);
    });
  }, []);

  const getCategoryNames = (categoryIds: number[]) => {
    return categoryIds.map(id => 
      categories.find(cat => cat.id === id)?.name || ''
    ).filter(name => name !== '');
  };

  return (
    <>
      <Text size='64px' fw={700} px="xl" py="100px" ta="center">
        Now Showing
      </Text>

      <Grid gutter="md" px="xl">
        {movies.map((movie) => (
          <Grid.Col key={movie.id} span={{ base: 12, sm: 4, md: 4, lg: 3 }}>
            <MovieCard
              id={movie.id}
              title={movie.title} 
              categories={getCategoryNames(movie.categories)} 
              year={movie.year}
              posterUrl={movie.posterUrl}
            />
          </Grid.Col>
        ))}
      </Grid>
    </>
  )
}

export default Movies