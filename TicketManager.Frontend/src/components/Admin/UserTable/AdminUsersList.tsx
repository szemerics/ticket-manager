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
import classes from './AdminUsersList.module.css';
import { IProfile } from '../../../interfaces/IProfile';
import api from '../../../api/api';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';


// interface Category {
//   id: number;
//   name: string;
// }

interface RowData {
  name: string;
  email: string;
  phone: string;
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
  if (!query) return data;
  
  return data.filter((item) =>
    item.name.toLowerCase().includes(query) ||
    item.email.toLowerCase().includes(query) ||
    item.phone.toLowerCase().includes(query)
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

interface AdminUsersListProps {
  onRefreshRef: React.RefObject<(() => void) | null>;
}

export function AdminUsersList( { onRefreshRef }: AdminUsersListProps) {
  const [users, setUsers] = useState<IProfile[]>([]);
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState<RowData[]>([]);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [originalData, setOriginalData] = useState<RowData[]>([]);
  const [selectedUser, setSelectedUser] = useState<IProfile | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  const refreshUsers = () => {
    api.Users.getAllUsers().then(res => {
      const formattedUsers: RowData[] = res.data.map((user: IProfile) => ({
        name: user.name,
        email: user.email,
        phone: user.phone
      }));
      setUsers(res.data);
      setOriginalData(formattedUsers);
      setSortedData(formattedUsers);
    });
  };

  useEffect(() => {
    refreshUsers();
    
    
  }, []);

  useEffect(() => {
    onRefreshRef.current = refreshUsers;
  }, [onRefreshRef])
  

  // const getCategoryNames = (categoryIds: number[]) => {
  //   return categoryIds.map(id => 
  //     categories.find(cat => cat.id === id)?.name || ''
  //   ).filter(name => name !== '');
  // };

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
    <Table.Tr key={row.email}>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.email}</Table.Td>
      <Table.Td>{row.phone}</Table.Td>
      <Table.Td>
        <Flex gap={10}>
          <ActionIcon>
            <IconPencil onClick={() => {
              setSelectedUser(users[index]);
              open();
            }} style={{ width: '70%', height: '70%' }} stroke={1.5}/>
          </ActionIcon>
          <ActionIcon color='red'>
            <IconTrash onClick={() => {
              openDeleteModal(users[index].id, users[index].name);
            }} style={{ width: '70%', height: '70%' }} stroke={1.5}/>
          </ActionIcon>
        </Flex>
      </Table.Td>
      
    </Table.Tr>
  ));


  // // Year data for Select component
  // const currentYear = new Date().getFullYear();
  // const startYear = 1950;

  // const yearOptions = Array.from(
  //   { length: currentYear - startYear + 1 },
  //   (_, index) => (startYear + index).toString()
  // ).reverse();


  // Form for modal
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      phone: '',
    },
    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email format'),
      phone: (value) => (/^\+?[0-9\s]+$/.test(value) ? null : 'Invalid phone number format'),
    }
  });

  useEffect(() => {
    if (selectedUser) {
      form.setValues({

        name: selectedUser.name,
        email: selectedUser.email,
        phone: selectedUser.phone,
      });
    }
  }, [selectedUser]);


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
        message: 'User deletion was cancelled.',
      }),
    onConfirm: async () => {
      try {
        await api.Users.deleteUser(String(id));
        refreshUsers();
        notifications.show({
          position: 'bottom-center',
          title: 'Deleted',
          color: 'red',
          message: 'User was successfully deleted.',
        });
      } catch (error) {
        notifications.show({
          position: 'bottom-center',
          title: 'Error',
          color: 'orange',
          message: 'Failed to delete the user.',
        });
        console.error('Delete error:', error);
      }
    },
  });
  };


  return (
    <>
      <Modal opened={opened} onClose={close} title="Editing User" size="lg">
        {selectedUser && (
          <form
            onSubmit={form.onSubmit((values) => {
              const updated = {
                ...selectedUser,
                ...values,
              };
              api.Users.updateProfile( {
                id: selectedUser.id,
                name: values.name,
                email: values.email,
                phone: values.phone,
                roles: selectedUser.roles,
              }).then(() => {
                refreshUsers();
                close();
                notifications.show({
                  title: 'Success',
                  message: 'User was successfully updated',
                  color: 'green',
                  position: 'bottom-center'
                });
              }).catch(() => {
                notifications.show({
                  title: 'Error',
                  message: 'Failed to update user',
                  color: 'red',
                  position: 'bottom-center'
                });
              });
            })}
          >
            <Flex gap={'md'} direction={'column'}>

              <TextInput
                label="Name"
                placeholder="Input user name"
                {...form.getInputProps('name')}
                inputWrapperOrder={['label', 'error', 'input']}
              />

              <TextInput
                label="Email"
                placeholder="Input user email"
                {...form.getInputProps('email')}
                inputWrapperOrder={['label', 'error', 'input']}
              />

              <TextInput
                label="Phone"
                placeholder="Input user phone"
                {...form.getInputProps('phone')}
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
                sorted={sortBy === 'email'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('email')}
              >
                Email
              </Th>
              <Table.Th>
                Phone
              </Table.Th>
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