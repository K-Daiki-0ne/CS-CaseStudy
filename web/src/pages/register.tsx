import { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
// import {  } from '../generated/graphql';

import { Layuot } from '../components/Layout';
import { Header } from '../components/Header/Header';
import { Box, Typography, TextField, Button, Link } from '@mui/material';

const Register: NextPage = () => {
  const [email, setEmail] = useState({ email: '', error: false, label: 'email' });
  
  // const [create] = 
  
  const handleSubmitCreate = (e: any) => {
    e.preventDefault();
    return;
  }

  return (
    <Layuot>
      <Header title='CaseStudy' page='register' />
      <Box
        sx={{
          marginTop: 30,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
          新規会員登録
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3}} onSubmit={handleSubmitCreate}>
          <TextField
            margin='normal'
            autoComplete="given-name"
            name="email"
            required
            fullWidth
            id="email"
            label={email.label}
            autoFocus
            value={email.email}
            onChange={(e: any) => {
              setEmail({ ...email, email: e.target.value })
            }}
            error={email.error}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 1 }}
          >
            認証メールを送信する
          </Button>
          <Typography sx={{ mt: 2, mb: 1 }}>
            アカウントをお持ちですか？
            <Link href='/login'>ログインする</Link>
          </Typography>
        </Box>
      </Box>
    </Layuot>
  )
};

export default Register;