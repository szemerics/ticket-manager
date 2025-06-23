import { useEffect, useState } from 'react';
import { IconChevronDown, IconChevronUp, IconSearch, IconSelector } from '@tabler/icons-react';
import {
  ActionIcon,
  Button,
  Center,
  Group,
  keys,
  Loader,
  Modal,
  ScrollArea,
  Table,
  Text,
  TextInput,
  UnstyledButton,
  NumberFormatter,
  Flex,
} from '@mantine/core';
import classes from './Orders.module.css';
import { IconEye } from '@tabler/icons-react';
import api from '../../api/api';
import { IOrder } from '../../interfaces/IOrder';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';

interface RowData {
  purchaseDate: string;
  movieTitle: string;
  ticketsQuantity: number;
  totalPrice: number;
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort: () => void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={16} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  if (!query) return data;
  
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toString().toLowerCase().includes(query))
  );
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (sortBy === 'purchaseDate') {
        const dateA = new Date(a[sortBy].split(',')[0]).getTime();
        const dateB = new Date(b[sortBy].split(',')[0]).getTime();
        return payload.reversed ? dateB - dateA : dateA - dateB;
      }
      
      if (sortBy === 'totalPrice') {
        return payload.reversed ? b[sortBy] - a[sortBy] : a[sortBy] - b[sortBy];
      }

      // For string fields (movieTitle)
      if (payload.reversed) {
        return String(b[sortBy]).localeCompare(String(a[sortBy]));
      }
      return String(a[sortBy]).localeCompare(String(b[sortBy]));
    }),
    payload.search
  );
}

