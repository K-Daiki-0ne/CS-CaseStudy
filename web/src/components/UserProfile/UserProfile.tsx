import { useState, MouseEvent } from 'react';
import { useSearchParams } from "next/navigation";
import { 
  Box,
  TextField,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  Fab,
  Paper,
  ListItem,
  Chip,
  OutlinedInput,
  InputAdornment,
  IconButton
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { SelectChangeEvent } from '@mui/material/Select';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import { useMutation } from '@apollo/client';
import { RegisterMutation  } from '../../generated/graphql';
import { REGISTER_USER } from '../../graphql/graphql';

type StudyTag = {
  key: number;
  label: string;
};

export const UserProfile = () => {
  const [updateUser, setUpdateUser] = useState({ username: '', professionId: 0, tagName: '', goal: '' });
  const [tagError, setTagError] = useState({ error: false, label: '学習タグ' });
  const [studyTag, setStudyTag] = useState<StudyTag[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(true);
  const [profession, setProfession] = useState<string>('');

  const [update] = useMutation<RegisterMutation>(REGISTER_USER);
  const userId = useSearchParams().get('userId');

  const handleModeClick = async (event: any) => {
    event.preventDefault();
    if (isEdit) {
      // User情報を更新する
      await update({
        variables: {
          userId: userId,
          userName: updateUser.username,
          professionId: updateUser.professionId
        }
      });

      setIsEdit(false);
    } else {
      setIsEdit(true);
    }
  }

  const handleClickTagDelete = (deleteTag: StudyTag) => () => {
    setStudyTag((tags) => tags.filter((tag) => tag.key !== deleteTag.key))
  }

  const handleClickAddTag = () => {
    setTagError({ error: false, label: '学習タグ' });
    if (updateUser.tagName == '') {
      setTagError({ error: true, label: 'タグ名が入力されていません' })
      return;
    }

    let additionalKey: number = 0;
    if (studyTag.length != 0) {
      const currentFinishTag: StudyTag = studyTag[studyTag.length - 1];
      additionalKey = currentFinishTag.key;  
    }
    setStudyTag([ ...studyTag, { key: additionalKey + 1, label: updateUser.tagName } ])
  }

  return (
    <div>
      <Box sx={{ width: '100%', mt: 2 }}>
        <InputLabel id='username' htmlFor='user-name-input'>職業</InputLabel>
        <TextField 
          disabled={isEdit}
          required
          id='user-name-input'
          value={updateUser.username}
          onChange={(e) => setUpdateUser({ ...updateUser, username: e.target.value })}
          defaultValue="ユーザー名"
          sx={{
            width: '100%'
          }}
        />
        <InputLabel id='user-profession' htmlFor='user-profession-select' sx={{ mt: 1 }} >職業</InputLabel>
        <Select
          id="user-profession-select"
          value={profession}
          onChange={(e: SelectChangeEvent) => setUpdateUser({ ...updateUser, professionId: Number(e.target.value) })}
          fullWidth
        >
          <MenuItem value=""></MenuItem>
          <MenuItem value={10}>学生（中学生）</MenuItem>
          <MenuItem value={11}>学生（高校生）</MenuItem>
          <MenuItem value={12}>学生（大学生）</MenuItem>
          <MenuItem value={12}>社会人</MenuItem>
          <MenuItem value={12}>その他</MenuItem>
        </Select>
        <InputLabel id ='study-tag' htmlFor='study-tag-input' sx={{ mt: 1 }} error={ tagError.error }>{ tagError.label }</InputLabel>
        <Paper
          sx={{
            display: 'flex',
            flexWrap: 'nowrap',
            listStyle: 'none',
            p: 0,
            m: 0,
            pl: 0,
            pr: 1
          }}
          component="ul"
        >
          { studyTag.map((data: StudyTag) => {
            return (
              <ListItem key={data.key}>
                <Chip
                  label={data.label}
                  onDelete={handleClickTagDelete(data)}
                />
              </ListItem>
            );
          })}
        </Paper>
        <OutlinedInput 
          id='study-tag-input'
          error={tagError.error}
          type='text'
          value={updateUser.tagName}
          onChange={(value) => setUpdateUser({ ...updateUser, tagName: value.target.value })}
          sx={{ mt: 1 }}
          fullWidth
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickAddTag}
                onMouseDown={(event: MouseEvent<HTMLButtonElement>) => event.preventDefault()}
                edge="end"
              >
                <AddCircleIcon />
              </IconButton>
            </InputAdornment>
          }
        />
        <Typography sx={{ mt: 2 }}>目標設定</Typography>
        <TextField
          disabled={isEdit}
          multiline
          rows={4}
          fullWidth
          sx={{ height: '40px' }}
        />
      </Box>
      <Box sx={{ width: '100%', justifyItems: 'center', aliginItems: 'center', mt: 15, textAlign: 'center' }}>
        <Fab
          color='primary'
          onClick={handleModeClick}
        >
          { isEdit ? <EditIcon /> : <SaveIcon/> }
        </Fab>
      </Box>
    </div>
  )
}
