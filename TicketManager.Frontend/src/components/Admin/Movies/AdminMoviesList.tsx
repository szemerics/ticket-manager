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
import classes from './AdminMoviesList.module.css';
import { IMovie } from '../../../interfaces/IMovie';
import api from '../../../api/api';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';


interface Category {
  id: number;
  name: string;
}

interface RowData {
  posterUrl: string;
  title: string;
  year: number;
  categories: number[];
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
      if (sortBy === 'year') {
        return payload.reversed ? b[sortBy] - a[sortBy] : a[sortBy] - b[sortBy];
      }

      // for string fields
      if (payload.reversed) {
        return String(b[sortBy]).localeCompare(String(a[sortBy]));
      }
      return String(a[sortBy]).localeCompare(String(b[sortBy]));
    }),
    payload.search
  );
}

interface AdminMoviesListProps {
  onRefreshRef: React.RefObject<(() => void) | null>;
}

export function AdminMoviesList( { onRefreshRef }: AdminMoviesListProps) {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState<RowData[]>([]);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [originalData, setOriginalData] = useState<RowData[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<IMovie | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  const refreshMovies = () => {
    api.Movies.getMovies().then(res => {
      const formattedMovies: RowData[] = res.data.map((movie: IMovie) => ({
        posterUrl: movie.posterUrl,
        title: movie.title,
        year: movie.year,
        categories: movie.categories
      }));
      setMovies(res.data);
      setOriginalData(formattedMovies);
      setSortedData(formattedMovies);
    });
  };

  useEffect(() => {
    refreshMovies();
    api.Movies.getCategories().then(res => {
      setCategories(res.data);
    });
  }, []);

  useEffect(() => {
    onRefreshRef.current = refreshMovies;
  }, [onRefreshRef])
  

  const getCategoryNames = (categoryIds: number[]) => {
    return categoryIds.map(id => 
      categories.find(cat => cat.id === id)?.name || ''
    ).filter(name => name !== '');
  };

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
    <Table.Tr key={row.posterUrl}>
      <Table.Td><Image src={row.posterUrl} h={75} w={50} fit='fill'/></Table.Td>
      <Table.Td>{row.title}</Table.Td>
      <Table.Td>{row.year}</Table.Td>
      <Table.Td>
        <Group gap="xs">
          {getCategoryNames(row.categories).map((category, index) => (
            <Badge key={index} variant="light" color="blue">
              {category}
            </Badge>
          ))}
        </Group>
      </Table.Td>
      <Table.Td>
        <Flex gap={10}>
          <ActionIcon>
            <IconPencil onClick={() => {
              setSelectedMovie(movies[index]);
              open();
            }} style={{ width: '70%', height: '70%' }} stroke={1.5}/>
          </ActionIcon>
          <ActionIcon color='red'>
            <IconTrash onClick={() => {
              openDeleteModal(movies[index].id, movies[index].title)
            }} style={{ width: '70%', height: '70%' }} stroke={1.5}/>
          </ActionIcon>
        </Flex>
      </Table.Td>
      
    </Table.Tr>
  ));


  // Year data for Select component
  const currentYear = new Date().getFullYear();
  const startYear = 1950;

  const yearOptions = Array.from(
    { length: currentYear - startYear + 1 },
    (_, index) => (startYear + index).toString()
  ).reverse();


  // Form for modal
  const form = useForm({
    initialValues: {
      posterUrl: '',
      title: '',
      description: '',
      year: '',
      categoryIds: [] as string[],
      lengthInMinutes: 0,
      minimumAge: 0
    },
    validate: {
      title: (value) => (value.length < 2 ? 'Title must have at least 2 letters' : null),
      description: (value) => (value.length < 10 ? 'Description must have at least 10 letters' : null),
      categoryIds: (value) => (value.length === 0 ? 'At least one category must be selected' : null),
      lengthInMinutes: (value) => (value < 1 ? 'Length in minutes must be greater than 0' : null),
      minimumAge: (value) => (value < 0 ? 'Minimum age must be greater than or equal to 0' : null),
    }
  });

  useEffect(() => {
    if (selectedMovie) {
      form.setValues({
        posterUrl: selectedMovie.posterUrl,
        title: selectedMovie.title,
        description: selectedMovie.description,
        year: selectedMovie.year.toString(),
        categoryIds: selectedMovie.categories.map(c => c.toString()),
        lengthInMinutes: selectedMovie.lengthInMinutes,
        minimumAge: selectedMovie.minimumAge
      });
    }
  }, [selectedMovie]);


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
        message: 'Movie deletion was cancelled.',
      }),
    onConfirm: async () => {
      try {
        await api.Movies.deleteMovie(String(id));
        refreshMovies();
        notifications.show({
          position: 'bottom-center',
          title: 'Deleted',
          color: 'red',
          message: 'Movie was successfully deleted.',
        });
      } catch (error) {
        notifications.show({
          position: 'bottom-center',
          title: 'Error',
          color: 'orange',
          message: 'Failed to delete the movie.',
        });
        console.error('Delete error:', error);
      }
    },
  });
  };


  return (
    <>
      <Modal opened={opened} onClose={close} title="Editing Movie" size="lg">
        {selectedMovie && (
          <form
            onSubmit={form.onSubmit((values) => {
              const updated = {
                ...selectedMovie,
                ...values,
                year: Number(values.year),
              };
              api.Movies.updateMovie(selectedMovie.id.toString(), {
                posterUrl: values.posterUrl,
                title: values.title,
                year: Number(values.year),
                description: values.description,
                lengthInMinutes: values.lengthInMinutes,
                minimumAge: values.minimumAge,
                categories: values.categoryIds.map(c => parseInt(c))
              }).then(() => {
                refreshMovies();
                close();
                notifications.show({
                  title: 'Success',
                  message: 'Movie was successfully updated',
                  color: 'green',
                  position: 'bottom-center'
                });
              }).catch(() => {
                notifications.show({
                  title: 'Error',
                  message: 'Failed to update movie',
                  color: 'red',
                  position: 'bottom-center'
                });
              });
            })}
          >
            <Flex gap={'md'} direction={'column'}>
              <TextInput
                label="Poster URL"
                placeholder="Input movie poster URL"
                {...form.getInputProps('posterUrl')}
                inputWrapperOrder={['label', 'error', 'input']}
              />

              <TextInput
                label="Title"
                placeholder="Input movie title"
                {...form.getInputProps('title')}
                inputWrapperOrder={['label', 'error', 'input']}
              />

              <Textarea
                label="Description"
                placeholder="Input movie description"
                {...form.getInputProps('description')}
              />

              <Select
                label="Year"
                placeholder="Pick movie year"
                data={yearOptions}
                searchable
                {...form.getInputProps('year')}
              />

              <NumberInput
                label="Length in Minutes"
                placeholder="Input movie length"
                min={0}
                {...form.getInputProps('lengthInMinutes')}
              />

              <NumberInput
                label="Minimum Age"
                placeholder="Input minimum age"
                min={0}
                {...form.getInputProps('minimumAge')}
              />

              <MultiSelect
                label="Movie Categories"
                placeholder="Pick multiple categories"
                data={categories.map(c => ({
                  label: c.name,
                  value: c.id.toString()
                }))}
                searchable
                key= {form.key('categoryIds')}
                {...form.getInputProps('categoryIds')}
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
                sorted={sortBy === 'year'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('year')}
              >
                Year
              </Th>
              <Table.Th>
                Categories
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
                <Table.Td colSpan={5}>
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