import * as React from 'react';
import { Layuot } from '../components/Layout';
import { Header } from '../components/Header/Header'
import { Markdown } from '../components/Markdown/Markdown';
import { Paper, Box, Grid, Typography } from '@mui/material';
import { homePage } from '../markdown/homePage';

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
        <Grid container>
          <Grid item md={6}>
            <Box
              sx={{
                position: 'relative',
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
              }}
            >
              <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                aaa
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                bbb
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <Markdown>
        { homePage }
      </Markdown>
    </Layuot>
  );
}

export default Home;