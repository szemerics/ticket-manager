import { Card, Image, Text, Group, Badge, Table, Button } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import api from '../api/api.ts';
import { IMovie } from '../interfaces/IMovie.ts';
import { useNavigate } from 'react-router-dom';

const Movies = () => {
  const [items, setItems] = useState<IMovie[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.Movies.getMoives().then(res => {
      setItems(res.data);
    })
  }, [])
  

  const rows = items.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.title}</Table.Td>
      <Table.Td>{element.year}</Table.Td>
      <Table.Td>{element.lengthInMinutes}</Table.Td>
      <Table.Td>{element.minimumAge}</Table.Td>
      <Table.Td>
        <Button onClick={() => navigate(`${element.id}`)}>Edit</Button>
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