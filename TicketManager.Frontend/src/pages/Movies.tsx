import { Card, Text, Table, Button, Flex, ActionIcon  } from '@mantine/core'
import { useEffect, useState } from 'react'
import api from '../api/api.ts';
import { IMovie } from '../interfaces/IMovie.ts';
import { useNavigate } from 'react-router-dom';
import { modals } from '@mantine/modals';
import {IconTrash, IconPencil} from "@tabler/icons-react";
import { notifications } from '@mantine/notifications';

const Movies = () => {
  const [items, setItems] = useState<IMovie[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.Movies.getMovies().then(res => {
      setItems(res.data);
    })
  }, [])
  
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
        setItems(prev => prev.filter(movie => movie.id !== id));
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


  const rows = items.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.title}</Table.Td>
      <Table.Td>{element.year}</Table.Td>
      <Table.Td>{element.lengthInMinutes}</Table.Td>
      <Table.Td>{element.minimumAge}</Table.Td>
      <Table.Td>
        <Flex direction={"row"} gap={10}>
          <ActionIcon onClick={() => navigate(`${element.id}`)}>
              <IconPencil style={{ width: '70%', height: '70%' }} stroke={1.5}/>
          </ActionIcon>
          <ActionIcon onClick={() => openDeleteModal(element.id, element.title)} color="red">
            <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5}/>
          </ActionIcon>
        </Flex>
      </Table.Td>
    </Table.Tr>
  ));

  


  return (
    <>
      <Card mb={20}>
        <Button onClick={() => navigate('create')}>
          Add new Movie
        </Button>
      </Card>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Movie Title</Table.Th>
                  <Table.Th>Release Year</Table.Th>
                  <Table.Th>Length in Minutes</Table.Th>
                  <Table.Th>Minimum Age</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
      </Card>
    </>
  )
}

export default Movies