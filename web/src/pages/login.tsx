import { useState, MouseEvent } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
  Box,
  Typography,
  TextField,
  Grid,
  Link,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useLazyQuery } from '@apollo/client';
import { Layuot } from '../components/Layout';
import { Header } from '../components/Header/Header';
import { LoginQuery } from '../generated/graphql';
import { LOGIN_USER } from '../graphql/queries';
import { validateForm } from '../utils/validateForm';

const Login: NextPage = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const [formError, setFormError] = useState({ email: false, password: false });
  const [formLabel, setFormLabel] = useState({ email: 'email', password: 'password' });

  const router = useRouter();

  const [login, { loading }] = useLazyQuery<LoginQuery>(LOGIN_USER, {
    variables: {
      email: user.email,
      password: user.password
    }
  });

  const onClickLogin = async (e: any): Promise<void> => {
    e.preventDefault();

    setFormError({ email: false, password: false });
    setFormLabel({ email: 'email', password: 'password' });

    const validateError = validateForm(user.email, user.password, 'login');
    //入力内容に誤りがあった場合はエラーとして、後続処理は実施しない。
    if (validateError != null) {
      if (validateError.field == 'email') {
        setFormError({ email: true, password: false });
        setFormLabel({ email: validateError.message, password: 'password' });
      } else {
        setFormError({ email: false, password: true });
        setFormLabel({ email: 'email', password: validateError.message });
      }
      return;
    }


    try {
      const {data, error} = await login();

      if (error) {
        console.error('GraphQL featch error => ', error);
        router.push('/');
      };

      // データがエラーの場合はエラー内容を表示する
      if (data?.login.errors) {
        if (data?.login.errors[0].field == 'email') {
          setFormError({ ...formError, email: true });
          setFormLabel({ ...formLabel, email: data?.login.errors[0].message });  
        } else {
          setFormError({ ...formError, password: true });
          setFormLabel({ ...formLabel, password: data?.login.errors[0].message });  
        }
      };

      router.push(`/main/${data?.login.user?.userId}`);

    } catch (e) {
      console.error('error', e);
      router.push('/');
    }
  }

  return (
    <Layuot>
      <Header title='CaseStudy' page='login' />
      <Box
        sx={{
          marginTop: 30,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>ログイン</Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={onClickLogin}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={formLabel.email}
            name="email"
            autoComplete="email"
            error={formError.email}
            value={user.email}
            onChange={(e: any) => {
              setUser({ ...user, email: e.target.value })
            }}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={formLabel.password}
            type="password"
            id="password"
            error={formError.password}
            value={user.password}
            onChange={(e: any) => {
              setUser({ ...user, password: e.target.value })
            }}
            autoComplete="current-password"
          />
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
            loading={loading}
          >
            ログイン
          </LoadingButton>
          <Grid container>
            <Grid item xs>
              <Link href="/forgot-passwrod" variant="body2">
                パスワードをお忘れですか?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                新規登録
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Layuot>
  )
};


export default Login;