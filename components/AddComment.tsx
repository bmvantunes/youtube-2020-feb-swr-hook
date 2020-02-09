import { Box, Button, FormGroup, TextField } from '@material-ui/core';
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import useSWR, { mutate, trigger } from 'swr';

export function AddComment() {
  const {data} = useSWR('/comments');

  return (
    <div>
      NumberOfComments: {data?.length}
    
    <Formik
      initialValues={{ comment: '' }}
      onSubmit={async(values, formikHelpers) => {
        mutate('/comments', [...data, values], false)
        await axios.post('/comments', values);
        trigger('/comments');
        formikHelpers.resetForm();
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
    </div>
  );
}
