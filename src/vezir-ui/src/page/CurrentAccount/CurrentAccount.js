import { useRef, React } from 'react';

import { Formik, Field, Form } from 'formik';
import axios from '../../Axios-VezirApi';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Input,
  useToast,
} from '@chakra-ui/react';

export default function CurrentAccount(props) {
  const toast = useToast();
  const toastIdRef = useRef();

  function addToast(description) {
    toastIdRef.current = toast({
      description,
      status: 'error',
      isClosable: true,
      duration: 5000,
      position: 'top',
    });
  }
  function validateName(value) {
    let error;
    if (!value) {
      // error = 'Name is required';
    }
    return error;
  }

  return (
    <Formik
      initialValues={{ firmName: '', description: '' }}
      onSubmit={(values, actions) => {
        axios
          .post('/api/CurrentAccount', values)
          .then(response => {
            actions.setSubmitting(false);
            console.log(response.data.id);
          })
          .catch(error => {
            addToast('Api ile ilgili problem var...');
            console.error('There was an error!', error);
          });
      }}
    >
      {props => (
        <Form>
          <Field name="firmName" validate={validateName}>
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors.firmName && form.touched.firmName}
              >
                <FormLabel htmlFor="firmName">Firm Adı</FormLabel>
                <Input {...field} id="firmName" placeholder="Firma Adı" />
                <FormErrorMessage>{form.errors.firmName}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="description" validate={validateName}>
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors.description && form.touched.description}
              >
                <FormLabel htmlFor="description">Açıklama</FormLabel>
                <Input {...field} id="description" placeholder="Açıklama" />
                <FormErrorMessage>{form.errors.description}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={props.isSubmitting}
            type="submit"
          >
            Kaydet
          </Button>
        </Form>
      )}
    </Formik>
  );
}
