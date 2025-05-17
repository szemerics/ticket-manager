import { Badge, Button, Flex, Group, Paper, Text, Title } from '@mantine/core';
import classes from './MovieCard.module.css';
import { Link, useNavigate } from 'react-router-dom';

interface MovieCardProps {
  id: number;
  title: string;
  categories: string[];
  year: number;
  posterUrl: string;
}

export function MovieCard({ id, title, categories, year, posterUrl }: MovieCardProps) {
  const navigate = useNavigate();

  const handleBookNow = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(`/app/movies/${id}`);
  };

  return (
    <Paper 
      shadow="md" 
      p="xl" 
      radius="md" 
      className={classes.card}
      style={{ backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)), url(${posterUrl})` }}
    >
      <Flex direction={'column'} justify={'end'} style={{ height: '100%' }}>
        <Flex direction={'column'} align={'start'} gap={5} mb={'md'}>

          <Text size="sm" color="dimmed">
            {year}
          </Text>

          <Title order={3} mt={0} className={classes.title}>
            {title}
          </Title>

          <Group gap="xs" mt={10} mb={10}>
            {categories.map((category, index) => (
              <Badge key={index} variant="outline" color="blue">
                {category}
              </Badge>
            ))}
          </Group>
        </Flex>
      
      </Flex>
      <Button variant="blue" color="dark" onClick={handleBookNow}>
        Book Now
      </Button>
    </Paper>
  );
}