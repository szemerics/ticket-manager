import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/api'
import { IMovie } from '../interfaces/IMovie'
import { Badge, Card, Center, Flex, Text } from '@mantine/core'
import { Carousel } from '@mantine/carousel';
import { MovieCard } from '../components/Movies/MovieCards/MovieCard'

interface Category {
  id: number;
  name: string;
}

const Movie = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState<IMovie>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [movies, setMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    api.Movies.getMovieById(id!).then(res => {
      setMovie(res.data)
    })

     api.Movies.getCategories().then(res => {
      setCategories(res.data);
    });

      api.Movies.getMovies().then(res => {
      setMovies(res.data);
    });

  }, [])

  const getCategoryNames = (categoryIds: number[]) => {
    return categoryIds.map(id => 
      categories.find(cat => cat.id === id)?.name || ''
    ).filter(name => name !== '');
  };
  

  return (
    <>
    <Center>
      <Flex direction={{ base: 'column', sm: 'row' }} align="center" gap={{ base: 'xl', sm: 'md' }} mx={20} mt={50}>
        <img src={movie?.posterUrl} alt={movie?.title} style={{ width: '300px', height: '450px', borderRadius: '10px' }} />
        <Flex direction={'column'} justify={'center'} align={{ base: 'center', sm: 'start' }} ml={{ base: 0, sm: 20 }}>
          <h1>{movie?.title}</h1>
          <p>{movie?.description}</p>
          <Flex gap={10} wrap="wrap" mb={20} justify={{ base: 'center', sm: 'start' }}>
            {movie?.categories && getCategoryNames(movie.categories).map((categoryName, index) => (
              <Badge key={index} size="lg" variant="light">
                {categoryName}
              </Badge>
            ))}
          </Flex>
          <Flex gap={20} wrap="wrap" justify={{ base: 'center', sm: 'start' }}>
            <Card withBorder w={{base : '100%', sm:200}} radius="md" padding="xl" bg="var(--mantine-color-body)">
              <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
                Release Year
              </Text>
              <Text fz="lg" fw={500}>
                {movie?.year}
              </Text>
            </Card>
            <Card withBorder w={{base : '100%', sm:200}} radius="md" padding="xl" bg="var(--mantine-color-body)">
                <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
                  Length in Minutes
                </Text>
                <Text fz="lg" fw={500}>
                  {movie?.lengthInMinutes}
                </Text>
            </Card>
            <Card withBorder w={{base : '100%', sm:200}} radius="md" padding="xl" bg="var(--mantine-color-body)">
                <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
                  Minimum Age
                </Text>
                <Text fz="lg" fw={500}>
                  {movie?.minimumAge}
                </Text>
            </Card>
          </Flex>
           
        </Flex>
      </Flex>
      
    </Center>
    <Text size='32px' mt={200} fw={700} px="xl" py="100px" ta="center">
        Other Movies
    </Text>
    <Carousel
        withIndicators
        height={600}
        type="container"
        slideSize={{ base: '100%', '300px': '50%', '500px': '33.333333%' }}
        slideGap={{ base: 0, '300px': 'md', '500px': 'lg' }}
        emblaOptions={{ loop: true, align: 'start' }} >
        
        {movies.map((movie) => (
          <Carousel.Slide key={movie.id}>
            <MovieCard
              id={movie.id}
              title={movie.title} 
              categories={getCategoryNames(movie.categories)} 
              year={movie.year}
              posterUrl={movie.posterUrl}
            />
          </Carousel.Slide>
        ))}
        
      </Carousel>
    </>
  )
}

export default Movie