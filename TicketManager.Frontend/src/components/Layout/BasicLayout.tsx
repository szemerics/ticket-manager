import { useDisclosure } from '@mantine/hooks';
import classes from './MobileNavbar.module.css';
import { AppShell, UnstyledButton } from '@mantine/core';
import { Outlet } from "react-router-dom";
import { HeaderSearch } from './HeaderSearch';

export function BasicLayout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 72 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
    >
      <AppShell.Header>
        <HeaderSearch opened={opened} toggle={toggle} />
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <UnstyledButton className={classes.control}>Home</UnstyledButton>
        <UnstyledButton className={classes.control}>Blog</UnstyledButton>
        <UnstyledButton className={classes.control}>Contacts</UnstyledButton>
        <UnstyledButton className={classes.control}>Support</UnstyledButton>
      </AppShell.Navbar>

      <AppShell.Main>
         <Outlet/>
      </AppShell.Main>
    </AppShell>
  );
}

export default BasicLayout;