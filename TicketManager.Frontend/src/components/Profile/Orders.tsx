import { useEffect, useState } from 'react';
import { IconChevronDown, IconChevronUp, IconSearch, IconSelector } from '@tabler/icons-react';
import {
  ActionIcon,
  Button,
  Center,
  Group,
  keys,
  Loader,
  ScrollArea,
  Table,
  Text,
  TextInput,
  UnstyledButton,
} from '@mantine/core';
import classes from './Orders.module.css';
import { IconEye } from '@tabler/icons-react';
import api from '../../api/api';
import { IOrder } from '../../interfaces/IOrder';

interface RowData {
  purchaseDate: Date;
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
        const dateA = new Date(a[sortBy]).getTime();
        const dateB = new Date(b[sortBy]).getTime();
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

const data = [
  {
    purchaseDate: '2025-01-01',
    movieTitle: 'The Matrix',
    ticketsQuantity: 2,
    totalPrice: 20,
  },
  {
    purchaseDate: '2025-01-02',
    movieTitle: 'Inception',
    ticketsQuantity: 2,
    totalPrice: 15,
  },
  {
    purchaseDate: '2025-01-03',
    movieTitle: 'The Dark Knight',
    ticketsQuantity: 3,
    totalPrice: 30,
  },
  {
    purchaseDate: '2025-01-04',
    movieTitle: 'Shrek',
    ticketsQuantity: 1,
    totalPrice: 45,
  }
];

export function Orders() {
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  const rows = sortedData.map((row) => (
    <Table.Tr key={row.purchaseDate}>
      <Table.Td>{row.purchaseDate}</Table.Td>
      <Table.Td>{row.movieTitle}</Table.Td>
      <Table.Td>{row.ticketsQuantity}</Table.Td>
      <Table.Td>{row.totalPrice}</Table.Td>
      <Table.Td>
        <ActionIcon>
          <IconEye style={{ width: '70%', height: '70%' }} stroke={1.5}/>
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  ));

  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.Orders.getOrders().then(res => {
      setOrders(res.data);
      setLoading(false);
    })
    
  }, [])

  if(loading) {
     return (
      <Center>
        <Loader size="lg" />
      </Center>
    );
  }

  return (
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
              <Table.Td colSpan={Object.keys(data[0]).length}>
                <Text fw={500} ta="center">
                  Nothing found
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}