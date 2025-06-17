import { useState } from 'react';
import {
  IconHome,
  IconMovie,
  IconVideo,
  IconSquareKey,
  IconUsers,
  IconReceipt,
  IconLogout,
} from '@tabler/icons-react';
import { Code, Group, Image } from '@mantine/core';
import classes from './NavbarSimple.module.css';
import useAuth from '../../../hooks/useAuth';
import TicketsLogo from '/ticketManagerLogoNoShadow.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const data = [
  { link: '/admin/dashboard', label: 'Dashboard', icon: IconHome },
  { link: '/admin/movies', label: 'Movies', icon: IconMovie },
  { link: '/admin/screenings', label: 'Screenings', icon: IconVideo },
  { link: '/admin/rooms', label: 'Rooms', icon: IconSquareKey },
  { link: '/admin/orders', label: 'Orders', icon: IconReceipt },
  { link: '/admin/users', label: 'Users', icon: IconUsers }
];

export function NavbarSimple() {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  const { logout } = useAuth();

  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={item.link === active || undefined}
      to={item.link}
      key={item.label}
      onClick={() => setActive(item.link)}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <Group>
            <Image src={TicketsLogo} alt="img" w={45}/>
            Ticket Manager
          </Group>
          <Code fw={700}>Admin</Code>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <a className={classes.link} onClick={logout}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}