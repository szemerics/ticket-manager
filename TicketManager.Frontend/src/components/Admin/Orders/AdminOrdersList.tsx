import React, { useEffect, useState } from 'react';
import { IconChevronDown, IconChevronUp, IconSearch, IconSelector, IconEye, IconTrash } from '@tabler/icons-react';
import {
  Center,
  Group,
  Image,
  keys,
  ScrollArea,
  Table,
  Text,
  TextInput,
  Textarea,
  Select,
  UnstyledButton,
  Badge,
  ActionIcon,
  Modal,
  Button,
  Flex,
  MultiSelect,
  NumberInput,
  NumberFormatter,
} from '@mantine/core';
import classes from './AdminOrdersList.module.css';
import api from '../../../api/api';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';
import { IOrder } from '../../../interfaces/IOrder';

interface RowData {
  id: number;
  purchaseDate: string;
  movieTitle: string;
  ticketsQuantity: number;
  totalPrice: number;
}

// Table Settings from Mantine

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

      // for string fields
      if (payload.reversed) {
        return String(b[sortBy]).localeCompare(String(a[sortBy]));
      }
      return String(a[sortBy]).localeCompare(String(b[sortBy]));
    }),
    payload.search
  );
}

interface AdminOrdersListProps {
  onRefreshRef: React.RefObject<(() => void) | null>;
}

export function AdminOrdersList( { onRefreshRef }: AdminOrdersListProps) {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState<RowData[]>([]);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [originalData, setOriginalData] = useState<RowData[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  const refreshOrders = () => {
    api.Orders.getAllOrders().then(res => {
      const formattedOrders: RowData[] = res.data.map((order: IOrder) => ({
        id: order.id,
        purchaseDate: new Date(order.purchaseDate).toLocaleString('sv-SE', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }).replace(',', ''),
        movieTitle: order.screening.movie.title,
        ticketsQuantity: order.tickets.length,
        totalPrice: order.tickets.reduce((sum, ticket) => sum + (ticket.price || 0), 0),
      }));
      setOrders(res.data);
      setOriginalData(formattedOrders);
      setSortedData(formattedOrders);
    });
  };

  useEffect(() => {
    refreshOrders();
  }, []);

  useEffect(() => {
    onRefreshRef.current = refreshOrders;
  }, [onRefreshRef])
  

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

  const rows = sortedData.map((row, index) => (
    <Table.Tr key={row.id}>
      <Table.Td>{row.purchaseDate}</Table.Td>
      <Table.Td>{row.movieTitle}</Table.Td>
      <Table.Td>{row.ticketsQuantity}</Table.Td>
      <Table.Td>
        <NumberFormatter value={row.totalPrice} thousandSeparator=" " suffix=' Ft' />
      </Table.Td>
      <Table.Td>
        <Flex gap={10}>
          <ActionIcon>
            <IconEye onClick={() => {
              const order = orders.find(o => o.id === row.id);
              if (order) {
                setSelectedOrder(order);
                open();
              }
            }} style={{ width: '70%', height: '70%' }} stroke={1.5}/>
          </ActionIcon>
          <ActionIcon color='red'>
            <IconTrash onClick={() => {
              const order = orders.find(o => o.id === row.id);
              if (order) {
                openDeleteModal(order.id, order.purchaseDate)
              }
            }} style={{ width: '70%', height: '70%' }} stroke={1.5}/>
          </ActionIcon>
        </Flex>
      </Table.Td>
      
    </Table.Tr>
  ));

// Delete Modal
const openDeleteModal = (id: number, title: string) => {
  modals.openConfirmModal({
    title: `Are you sure you want to delete "${title}"?`,
    centered: true,
    children: (
      <Text size="sm">
        This action cannot be undone.
      </Text>
    ),
    labels: { confirm: 'Delete', cancel: "Cancel" },
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
        await api.Orders.deleteOrder(String(id));
        refreshOrders();
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
          message: 'Failed to delete the Order.',
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
          </div>
        )}
      </Modal>



      <ScrollArea>
        <TextInput
          placeholder="Search by any field"
          mb="md"
          leftSection={<IconSearch size={16} stroke={1.5} />}
          value={search}
          onChange={handleSearchChange}
        />
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
              <Th
                sorted={sortBy === 'ticketsQuantity'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('ticketsQuantity')}
              >
                Tickets Quantity
              </Th>
              <Th
                sorted={sortBy === 'totalPrice'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('totalPrice')}
              >
                Total Price
              </Th>

              <Table.Th>
                Actions
              </Table.Th>
            </Table.Tr>
          </Table.Tbody>
          <Table.Tbody>
            {rows.length > 0 ? (
              rows
            ) : (
              <Table.Tr>
                <Table.Td colSpan={4}>
                  <Text fw={500} ta="center" w={'100%'}>
                    Nothing found
                  </Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </>
  );
}