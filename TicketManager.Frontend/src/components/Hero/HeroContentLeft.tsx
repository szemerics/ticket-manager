import { Button, Container, Overlay, Text, Title } from '@mantine/core';
import classes from './HeroContentLeft.module.css';

export function HeroContentLeft() {
  return (
    <div className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container} size="md">
        <Title className={classes.title}>A Minecraft Movie</Title>
        <Text className={classes.description} size="xl" mt="xl">
          Dive into the pixelated world you love like never before! The Minecraft Movie brings your favorite game to life with epic storytelling, stunning visuals, and endless adventure. Join Steve and his friends as they battle creepers, uncover ancient secrets, and craft their destiny in a journey beyond imagination.
        </Text>

        <Button variant="gradient" gradient={{ from: '#5E78DF', to: '#2E5DCF', deg: 90 }} size="xl" radius="xl" className={classes.control}>
          Grab Tickets
        </Button>
      </Container>
    </div>
  );
}