export function Orders() {
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState<RowData[]>([]);
  const [originalData, setOriginalData] = useState<RowData[]>([]);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

  useEffect(() => {
    api.Orders.getOrders().then(res => {
      const formattedOrders: RowData[] = res.data.map((order: IOrder) => ({
        purchaseDate: new Date(order.purchaseDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        movieTitle: order.screening.movie.title,
        ticketsQuantity: order.tickets.length,
        totalPrice: order.totalPrice
      }));
      setOrders(res.data);
      setOriginalData(formattedOrders);
      setSortedData(formattedOrders);
      setLoading(false);
    });
  }, []);

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(originalData, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(originalData, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  if(loading) {
    return (
      <Center>
        <Loader size="lg" />
      </Center>
    );
  }

  const rows = sortedData.map((row, index) => {
    const screeningTime = new Date(orders[index].screening.screeningTime);
    const now = new Date();
    const hoursDiff = (screeningTime.getTime() - now.getTime()) / (1000 * 60 * 60);
    const canDelete = hoursDiff >= 4;
    return (
      <Table.Tr key={row.purchaseDate}>
        <Table.Td>{row.purchaseDate}</Table.Td>
        <Table.Td>{row.movieTitle}</Table.Td>
        <Table.Td>{row.ticketsQuantity}</Table.Td>
        <Table.Td><NumberFormatter value={row.totalPrice} thousandSeparator=" " suffix=' Ft' /></Table.Td>
        <Table.Td>
          <ActionIcon>
            <IconEye onClick={() => {
              setSelectedOrder(orders[index]);
              open();
            }} style={{ width: '70%', height: '70%' }} stroke={1.5}/>
          </ActionIcon>
          <ActionIcon
            color="red"
            ml={8}
            disabled={!canDelete}
            onClick={() => {
              if (canDelete) {
                openDeleteOrderModal(orders[index].id, orders[index].screening.movie.title);
              }
            }}
            title={canDelete ? 'Delete order' : 'Cannot delete within 4 hours of screening'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
          </ActionIcon>
        </Table.Td>
      </Table.Tr>
    );
  });

  const openDeleteOrderModal = (orderId: number, movieTitle: string) => {
    modals.openConfirmModal({
      title: `Are you sure you want to delete the order for "${movieTitle}"?`,
      centered: true,
      children: (
        <Text size="sm">
          This action cannot be undone.
        </Text>
      ),
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onCancel: () =>
        notifications.show({
          position: 'bottom-center',
          title: 'Cancelled',
          color: 'gray',
          message: 'Order deletion was cancelled.',
        }),
      onConfirm: async () => {
        try {
          await api.Orders.deleteOrder(String(orderId));
          const res = await api.Orders.getOrders();
          setOrders(res.data);
          const formattedOrders: RowData[] = res.data.map((order: IOrder) => ({
            purchaseDate: new Date(order.purchaseDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }),
            movieTitle: order.screening.movie.title,
            ticketsQuantity: order.tickets.length,
            totalPrice: order.totalPrice
          }));
          setOriginalData(formattedOrders);
          setSortedData(formattedOrders);
          notifications.show({
            position: 'bottom-center',
            title: 'Deleted',
            color: 'red',
            message: 'Order was successfully deleted.',
          });
        } catch (error) {
          notifications.show({
            position: 'bottom-center',
            title: 'Error',
            color: 'orange',
            message: 'Failed to delete the order.',
          });
          console.error('Delete error:', error);
        }
      },
    });
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="More Details" size="lg">
        {selectedOrder && (
          <div>
            <Text size="lg" fw={500} mb="md">Order Information</Text>
            <Text mb="xs"><b>Order ID:</b> {selectedOrder.id}</Text>
            <Text mb="xs"><b>Purchase Date:</b> {new Date(selectedOrder.purchaseDate).toLocaleString()}</Text>
            <Text mb="xs"><b>Total Price:</b> <NumberFormatter value={selectedOrder.totalPrice} thousandSeparator=" " suffix=" Ft"/></Text>
            <Text mb="xs"><b>Email:</b> {selectedOrder.email}</Text>
            <Text mb="xs"><b>Phone:</b> {selectedOrder.phone}</Text>
            
            <Text size="lg" fw={500} mt="xl" mb="md">Movie Details</Text>
            <Text mb="xs"><b>Movie Title:</b> {selectedOrder.screening.movie.title}</Text>
            
            <Text size="lg" fw={500} mt="xl" mb="md">Tickets ({selectedOrder.tickets.length})</Text>
            {selectedOrder.tickets.map((ticket, index) => (
              <Text key={index} mb="xs">
                <b>Ticket {index + 1}:</b> Row {ticket.seat.row}, Column {ticket.seat.column} - Price: <NumberFormatter value={ticket.price} thousandSeparator=" " suffix=" Ft"/>
              </Text>
              
            ))}
            <Text mb="xs"><b>Screening Date:</b> {new Date(selectedOrder.screening.screeningTime).toLocaleString()}</Text>
          </div>
        )}
      </Modal>
      <Flex direction={'column'}>
        <Flex direction={'column'}>
          <Text size="lg" fw={500} mb="md">Your Orders</Text>
          <TextInput
            placeholder="Search by any field"
            mb="md"
            leftSection={<IconSearch size={16} stroke={1.5} />}
            value={search}
            onChange={handleSearchChange}
          />
        </Flex>

        <ScrollArea>
        <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
          <Table.Tbody>
            <Table.Tr>
              <Th
                sorted={sortBy === 'purchaseDate'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('purchaseDate')}
              >
                Purchase Date
              </Th>
              <Th
                sorted={sortBy === 'movieTitle'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('movieTitle')}
              >
                Movie Title
              </Th>
              <Table.Th className={classes.th} px={16}>
                <Text fw={500} fz="sm">Tickets Quantity</Text>
              </Table.Th>
              <Th
                sorted={sortBy === 'totalPrice'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('totalPrice')}
              >
                Total Price
              </Th>
              <Table.Th className={classes.th} px={16}>
                <Text fw={500} fz="sm">Action</Text>
              </Table.Th>
            </Table.Tr>
          </Table.Tbody>
          <Table.Tbody>
            {rows.length > 0 ? (
              rows
            ) : (
              <Table.Tr>
                <Table.Td colSpan={5}>
                  <Text fw={500} ta="center">
                    Nothing found
                  </Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </ScrollArea>
        
      </Flex>
      
    </>
  );
}