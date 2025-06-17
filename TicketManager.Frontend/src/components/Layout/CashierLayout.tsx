import { AppShell, Text, UnstyledButton } from '@mantine/core';
import { Outlet, useNavigate } from "react-router-dom";
import classes from './BasicLayout/MobileNavbar.module.css';
import useAuth from '../../hooks/useAuth';

export function CashierLayout() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: 'sm' }}
            padding="md"
        >
            <AppShell.Header p="xs">
                <Text size="xl" fw={700}>Cashier Dashboard</Text>
            </AppShell.Header>

            <AppShell.Navbar p="md">
                <UnstyledButton className={classes.navbarItem} onClick={() => navigate('/app/cashier/dashboard')}>
                    Dashboard
                </UnstyledButton>
                <UnstyledButton className={classes.navbarItem} onClick={() => navigate('/app/cashier/tickets')}>
                    Tickets
                </UnstyledButton>
                <UnstyledButton className={classes.navbarItem} onClick={() => navigate('/app/cashier/screenings')}>
                    Screenings
                </UnstyledButton>
                <UnstyledButton className={classes.navbarItem} onClick={logout}>
                    Logout
                </UnstyledButton>
            </AppShell.Navbar>

            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
}

export default CashierLayout; 