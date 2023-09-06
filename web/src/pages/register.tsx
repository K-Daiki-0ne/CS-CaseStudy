import { NextPage } from 'next';
import { Layuot } from '../components/Layout';
import { Box, Typography, TextField, Button, Link } from '@mui/material';

const Register: NextPage = () => {
  return (
    <Layuot>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
          新規会員登録
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3}}>
          <TextField
            margin='normal'
            autoComplete="given-name"
            name="email"
            required
            fullWidth
            id="email"
            label="メールアドレス"
            autoFocus
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