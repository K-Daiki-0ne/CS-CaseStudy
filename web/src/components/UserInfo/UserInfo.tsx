import { useState, MouseEvent } from 'react';

import { Box, InputLabel, InputAdornment, IconButton, OutlinedInput, FormControl, Typography, Select, MenuItem } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { SelectChangeEvent } from '@mui/material/Select';

export const UserInfo = () => {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [profession, setProfession] = useState<string>('');

  const handleClickShowPassword        = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
  const handleMouseDownPassword        = (event: MouseEvent<HTMLButtonElement>) => event.preventDefault();
  const handleMouseDownConfirmPassword = (event: MouseEvent<HTMLButtonElement>) => event.preventDefault();
  const professionChange               = (event: SelectChangeEvent) => setProfession(event.target.value);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography>パスワードは半角英字,数字,記号を組み合わせてご入力してください。</Typography>
      <FormControl sx={{ mt: 1}}>
          <InputLabel htmlFor="password">パスワード</InputLabel>
          <OutlinedInput
            id="password"
            label="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            name='password'
            onChange={(event) => setPassword(event.target.value)}
            endAdornment={
              <InputAdornment position="end">
                { showPassword ? <CheckCircleIcon /> : <div></div> }
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            sx={{ width: '100%' }}
          />
      </FormControl>
      <FormControl sx={{ mt: 5 }}>
        <InputLabel htmlFor="confirm-password" >確認用パスワード</InputLabel>
        <OutlinedInput
          id="confirm-password"
          label="confirm-password"
          type={password ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          endAdornment={
            <InputAdornment position="end">
              { showConfirmPassword ? <CheckCircleIcon /> : <div></div> }
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowConfirmPassword}
                onMouseDown={handleMouseDownConfirmPassword}
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl sx={{ mt: 5, width: '250px' }}>
        <InputLabel id='profession-label' htmlFor='profession-label'>職業</InputLabel>
        <Select
          labelId='profession-label'
          id='profession-label'
          value={profession}
          label="職業"
          fullWidth
          onChange={professionChange}
        >
          <MenuItem value={10}>学生（中学生）</MenuItem>
          <MenuItem value={11}>学生（高校生）</MenuItem>
          <MenuItem value={12}>学生（大学生）</MenuItem>
          <MenuItem value={13}>社会人</MenuItem>
          <MenuItem value={14}>その他</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}
