import { AppShell, Text, UnstyledButton } from '@mantine/core';
import { Outlet, useNavigate } from "react-router-dom";
import classes from '../BasicLayout/MobileNavbar.module.css';
import useAuth from '../../../hooks/useAuth';
import { NavbarSimple } from './NavbarSimple';

export function AdminLayout() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    return (
        <AppShell
            navbar={{ width: 300, breakpoint: 'sm' }}
            padding="md"
        >
            <AppShell.Navbar>
                <NavbarSimple />
            </AppShell.Navbar>

            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
}

export default AdminLayout; 