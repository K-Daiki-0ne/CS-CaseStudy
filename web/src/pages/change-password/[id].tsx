import { useState, MouseEvent } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router'
import {
  Box,
  Typography,
  Alert,
  TextField,
  Button,
  InputLabel,
  Input,
  IconButton,
  InputAdornment
} from '@mui/material';
import { Layuot } from '../../components/Layout';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const ChangePassword: NextPage = () => {
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [checkNewPassword, setCheckNewPassword] = useState<boolean>(false);
  const [checkConfirmPassword, setCheckConfirmPassword] = useState<boolean>(false);


  const router = useRouter();

  const handleClickShowPassword = () => setShowNewPassword((show) => !show);
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onChangeNewPassword = () => {

  }

  const onChangeConfirmPassword = () => {

  }

  return (
    <Layuot>
      <Box
        sx={{
          marginTop: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', mt: 1, mb: 1 }}>
          パスワード変更
        </Typography>
        <Typography component="p" sx={{ mt: 2, mb: 1 }}>
          パスワードは半角英字,数字,記号を組み合わせて入力してください。
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 , alignItems: 'center'}}>
          <InputLabel htmlFor="outlined-new-password" sx={{ mt: 5 }}>新しいパスワード</InputLabel>
          <Input
            id="standard-new-password"
            type={showNewPassword ? 'text' : 'password'}
            fullWidth
            value={newPassword}
            onChange={onChangeNewPassword}
            endAdornment={
              <InputAdornment position="end">
                { checkNewPassword ? <CheckCircleIcon /> : <div></div> }
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <InputLabel htmlFor="outlined-confirm-password" sx={{ mt: 5 }}>確認用パスワード</InputLabel>
          <Input
            id="standard-confirmt-password"
            type={showNewPassword ? 'text' : 'password'}
            fullWidth
            value={confirmPassword}
            onChange={onChangeConfirmPassword}
            endAdornment={
              <InputAdornment position="end">
                { checkConfirmPassword ? <CheckCircleIcon /> : <div></div> }
                <IconButton
                  aria-label="confirm password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 5, mb: 1, width: '50%', ml: '25%' }}
          >
            変更する
          </Button>
        </Box>
      </Box>
    </Layuot>
  )
};

export default ChangePassword;