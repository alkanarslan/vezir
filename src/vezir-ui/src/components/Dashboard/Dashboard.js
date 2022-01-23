import React from 'react';
import { Grid, GridItem } from '@chakra-ui/react';

export default function Dashboard() {
  return (
    <Grid
      h="100vh"
      templateRows="repeat(1, 1fr)"
      templateColumns="repeat(2, 1fr)"
      gap={4}
    >
      <GridItem rowSpan={1} colSpan={1} bg="tomato" />
      <GridItem colSpan={1} bg="red" />
    </Grid>
  );
}
