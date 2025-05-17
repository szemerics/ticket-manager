import { IconSearch } from '@tabler/icons-react';
import { Autocomplete, Burger, Flex, Group, Image, Text } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import MicketsLogo from '/ticketManagerLogoNoShadow.png';
import classes from './HeaderSearch.module.css';
import useAuth from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import api from '../../api/api';
import { IMovie } from '../../interfaces/IMovie';

export function HeaderSearch({opened, toggle}: {opened: boolean, toggle: () => void}) {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [movies, setMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    api.Movies.getMovies()
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => {
        console.error('Failed to fetch movies:', error);
      });
  }, []);

  const handleMovieSelect = (movieTitle: string) => {
    const selectedMovie = movies.find(movie => movie.title === movieTitle);
    if (selectedMovie) {
      navigate(`/app/movies/${selectedMovie.id}`);
      
    }
  };

  const scrollToMovies = () => {
    const moviesSection = document.querySelector('.mantine-Grid-root');
    if (moviesSection) {
      const headerHeight = 72; // Height of the header
      const elementPosition = moviesSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleMoviesClick = () => {
    navigate('/app/dashboard');
    setTimeout(scrollToMovies, 100);
  };

  const links = [
    { link: isLoggedIn ? '/app/profile' : '/app/login', label: isLoggedIn ? 'Profile' : 'Login' },
    { link: '/app/dashboard', label: 'Movies', onClick: handleMoviesClick },
  ];

  const items = links.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      className={classes.link}
      onClick={link.onClick}
    >
      {link.label}
    </Link>
  ));

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
          <Link to={'/app/dashboard'} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Flex gap={10} align="center">  
              <Image src={MicketsLogo} alt="img" w={45}/>
              <Text fw={500}>Mickets</Text>
            </Flex>
          </Link>
        </Group>

        <Group>
          <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
            {items}
          </Group>
          <Autocomplete
            className={classes.search}
            placeholder="Search movies..."
            leftSection={<IconSearch size={16} stroke={1.5} />}
            data={movies.map(movie => movie.title)}
            onChange={handleMovieSelect}
            visibleFrom="xs"
          />
        </Group>
      </div>
    </header>
  );
}