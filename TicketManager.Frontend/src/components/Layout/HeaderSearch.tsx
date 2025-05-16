import { IconSearch } from '@tabler/icons-react';
import { Autocomplete, Burger, Flex, Group, Image, Text } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import MicketsLogo from '/ticketManagerLogoNoShadow.png';
import classes from './HeaderSearch.module.css';
import useAuth from '../../hooks/useAuth';

export function HeaderSearch({opened, toggle}: {opened: boolean, toggle: () => void}) {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

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
    { link: isLoggedIn ? '/app/profile' : '/login', label: isLoggedIn ? 'Profile' : 'Login' },
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
            placeholder="Search"
            leftSection={<IconSearch size={16} stroke={1.5} />}
            data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
            visibleFrom="xs"
          />
        </Group>
      </div>
    </header>
  );
}