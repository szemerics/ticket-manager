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
} from '@mantine/core';
import classes from './AdminRoomsList.module.css';
import { IMovie } from '../../../interfaces/IMovie';
import api from '../../../api/api';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';
import { IRoom } from '../../../interfaces/IRoom';

interface RowData {
  name: string;
  rowNumber: string;
  columnNumber: string;
  screeningCount: number;
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

interface AdminRoomsListProps {
  onRefreshRef: React.RefObject<(() => void) | null>;
}

export function AdminRoomsList( { onRefreshRef }: AdminRoomsListProps) {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState<RowData[]>([]);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [originalData, setOriginalData] = useState<RowData[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<IRoom | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  const refreshRooms = () => {
    api.Rooms.getAllRooms().then(res => {
      const formattedRooms: RowData[] = res.data.map((room: IRoom) => ({
        name: room.name,
        rowNumber: room.rowNumber.toString(),
        columnNumber: room.columnNumber.toString(),
        screeningCount: room.screenings.length
      }));
      setRooms(res.data);
      setOriginalData(formattedRooms);
      setSortedData(formattedRooms);
    });
  };

  useEffect(() => {
    refreshRooms();
  }, []);

  useEffect(() => {
    onRefreshRef.current = refreshRooms;
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
    <Table.Tr key={row.name}>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.rowNumber}</Table.Td>
      <Table.Td>{row.columnNumber}</Table.Td>
      <Table.Td>{row.screeningCount}</Table.Td>
      <Table.Td>
        <Flex gap={10}>
          <ActionIcon>
            <IconPencil onClick={() => {
              setSelectedRoom(rooms[index]);
              open();
            }} style={{ width: '70%', height: '70%' }} stroke={1.5}/>
          </ActionIcon>
          <ActionIcon color='red'>
            <IconTrash onClick={() => {
              openDeleteModal(rooms[index].id, rooms[index].name)
            }} style={{ width: '70%', height: '70%' }} stroke={1.5}/>
          </ActionIcon>
        </Flex>
      </Table.Td>
      
    </Table.Tr>
  ));

  // Form for modal
  const form = useForm({
    initialValues: {
      name: '',
    },
    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
    }
  });

  useEffect(() => {
    if (selectedRoom) {
      form.setValues({
        name: selectedRoom.name,
      });
    }
  }, [selectedRoom]);


// Delete Modal
const openDeleteModal = (id: number, name: string) => {
  modals.openConfirmModal({
    title: `Are you sure you want to delete "${name}"?`,
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
        message: 'Room deletion was cancelled.',
      }),
    onConfirm: async () => {
      try {
        await api.Rooms.deleteRoom(String(id));
        refreshRooms();
        notifications.show({
          position: 'bottom-center',
          title: 'Deleted',
          color: 'red',
          message: 'Room was successfully deleted.',
        });
      } catch (error) {
        notifications.show({
          position: 'bottom-center',
          title: 'Error',
          color: 'orange',
          message: 'Failed to delete the Room.',
        });
        console.error('Delete error:', error);
      }
    },
  });
  };


  return (
    <>
      <Modal opened={opened} onClose={close} title="Editing Room" size="lg">
        {selectedRoom && (
          <form
            onSubmit={form.onSubmit((values) => {
              const updated = {
                ...selectedRoom,
                ...values,
              };
              api.Rooms.updateRoom(selectedRoom.id.toString(), {
                name: values.name,
                rowNumber: rooms[selectedRoom.id].rowNumber,
                columnNumber: rooms[selectedRoom.id].columnNumber
              }).then(() => {
                refreshRooms();
                close();
                notifications.show({
                  title: 'Success',
                  message: 'Room was successfully updated',
                  color: 'green',
                  position: 'bottom-center'
                });
              }).catch(() => {
                notifications.show({
                  title: 'Error',
                  message: 'Failed to update Room',
                  color: 'red',
                  position: 'bottom-center'
                });
              });
            })}
          >
            <Flex gap={'md'} direction={'column'}>
              <TextInput
                label="Room Name"
                placeholder="Input Room name"
                {...form.getInputProps('name')}
                inputWrapperOrder={['label', 'error', 'input']}
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
              <Th
                sorted={sortBy === 'name'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('name')}
              >
                Name
              </Th>
              <Th
                sorted={sortBy === 'rowNumber'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('rowNumber')}
              >
                Row Count
              </Th>
              <Th
                sorted={sortBy === 'columnNumber'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('columnNumber')}
              >
                Column Count
              </Th>
              <Th
                sorted={sortBy === 'screeningCount'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('screeningCount')}
              >
                Screening Count
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