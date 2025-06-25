import React, { useEffect, useState } from 'react';
import { IconChevronDown, IconChevronUp, IconSearch, IconSelector, IconPencil, IconTrash } from '@tabler/icons-react';
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
import { DateTimePicker } from '@mantine/dates';
import classes from './AdminScreeningsList.module.css';
import { IScreening } from '../../../interfaces/IScreening';
import api from '../../../api/api';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';
import { IMovie } from '../../../interfaces/IMovie';
import { IRoom } from '../../../interfaces/IRoom';

interface Room {
  id: number;
  name: string;
}

interface RowData {
  id: number;
  screeningId: number;
  posterUrl: string;
  title: string;
  screeningTime: string;
  screeningPrice: number;
  seats: string; // for example 25/50
  room: string;
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
    keys(data[0]).some((key) => {
      // Skip the id and screeningId fields from search
      if (key === 'id' || key === 'screeningId') return false;
      return item[key].toString().toLowerCase().includes(query);
    })
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

interface AdminScreeningsListProps {
  onRefreshRef: React.RefObject<(() => void) | null>;
}

export function AdminScreeningsList( { onRefreshRef }: AdminScreeningsListProps) {
  const [screenings, setScreenings] = useState<IScreening[]>([]);
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState<RowData[]>([]);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [originalData, setOriginalData] = useState<RowData[]>([]);
  const [selectedScreening, setSelectedScreening] = useState<IScreening | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  const refreshScreenings = () => {
    api.Screenings.getAllScreenings().then(res => {
      const formattedScreenings: RowData[] = res.data.map((screening: IScreening) => ({
        id: screening.id,
        screeningId: screening.id,
        posterUrl: screening.movie.posterUrl,
        title: screening.movie.title,
        screeningTime: new Date(screening.screeningTime).toLocaleString(),
        screeningPrice: screening.screeningPrice,
        // "Reserved seat[].length / all seat[].length"
        seats: `${screening.seats.filter(seat => seat.isReserved).length}/${screening.seats.length}`,
        // seats: screening.seats.length.toString()
        room: screening.roomName
      }));
      setScreenings(res.data);
      setOriginalData(formattedScreenings);
      setSortedData(formattedScreenings);
    });
  };

  useEffect(() => {
    refreshScreenings();
    // Fetch movies and rooms for the form
    api.Movies.getMovies().then(res => {
      setMovies(res.data);
    });

    api.Rooms.getAllRooms().then(res => {
      setRooms(res.data)
    });
  }, []);

  useEffect(() => {
    onRefreshRef.current = refreshScreenings;
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

  const rows = sortedData.map((row, index) => {
    // Find the screening by its ID for reliable mapping
    const screening = screenings.find(s => s.id === row.screeningId);
    
    return (
      <Table.Tr key={`${row.id}-${index}`}>
        <Table.Td><Image src={row.posterUrl} h={75} w={50} fit='fill'/></Table.Td>
        <Table.Td>{row.title}</Table.Td>
        <Table.Td>{row.screeningTime}</Table.Td>
        <Table.Td>
          <NumberFormatter suffix=" Ft" value={row.screeningPrice} thousandSeparator=" " />
        </Table.Td>
        <Table.Td>{row.seats}</Table.Td>
        <Table.Td>{row.room}</Table.Td>
        <Table.Td>
          <Flex gap={10}>
            <ActionIcon>
              <IconPencil onClick={() => {
                if (screening) {
                  setSelectedScreening(screening);
                  open();
                }
              }} style={{ width: '70%', height: '70%' }} stroke={1.5}/>
            </ActionIcon>
            <ActionIcon color='red'>
              <IconTrash onClick={() => {
                if (screening) {
                  openDeleteModal(screening.id, screening.movie.title)
                }
              }} style={{ width: '70%', height: '70%' }} stroke={1.5}/>
            </ActionIcon>
          </Flex>
        </Table.Td>
      </Table.Tr>
    );
  });


  // Form for modal
  const form = useForm({
    initialValues: {
      movieId: '',
      screeningTime: null as Date | null,
      screeningPrice: 0,
      roomId: ''
    },
    validate: {
      screeningPrice: (value) => (value < 0 ? 'Price must be greater than or equal to 0' : null),
      screeningTime: (value) => (!value ? 'Screening time is required' : null),
      movieId: (value) => (!value ? 'Movie is required' : null),
      roomId: (value) => (!value ? 'Room is required' : null),
    }
  });

  useEffect(() => {
    if (selectedScreening) {
      form.setValues({
        movieId: selectedScreening.movieId.toString(),
        screeningTime: selectedScreening.screeningTime && typeof selectedScreening.screeningTime === 'string'
          ? new Date(selectedScreening.screeningTime)
          : (typeof selectedScreening.screeningTime === 'object' && selectedScreening.screeningTime !== null ? selectedScreening.screeningTime : null),
        screeningPrice: selectedScreening.screeningPrice,
        roomId: selectedScreening.roomId.toString()
      });
    }
  }, [selectedScreening]);


// Delete Modal
const openDeleteModal = (id: number, title: string) => {
  modals.openConfirmModal({
    title: `Are you sure you want to delete the screening of "${title}"?`,
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
        message: 'Screening deletion was cancelled.',
      }),
    onConfirm: async () => {
      try {
        await api.Screenings.deleteScreening(String(id));
        refreshScreenings();
        notifications.show({
          position: 'bottom-center',
          title: 'Deleted',
          color: 'red',
          message: 'Screening was successfully deleted.',
        });
      } catch (error) {
        notifications.show({
          position: 'bottom-center',
          title: 'Error',
          color: 'orange',
          message: 'Failed to delete the screening.',
        });
        console.error('Delete error:', error);
      }
    },
  });
  };


  return (
    <>
      <Modal opened={opened} onClose={close} title="Editing Screening" size="lg">
        {selectedScreening && (
          <form
            onSubmit={form.onSubmit((values) => {
              let screeningTime: Date | null = null;
              if (values.screeningTime instanceof Date) {
                screeningTime = values.screeningTime;
              } else if (typeof values.screeningTime === 'string' && values.screeningTime) {
                screeningTime = new Date(values.screeningTime);
              }
              const pad = (n: number) => n.toString().padStart(2, '0');
              const localString = screeningTime
                ? `${screeningTime.getFullYear()}-${pad(screeningTime.getMonth() + 1)}-${pad(screeningTime.getDate())}T${pad(screeningTime.getHours())}:${pad(screeningTime.getMinutes())}:00`
                : '';
              api.Screenings.updateScreening(selectedScreening.id.toString(), {
                movieId: parseInt(values.movieId),
                screeningTime: localString,
                screeningPrice: values.screeningPrice,
                roomId: parseInt(values.roomId)
              }).then(() => {
                refreshScreenings();
                close();
                notifications.show({
                  title: 'Success',
                  message: 'Screening was successfully updated',
                  color: 'green',
                  position: 'bottom-center'
                });
              }).catch(() => {
                notifications.show({
                  title: 'Error',
                  message: 'Failed to update screening',
                  color: 'red',
                  position: 'bottom-center'
                });
              });
            })}
          >
            <Flex gap={'md'} direction={'column'}>
              <Select
                label="Movie"
                placeholder="Select a movie"
                data={movies.map(movie => ({
                  label: movie.title,
                  value: movie.id.toString()
                }))}
                searchable
                {...form.getInputProps('movieId')}
              />

              <DateTimePicker
                label="Screening Time"
                placeholder="Pick date and time"
                value={
                  form.values.screeningTime && typeof form.values.screeningTime === 'string'
                    ? new Date(form.values.screeningTime)
                    : (typeof form.values.screeningTime === 'object' && form.values.screeningTime !== null ? form.values.screeningTime : null)
                }
                onChange={(date) => form.setFieldValue('screeningTime', date)}
                style={{ width: '100%' }}
                required
                clearable={false}
              />

              <NumberInput
                label="Price"
                placeholder="Input screening price"
                min={0}
                {...form.getInputProps('screeningPrice')}
              />

              <Select
                label="Room"
                placeholder="Select a room"
                data={rooms.map(room => ({
                  label: room.name,
                  value: room.id.toString()
                }))}
                searchable
                {...form.getInputProps('roomId')}
              />
            </Flex>

            <Group justify="flex-end" mt="md">
              <Button variant="default" onClick={close}>Cancel</Button>
              <Button type="submit">Save</Button>
            </Group>
          </form>
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
              <Table.Th w={100}>
                Poster
              </Table.Th>
              <Th
                sorted={sortBy === 'title'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('title')}
              >
                Title
              </Th>
              <Th
                sorted={sortBy === 'screeningTime'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('screeningTime')}
              >
                Date
              </Th>
              <Th
                sorted={sortBy === 'screeningPrice'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('screeningPrice')}
              >
                Price
              </Th>
              <Th
                sorted={sortBy === 'seats'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('seats')}
              >
                Seats
              </Th>
              <Th
                sorted={sortBy === 'room'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('room')}
              >
                Room
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
                <Table.Td colSpan={7}>
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