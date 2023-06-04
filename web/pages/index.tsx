import * as React from 'react';
import { Layuot } from '../components/Layout';
import { Header } from '../components/Header/Header'
import { Paper, Box } from '@mui/material'


const Home = () => {
  return (
    <Layuot>
      <Header title='CaseStudy' />
      <Paper 
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.3)',
          }}
        />
      </Paper>
    </Layuot>
  );
}

export default Home;