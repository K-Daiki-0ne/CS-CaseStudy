import { NextPage } from 'next';
import { useState } from 'react';
import {
  Box,
  Typography,
  Alert,
  TextField,
  Button,
} from '@mui/material';
import { Layuot } from '../components/Layout';

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
        <Typography component="h1" variant="h5">
          Sign Up  
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3}}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 1 }}
          >
            Sign Up
          </Button>
        </Box>        
      </Box>
    </Layuot>
  )
};

export default ForgotPassword;