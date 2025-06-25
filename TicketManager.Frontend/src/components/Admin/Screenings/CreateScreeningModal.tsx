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
import { DateTimePicker } from '@mantine/dates';

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
    api.Rooms.getAllRooms().then(res => {
      setRooms(res.data);
    });
    api.Movies.getMovies().then(res => {
      setMovies(res.data);
    })
  }, []);
  
  useEffect(() => {
    if (form.values.screeningTime && typeof form.values.screeningTime === 'string') {
      form.setFieldValue('screeningTime', new Date(form.values.screeningTime));
    }
  }, [form.values.screeningTime]);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Adding New Movie" size="lg">
        {(
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
              api.Screenings.createScreening({
                movieId: parseInt(values.movieId),
                screeningTime: localString,
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

              <DateTimePicker
                label="Screening Time"
                placeholder="Pick date and time"
                value={form.values.screeningTime ?? null}
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


      <Button onClick={open} mb={10} leftSection={<IconPlus size={16} />}>Add New Screening</Button>
    </>
  )
}

export default CreateScreeningModal