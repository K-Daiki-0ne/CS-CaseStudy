import { useState, FormEvent } from 'react';
import { NextPage } from 'next';
import { useMutation } from '@apollo/client';
import { CreateUserMutation } from '../generated/graphql';
import { CREATE_USER } from '../graphql/graphql';
import { validateForm } from '../utils/validateForm';
import { Layout, Header } from '../components';
import { Box, Typography, TextField, Link, Alert } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

const Register: NextPage = () => {
  const [email, setEmail] = useState({ email: '', error: false, label: 'email' });
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  
  const [create] = useMutation<CreateUserMutation>(CREATE_USER);
  
  const handleSubmitCreate = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setEmail({ ...email, error: false, label: 'email' });
    const validateError = validateForm(email.email, 'register');
    if (validateError != null) {
      setEmail({ ...email, error: true, label: validateError.message });
      return;
    }

    setLoading(true);

    try {
      const { data } = await create({ variables: { email: email.email } });
      if (!data?.createUser) {
        setLoading(false);
        setEmail({ ...email, error: true, label: 'すでに登録されているメールアドレスです'})
        return;
      }

      setLoading(false);
      setIsSuccess(true);
    } catch (e) {
      console.error(e);
      alert('予期せぬエラーが発生しました。サポート窓口にご連絡ください。')
    }
    return;
  }

  return (
    <Layout>
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
        {
          isSuccess ? (
            <Alert severity='success' sx={{ width: '35%', mt: 4 }}>
              認証メールを送信しました
            </Alert>
          ) : undefined
        }
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
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 1 }}
            disabled={loading}
            loading={loading}
          >
            認証メールを送信する
          </LoadingButton>
          <Typography sx={{ mt: 2, mb: 1 }}>
            アカウントをお持ちですか？
            <Link href='/login'>ログインする</Link>
          </Typography>
        </Box>
      </Box>
    </Layout>
  )
};

export default Register;