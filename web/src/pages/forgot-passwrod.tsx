import { FormEvent } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router'
import { useState } from 'react';
import {
  Box,
  Typography,
  Alert,
  TextField,
  Button,
} from '@mui/material';
import { Layuot } from '../components';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useMutation } from '@apollo/client';
import { ChangePasswordMutation } from '../generated/graphql';
import { CHANGE_PASSWORD } from '../graphql/graphql';
import { validateForm } from '../utils/validateForm';

const ForgotPassword: NextPage = () => {
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState({ error: false, label: 'メールアドレス' })
  const [sendEmail, setSendEmail] = useState<boolean>(false);
  const router = useRouter();

  const [changePassword] = useMutation<ChangePasswordMutation>(CHANGE_PASSWORD);

  const handleSubmitEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEmailError({ error: false, label: 'メールアドレス' });

    const validateError = validateForm(email, 'change-password');
    if (validateError != null) {
      setEmailError({ ...emailError, error: true, label: validateError.message });
      return;
    }

    const { data } = await changePassword({
      variables: {
        email: email
      }
    })

    if (!data?.changePassword) {
      setEmailError({ ...emailError, error: true, label: 'CaseStudyに登録されていないメールアドレスです' })
      return;
    }
  
    setSendEmail(true);
  }

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
        {
          sendEmail
            ? <Alert severity="success" sx={{ mt: 1, width: '35%' }}>mailが送信されました</Alert> 
            : undefined
        }
        <Box component="form" noValidate sx={{ mt: 1 , alignItems: 'center'}} onSubmit={handleSubmitEmail}>
          <TextField
            margin="normal"
            required
            fullWidth
            type='email'
            id="email"
            label={emailError.label}
            error={emailError.error}
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            inputProps={{ maxLength: 50, pattern: "^[a-zA-Z0-9_]+$" }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 1 }}
          >
            送信
          </Button>
          <Button
            variant="text"
            color='inherit'
            fullWidth
            sx={{ mt:1, mb: 1 }}
            onClick={() => router.push('/login')}
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