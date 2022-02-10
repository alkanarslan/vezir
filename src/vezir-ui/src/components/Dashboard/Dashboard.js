import React from 'react';
import { Stack, Button, useToast } from '@chakra-ui/react';
import { EmailIcon, ArrowForwardIcon } from '@chakra-ui/icons';

export default function Dashboard() {
  const toast = useToast();
  function yallah() {
    fetch('http://localhost:8080/?site=edevlet&username=14402775&pass=202020');
  }
  return (
    <Stack direction="row" spacing={4}>
      <Button leftIcon={<EmailIcon />} colorScheme="teal" variant="solid">
        Tolga ya gir
      </Button>
      <Button
        onClick={yallah}
        rightIcon={<ArrowForwardIcon />}
        colorScheme="teal"
        variant="outline"
      >
        Alkan a gir :)
      </Button>
    </Stack>
  );
}
