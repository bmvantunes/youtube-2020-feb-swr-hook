import { Box, Button, FormGroup, TextField } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import React from 'react';

export function AddComment() {
  return (
    <Formik
      initialValues={{ comment: '' }}
      onSubmit={(values, formikHelpers) => {
        formikHelpers.resetForm();
        alert(`Yes! Comment "${values.comment}" added!`);
      }}
    >
      <Form>
        <FormGroup>
          <Field autoComplete="off" as={TextField} name="comment" label="Comment" />
        </FormGroup>

        <Box marginTop={1}>
          <Button type="submit" variant="contained" color="primary">
            Add Comment
          </Button>
        </Box>
      </Form>
    </Formik>
  );
}
