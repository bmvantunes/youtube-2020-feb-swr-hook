import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import React from 'react';
import useSWR, { mutate, trigger } from 'swr';
import { AddComment } from './AddComment';

export function Home({commentsFromServer } :any) {
  const {data} = useSWR('/comments', { initialData: commentsFromServer});
  
  return (
    <React.Fragment>
      <Box marginBottom={2}>
        <AddComment />
      </Box>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Comment</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map(row => (
              <TableRow key={row.comment}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.comment}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={async () => {
                      const deleteUrl = '/comments/'+row.id;
                      const url = '/comments';
                      mutate(url, data.filter(c => c.id !== row.id), false);
                      await axios.delete(deleteUrl);
                      trigger(url);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}


Home.getInitialProps = async ctx => {
  const res = await axios('/comments')
  const json = res.data
  return { commentsFromServer: json }
}