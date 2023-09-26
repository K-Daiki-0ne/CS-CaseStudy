import * as React from 'react';
import { Layout, Header, Markdown } from '../components';
import { Paper, CardMedia } from '@mui/material';
import { homePage } from '../markdown/homePage';

const Home = () => {
  return (
    <Layout>
      <Header title='CaseStudy' page='home' />
      <Paper 
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          marginTop: 10,
          color: '#fff',
          mb: 3,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        <CardMedia 
          component="img"
          image="https://github.com/K-Daiki-0ne/CS-CaseStudy/assets/51228144/7006f0fb-f91e-46d6-9a8b-c5cf107a2407"
          alt='casestudy'
        />
      </Paper>
      <Markdown>
        { homePage }
      </Markdown>
    </Layout>
  );
}

export default Home;