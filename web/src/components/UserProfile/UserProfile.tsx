import { useState, MouseEvent } from 'react';
import { Box, TextField, Typography, FormControl, IconButton, Select, MenuItem, Fab } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';

export const UserProfile = () => {
  const [isEdit, setIsEdit] = useState<boolean>(true);
  const [profession, setProfession] = useState<string>('');

  const changeMode = (event: any) => {
    event.preventDefault();

    if (isEdit) {
      // 編集を実施する
      setIsEdit(false);
    } else {
      // 編集を実施後にデータの登録を実施する
      setIsEdit(true);
    }
  }

  return (
    <div>
      <Box sx={{ width: '100%', mt: 2 }}>
        <Typography>ユーザー名</Typography>
        <TextField 
          disabled={isEdit}
          required
          id='user-name'
          defaultValue="ユーザー名"
          sx={{
            width: '100%'
          }}
        />
        <Typography sx={{ mt: 2 }}>メールアドレス</Typography>
        <TextField 
          disabled={isEdit}
          required
          id='user-email'
          defaultValue="メールアドレス"
          sx={{
            width: '100%'
          }}
        />
        <Typography sx={{ mt: 2 }}>職業</Typography>
        <FormControl sx={{ width: '100%' }} disabled={isEdit}>
          {/* <InputLabel id='user-profession'>職業</InputLabel> */}
          <Select
            id="user-profession-select"
            value={profession}
            onChange={(e: SelectChangeEvent) => setProfession(e.target.value)}
            autoWidth
          >
            <MenuItem value=""></MenuItem>
            <MenuItem value={10}>学生（中学生）</MenuItem>
            <MenuItem value={11}>学生（高校生）</MenuItem>
            <MenuItem value={12}>学生（大学生）</MenuItem>
            <MenuItem value={12}>社会人</MenuItem>
            <MenuItem value={12}>その他</MenuItem>
          </Select>
        </FormControl>
        <Typography sx={{ mt: 2 }}>目標設定</Typography>
        <TextField
          disabled={isEdit}
          multiline
          maxRows={6}
          fullWidth
          sx={{ height: '40px' }}
        />
      </Box>
      <Box sx={{ width: '100%', justifyItems: 'center', aliginItems: 'center', mt: 4, textAlign: 'center' }}>
        <Fab
          color='primary'
          onClick={changeMode}
        >
          { isEdit ? <EditIcon /> : <SaveIcon/> }
        </Fab>
      </Box>
    </div>
  )
}
