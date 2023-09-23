import { useState, MouseEvent, FormEvent } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import {
  Box,
  Typography,
  Button,
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment
} from '@mui/material';
import { Layuot, Header } from '../../components';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useMutation } from '@apollo/client';
import { UPDATE_PASSWORD } from '../../graphql/graphql';
import { UpdatePasswordMutation } from '../../generated/graphql';

const ChangePassword: NextPage = () => {
  const [password, setPassword] = useState({ password: '', confirmPassword: '' })
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isNotExit, setIsNotExit] = useState<boolean>(false);

  const [passwordError, setPasswordError] = useState({ error: false, label: '新しいパスワード' });
  const [confirmPasswordError, setConfirmPasswordError] = useState({ error: false, label: '確認用パスワード' });

  const router = useRouter();

  const [updatePassword] = useMutation<UpdatePasswordMutation>(UPDATE_PASSWORD);
  const userId = useSearchParams().get('id');

  const handleSubmitNewpassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setPasswordError({ ...passwordError, error: false, label: '新しいパスワード' });
    setConfirmPasswordError({ ...confirmPasswordError, error: false, label: '確認用パスワード' });

    if (password.password == '') {
      setPasswordError({ ...passwordError, error: true, label: 'パスワードが入力されていません' })
      return;
    };

    if (password.confirmPassword == '') {
      setConfirmPasswordError({ ...passwordError, error: true, label: '確認用パスワードが入力されていません' })
      return;
    };

    if (password.password != password.confirmPassword) {
      setConfirmPasswordError({ ...passwordError, error: true, label: 'パスワードが一致しません' })
      return;
    };

    const { data } = await updatePassword({
      variables: {
        userId: userId,
        password: password.password
      }
    });

    if (!data?.updatePassword) {
      // 存在しないユーザーの更新は実施しない
      router.push('/');
    };

    router.push(`/main/${userId}`);
  }

  return (
    <Layuot>
      <Header title='CaseStudy' page='change-password' />
      <Box
        sx={{
          marginTop: 25,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', mt: 1, mb: 1 }}>
          パスワード変更
        </Typography>
        <Typography component="p" sx={{ mt: 2, mb: 1 }}>
          新しいパスワードと確認用パスワードを入力してください
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 , alignItems: 'center'}} onSubmit={handleSubmitNewpassword}>
          <InputLabel htmlFor="standard-new-password" sx={{ mt: 3 }} error={passwordError.error}>{ passwordError.label }</InputLabel>
          <OutlinedInput
            id="standard-new-password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            value={password.password}
            error={passwordError.error}
            onChange={(event) => setPassword({ ...password, password: event.target.value })}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((show) => !show)}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <InputLabel htmlFor="standard-confirmt-password" sx={{ mt: 3 }} error={confirmPasswordError.error}>{ confirmPasswordError.label }</InputLabel>
          <OutlinedInput
            id="standard-confirmt-password"
            type={showConfirmPassword ? 'text' : 'password'}
            fullWidth
            error={confirmPasswordError.error}
            value={password.confirmPassword}
            onChange={(event) => setPassword({ ...password, confirmPassword: event.target.value })}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="confirm password visibility"
                  onClick={() => setShowConfirmPassword((show) => !show)}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
            変更
          </Button>
        </Box>
      </Box>
    </Layuot>
  )
};

export default ChangePassword;