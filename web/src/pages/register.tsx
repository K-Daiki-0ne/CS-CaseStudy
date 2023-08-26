import { NextPage } from 'next';
import { Layuot } from '../components/Layout';
import { Box, Typography, TextField, Button, Select, MenuItem, Link, OutlinedInput } from '@mui/material';

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
        <Typography component="h1" variant="h5">
          Sign Up  
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3}}>
          <TextField
            margin='normal'
            autoComplete="given-name"
            name="username"
            required
            fullWidth
            id="username"
            label="User Name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
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

export default Register;