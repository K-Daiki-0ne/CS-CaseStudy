import { NextPage } from 'next';
import { useState } from 'react';
import {
  Box,
  Typography,
  Alert,
  TextField,
  Button,
  IconButton
} from '@mui/material';
import { Layuot } from '../components/Layout';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const SuccessSendMail =(): JSX.Element => {
  return <Alert severity="success">mailが送信されました</Alert>
}

const ForgotPassword: NextPage = () => {
  const [sendEmail, setSendEmail] = useState<boolean>(false)

  return (
    <Layuot>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: 'auto',
        }}
      >
        <ErrorOutlineIcon 
          sx={{
            color: 'primary.main',
            width: '15%',
            height: '15%'
          }}
        />
        <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', mt: 1, mb: 1 }}>
          パスワード再設定
        </Typography>
        <Typography component='p' sx={{ mt: 1, mb: 1 }}>
          ご入力いただいたメールアドレスに、パスワード再設定用のリンクをおくります。
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 , alignItems: 'center'}}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="メールアドレス"
            name="email"
            autoComplete="email"
            inputProps={{ maxLength: 50, pattern: "^[a-zA-Z0-9_]+$" }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 1 }}
          >
            Sign Up
          </Button>
          {/* <IconButton>
            <ArrowBackIosIcon />

          </IconButton> */}
          <Button
            variant="text"
            color='inherit'
            fullWidth
            sx={{ mt:1, mb: 1 }}
          >
            <ArrowBackIosIcon />
            <Typography>
              Loginに戻る
            </Typography>
          </Button>
        </Box>
      </Box>
    </Layuot>
  )
};

export default ForgotPassword;