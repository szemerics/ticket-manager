import { AppShell } from '@mantine/core';
import { Outlet, useNavigate } from "react-router-dom";
import { CashierHeaderSearch } from './CashierHeaderSearch';
import { useDisclosure } from '@mantine/hooks';

export function CashierLayout() {
    const [opened, { toggle }] = useDisclosure();

    return (
        <AppShell
            header={{ height: 82 }}
            navbar={{ width: 0, breakpoint: 'sm' }}
            padding="md"
        >
            <AppShell.Header p="xs">
              <CashierHeaderSearch opened={opened} toggle={toggle} />
            </AppShell.Header>

            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
}

export default CashierLayout; 