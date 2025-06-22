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
import api from '../../../api/api.ts';
import { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IRoom } from '../../../interfaces/IRoom.ts';
import { IMovie } from '../../../interfaces/IMovie.ts';
import React from 'react';

interface Room {
  id: number;
  name: string;
}

interface CreateScreeningModalProps {
  onScreeningCreated?: () => void;
}

const CreateScreeningModal = ({ onScreeningCreated: onScreeningCreated }: CreateScreeningModalProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [movies, setMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    api.Rooms.getAllRooms().then(res => {
      setRooms(res.data);
    });
    api.Movies.getMovies().then(res => {
      setMovies(res.data);
    })
  }, []);
  
  const form = useForm({
    initialValues: {
      movieId: '',
      screeningTime: '',
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



  return (
    <>
      <Modal opened={opened} onClose={close} title="Adding New Movie" size="lg">
        {(
          <form
            onSubmit={form.onSubmit((values) => {
              api.Screenings.createScreening({
                movieId: parseInt(values.movieId),
                screeningTime: values.screeningTime,
                screeningPrice: values.screeningPrice,
                roomId: parseInt(values.roomId)
              }).then(() => {
                onScreeningCreated?.();
                close();
                 notifications.show({
                  title: 'Success',
                  message: 'Screening was successfully created',
                  color: 'green',
                  position: 'bottom-center'
                });
              }).catch(() => {
                notifications.show({
                  title: 'Error',
                  message: 'Failed to create screening',
                  color: 'red',
                  position: 'bottom-center'
                });
              });
            })}
          >
            <Flex gap={'md'} direction={'column'}>
              <Select
                label="Movie"
                placeholder='Select a movie'
                data={movies.map(movie => ({
                  label: movie.title,
                  value: movie.id.toString()
                }))}
                searchable
                {...form.getInputProps('movieId')}
              />

              <TextInput
                label="Screening Time"
                placeholder="YYYY-MM-DDTHH:mm:ss (e.g., 2025-04-22T18:00:00)"
                {...form.getInputProps('screeningTime')}
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


      <Button onClick={open} mb={10} leftSection={<IconPlus size={16} />}>Add New Screening</Button>
    </>
  )
}

export default CreateScreeningModal