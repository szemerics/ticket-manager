import { Burger, Flex, Group, Image, Text } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import TicketsLogo from '/ticketManagerLogoNoShadow.png';
import classes from './CashierHeaderSearch.module.css';
import useAuth from '../../../hooks/useAuth';

export function CashierHeaderSearch({opened, toggle}: {opened: boolean, toggle: () => void}) {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  }

  const links = [
    { link: '/app/home', label: 'Logout', onClick: handleLogout },
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
            <Flex gap={10} align="center">  
              <Image src={TicketsLogo} alt="img" w={45}/>
              <Text fw={500}>Ticket Manager</Text>
            </Flex>
        </Group>

        <Group>
          <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
            {items}
          </Group>
        </Group>
      </div>
    </header>
  );
}