import { React } from 'react';
import { Formik, Field, Form } from 'formik';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Input,
} from '@chakra-ui/react';

export default function CurrentAccount(props) {
  function validateName(value) {
    let error;
    if (!value) {
      // error = 'Name is required';
    } else if (value.toLowerCase() !== 'naruto') {
      //error = "Jeez! You're not a fan 😱";
    }
    return error;
  }

  return (
    <Formik
      initialValues={{ name: '', lastname: '' }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
    >
      {props => (
        <Form>
          <Field name="name" validate={validateName}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.name && form.touched.name}>
                <FormLabel htmlFor="name">First name</FormLabel>
                <Input {...field} id="name" placeholder="name" />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="lastname" validate={validateName}>
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors.lastname && form.touched.lastname}
              >
                <FormLabel htmlFor="lastname">Last name</FormLabel>
                <Input {...field} id="lastname" placeholder="lastname" />
                <FormErrorMessage>{form.errors.lastname}</FormErrorMessage>
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
