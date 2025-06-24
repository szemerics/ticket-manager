import { useEffect, useState } from 'react';
import { Card, Text, Group, Flex, SegmentedControl, Loader, Center, Table, Paper, Box } from '@mantine/core';
import { Sparkline } from '@mantine/charts';
import api from '../../api/api';
import { IOrder } from '../../interfaces/IOrder';
import { IMovie } from '../../interfaces/IMovie';
import { IScreening } from '../../interfaces/IScreening';
import { IProfile } from '../../interfaces/IProfile';

const FILTERS = [
  { label: 'ALL', value: 'all' },
  { label: '7D', value: '7d' },
  { label: '1M', value: '1m' },
  { label: '1Y', value: '1y' },
];

const getDateLimit = (filter: string) => {
  const now = new Date();
  if (filter === '7d') return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  if (filter === '1m') return new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
  if (filter === '1y') return new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
  return null;
};

const AdminDashboard = () => {
  const [filter, setFilter] = useState<string>('all');
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [screenings, setScreenings] = useState<IScreening[]>([]);
  const [users, setUsers] = useState<IProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.Orders.getAllOrders().then(res => res.data),
      api.Movies.getMovies().then(res => res.data),
      api.Screenings.getAllScreenings().then(res => res.data),
      api.Users.getAllUsers().then(res => res.data),
    ]).then(([orders, movies, screenings, users]) => {
      setOrders(orders);
      setMovies(movies);
      setScreenings(screenings);
      setUsers(users);
      setLoading(false);
    });
  }, []);

  const dateLimit = getDateLimit(filter);
  const filteredOrders = filter === 'all' || !dateLimit ? orders : orders.filter(order => new Date(order.purchaseDate) >= dateLimit);

  const totalRevenue = filteredOrders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
  const totalTickets = filteredOrders.reduce((sum, o) => sum + (o.tickets?.length || 0), 0);

  // Sparkline data
  let sparklineData: number[] = [];
  if (filter === 'all') {
    // Group by month
    const byMonth: Record<string, number> = {};
    orders.forEach(o => {
      const d = new Date(o.purchaseDate);
      const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
      byMonth[key] = (byMonth[key] || 0) + (o.totalPrice || 0);
    });
    sparklineData = Object.values(byMonth);
  } else if (filter === '7d') {
    // Group by day
    const byDay: Record<string, number> = {};
    for (let i = 6; i >= 0; --i) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      byDay[key] = 0;
    }
    filteredOrders.forEach(o => {
      const d = new Date(o.purchaseDate).toISOString().slice(0, 10);
      if (byDay[d] !== undefined) byDay[d] += o.totalPrice || 0;
    });
    sparklineData = Object.values(byDay);
  } else if (filter === '1m') {
    // Group by week
    const byWeek: Record<string, number> = {};
    filteredOrders.forEach(o => {
      const d = new Date(o.purchaseDate);
      const week = Math.floor(d.getDate() / 7);
      const key = `${d.getFullYear()}-${d.getMonth() + 1}-W${week}`;
      byWeek[key] = (byWeek[key] || 0) + (o.totalPrice || 0);
    });
    sparklineData = Object.values(byWeek);
  } else if (filter === '1y') {
    // Group by month
    const byMonth: Record<string, number> = {};
    filteredOrders.forEach(o => {
      const d = new Date(o.purchaseDate);
      const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
      byMonth[key] = (byMonth[key] || 0) + (o.totalPrice || 0);
    });
    sparklineData = Object.values(byMonth);
  }

  const cashiers = users.filter(u => {
    const rolesArr = Array.isArray(u.roles) ? u.roles : [u.roles];
    const isCashier = rolesArr.some(r => r && r.id === 2 && r.name === 'Cashier');
    const isAdmin = rolesArr.some(r => r && r.id === 1 && r.name === 'Admin');
    return isCashier && !isAdmin;
  });

  if (loading) {
    return <Center h={300}><Loader size="lg" /></Center>;
  }

  return (
    <Box bg="white" p={{ base: 8, md: 32 }} style={{ minHeight: '100vh' }}>
      <Flex direction="column" gap={10}>
        <Group justify="flex-start" align="center" mb={8}>
          <SegmentedControl
            value={filter}
            onChange={setFilter}
            data={FILTERS}
            size="md"
          />
        </Group>
        <Group grow align="stretch" mb={8}>
          <Card withBorder radius="md" padding="xl" bg="var(--mantine-color-body)" style={{ transition: 'box-shadow 0.2s', boxShadow: '0 2px 12px 0 rgba(0,0,0,0.04)' }}>
            <Flex direction="column" gap={8}>
              <Text fz="xs" tt="uppercase" fw={700} c="dimmed">Total Revenue</Text>
              <Text fz="2.2rem" fw={700}>{totalRevenue.toLocaleString()} Ft</Text>
              <Sparkline
                w={220}
                h={100}
                data={sparklineData}
                color="blue"
                curveType="bump"
                fillOpacity={0.2}
                strokeWidth={3}
              />
            </Flex>
          </Card>
          <Card withBorder radius="md" padding="xl" bg="var(--mantine-color-body)" style={{ transition: 'box-shadow 0.2s', boxShadow: '0 2px 12px 0 rgba(0,0,0,0.04)' }}>
            <Text fz="xs" tt="uppercase" fw={700} c="dimmed">Tickets Sold</Text>
            <Text fz="2.2rem" fw={700}>{totalTickets}</Text>
          </Card>
          <Card withBorder radius="md" padding="xl" bg="var(--mantine-color-body)" style={{ transition: 'box-shadow 0.2s', boxShadow: '0 2px 12px 0 rgba(0,0,0,0.04)' }}>
            <Text fz="xs" tt="uppercase" fw={700} c="dimmed">Movies in Database</Text>
            <Text fz="2.2rem" fw={700}>{movies.length}</Text>
          </Card>
          <Card withBorder radius="md" padding="xl" bg="var(--mantine-color-body)" style={{ transition: 'box-shadow 0.2s', boxShadow: '0 2px 12px 0 rgba(0,0,0,0.04)' }}>
            <Text fz="xs" tt="uppercase" fw={700} c="dimmed">Screenings in Database</Text>
            <Text fz="2.2rem" fw={700}>{screenings.length}</Text>
          </Card>
          <Card withBorder radius="md" padding="xl" bg="var(--mantine-color-body)" style={{ transition: 'box-shadow 0.2s', boxShadow: '0 2px 12px 0 rgba(0,0,0,0.04)' }}>
            <Text fz="xs" tt="uppercase" fw={700} c="dimmed">Users in Database</Text>
            <Text fz="2.2rem" fw={700}>{users.length}</Text>
          </Card>
        </Group>
        <Paper withBorder radius="md" p="xl" bg="white" shadow="sm">
          <Text fz="lg" fw={700} mb={16}>Cashiers</Text>
          <Table striped highlightOnHover withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>Email</Table.Th>
                <Table.Th>Phone</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {cashiers.length === 0 ? (
                <Table.Tr>
                  <Table.Td colSpan={3} style={{ textAlign: 'center', color: '#888' }}>No cashiers found.</Table.Td>
                </Table.Tr>
              ) : cashiers.map((user) => (
                <Table.Tr key={user.id}>
                  <Table.Td>{user.name}</Table.Td>
                  <Table.Td>{user.email}</Table.Td>
                  <Table.Td>{user.phone}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Paper>
      </Flex>
    </Box>
  );
};

export default AdminDashboard;