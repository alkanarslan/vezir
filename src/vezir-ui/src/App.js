import React from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
  Stack,
  Button,
  Flex,
  Image,
} from '@chakra-ui/react';
import { AtSignIcon, LockIcon } from '@chakra-ui/icons';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import VezirLogo from './images/vezir-logo.svg';

function App() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <ChakraProvider theme={theme}>
        <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh" p={1}>
            <ColorModeSwitcher justifySelf="flex-end" />

            <Stack spacing={4}>
              <Image
                src={VezirLogo}
                alt="Vezir Logo"
                fill="white"
                stroke="#0066ff"
              />
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<AtSignIcon color="gray.300" />}
                />
                <Input type="email" placeholder="Mail Adresi" />
              </InputGroup>

              <InputGroup size="md">
                <InputLeftElement
                  pointerEvents="none"
                  children={<LockIcon color="gray.300" />}
                />
                <Input
                  pr="4.5rem"
                  type={show ? 'text' : 'password'}
                  placeholder="Şifre"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? 'Gizle' : 'Göster'}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Button loadingText="Giriş Yapılıyor" variant="solid">
                Giriş Yap
              </Button>
            </Stack>
          </Grid>
        </Box>
      </ChakraProvider>
    </Flex>
  );
}

export default App;
