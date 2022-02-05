import React from 'react';
import { Stack, Button } from '@chakra-ui/react';
import { EmailIcon, ArrowForwardIcon } from '@chakra-ui/icons';

export default function Dashboard() {
  function sayHello() {
    fetch(
      'http://localhost:8080/?site=edevlet&username=22300398670&pass=aa180519'
    );
  }
  return (
    <Stack direction="row" spacing={4}>
      <Button leftIcon={<EmailIcon />} colorScheme="teal" variant="solid">
        Tolga ya gir
      </Button>
      <Button
        onClick={sayHello}
        rightIcon={<ArrowForwardIcon />}
        colorScheme="teal"
        variant="outline"
      >
        Alkan a gir :)
      </Button>
    </Stack>
  );
}
