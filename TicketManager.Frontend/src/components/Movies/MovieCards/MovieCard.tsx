import { Badge, Button, Group, Paper, Text, Title } from '@mantine/core';
import classes from './MovieCard.module.css';

interface MovieCardProps {
  title: string;
  categories: string[];
  desciription: string;
}

export function MovieCard({ title, categories, desciription }: MovieCardProps) {
  return (
    <Paper shadow="md" p="xl" radius="md" className={classes.card}>
      <div>
        <Group gap="xs" mb="xs">
          {categories.map((category, index) => (
            <Badge key={index} variant="light" color="blue">
              {category}
            </Badge>
          ))}
        </Group>
        <Title order={3} className={classes.title}>
          {title}
        </Title>
        <Text size="sm" color="dimmed" mt="xs">
          {desciription}
        </Text>
      </div>
      <Button variant="white" color="dark">
        Book Tickets
      </Button>
    </Paper>
  );
}