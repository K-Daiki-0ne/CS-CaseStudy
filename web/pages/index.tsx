import * as React from 'react';
import { Layuot } from '../components/Layout';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Home = () => {
  return (
    <Layuot>
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Case Study
        </Typography>
        <Typography variant="body1" gutterBottom>
          CaseStudyはあなたの学習をサポートします。
        </Typography>
        <Typography variant="body1" gutterBottom>
          CaseStudyを使うことであなたの行動は可視化されます。
        </Typography>

      </Box>
    </Layuot>
  );
}

export default Home;