import { useEffect, useState } from 'react';
import { IconChevronDown, IconChevronUp, IconSearch, IconSelector, IconPencil } from '@tabler/icons-react';
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
  Input,
  Button,
  Flex,
  MultiSelect,
} from '@mantine/core';
import classes from './AdminMoviesList.module.css';
import { IMovie } from '../../../interfaces/IMovie';
import api from '../../../api/api';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';


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

export function AdminMoviesList() {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState<RowData[]>([]);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [originalData, setOriginalData] = useState<RowData[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<IMovie | null>(null);
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
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

    api.Movies.getCategories().then(res => {
      setCategories(res.data);
    });
  }, []);

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
        <ActionIcon>
          <IconPencil onClick={() => {
            setSelectedMovie(movies[index]);
            open();
          }} style={{ width: '70%', height: '70%' }} stroke={1.5}/>
        </ActionIcon>
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

  const form = useForm({
  initialValues: {
    posterUrl: '',
    title: '',
    description: '',
    year: '',
    categoryIds: [] as string[],
  },
  });

  useEffect(() => {
    if (selectedMovie) {
      form.setValues({
        posterUrl: selectedMovie.posterUrl,
        title: selectedMovie.title,
        description: selectedMovie.description,
        year: selectedMovie.year.toString(),
        categoryIds: selectedMovie.categories.map(c => c.toString()),
      });
    }
  }, [selectedMovie]);



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
              console.log('Saving movie:', updated);
              // dispatch update here, or call API
              close();
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