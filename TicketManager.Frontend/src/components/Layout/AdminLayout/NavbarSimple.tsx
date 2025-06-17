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

const data = [
  { link: '', label: 'Dashboard', icon: IconHome },
  { link: '', label: 'Movies', icon: IconMovie },
  { link: '', label: 'Screenings', icon: IconVideo },
  { link: '', label: 'Rooms', icon: IconSquareKey },
  { link: '', label: 'Orders', icon: IconReceipt },
  { link: '', label: 'Users', icon: IconUsers }
];

export function NavbarSimple() {
  const [active, setActive] = useState('Billing');

  const { logout } = useAuth();

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
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