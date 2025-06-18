import {
  Button,
  Flex,
  Group,
  Modal,
  MultiSelect,
  NumberInput,
  Select,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconPlus } from '@tabler/icons-react';
import api from '../../api/api';
import { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';

interface Category {
  id: number;
  name: string;
}

interface CreateMovieModalProps {
  onMovieCreated?: () => void;
}

const CreateMovieModal = ({ onMovieCreated }: CreateMovieModalProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    api.Movies.getCategories().then(res => {
      setCategories(res.data);
    });
  }, []);


  // Year data for Select component
  const currentYear = new Date().getFullYear();
  const startYear = 1900;
  
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



  return (
    <>
      <Modal opened={opened} onClose={close} title="Adding New Movie" size="lg">
        {(
          <form
            onSubmit={form.onSubmit((values) => {
              api.Movies.createMovie({
                posterUrl: values.posterUrl,
                title: values.title,
                year: Number(values.year),
                description: values.description,
                lengthInMinutes: values.lengthInMinutes,
                minimumAge: values.minimumAge,
                categories: values.categoryIds.map(c => parseInt(c))
              }).then(() => {
                close();
                onMovieCreated?.();
              })
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


      <Button onClick={open} mb={10} leftSection={<IconPlus size={16} />}>Add New movie</Button>
    </>
  )
}

export default CreateMovieModal