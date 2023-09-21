import { useState, MouseEvent, FC } from 'react';
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

type Props = {
  userId: string
}

export const UserProfile: FC<Props> = ({ userId }) => {
  const [updateUser, setUpdateUser] = useState({ username: '', professionId: '0', tagName: '', goal: '' });
  const [tagError, setTagError] = useState({ error: false, label: '学習タグ' });
  const [studyTag, setStudyTag] = useState<StudyTag[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(true);

  const [update] = useMutation<RegisterMutation>(REGISTER_USER);

  const handleModeClick = async (event: any) => {
    event.preventDefault();
    if (isEdit) {
      setIsEdit(false);
    } else {
      // User情報を更新する
      try {
        await update({
          variables: {
            userId: userId,
            userName: updateUser.username,
            password: '',
            professionId: updateUser.professionId
          }
        });

        setIsEdit(true);  
      } catch (e) {
        console.error(e)
      }
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
        <InputLabel id='username' htmlFor='user-name-input'>ユーザー名</InputLabel>
        <TextField 
          disabled={isEdit}
          required
          id='user-name-input'
          value={updateUser.username}
          onChange={(e) => setUpdateUser({ ...updateUser, username: e.target.value })}
          sx={{
            width: '100%'
          }}
        />
        <InputLabel id='user-profession-select' sx={{ mt: 1 }} >職業</InputLabel>
        <Select
          labelId='user-profession-select'
          id="user-profession-select"
          value={updateUser.professionId as string}
          onChange={(e: SelectChangeEvent) => setUpdateUser({ ...updateUser, professionId: e.target.value })}
          fullWidth
          disabled={isEdit}
        >
          <MenuItem value='0'></MenuItem>
          <MenuItem value={'10'}>学生（中学生）</MenuItem>
          <MenuItem value={'11'}>学生（高校生）</MenuItem>
          <MenuItem value={'12'}>学生（大学生）</MenuItem>
          <MenuItem value={'12'}>社会人</MenuItem>
          <MenuItem value={'13'}>その他</MenuItem>
        </Select>
        <InputLabel id='study-tag' htmlFor='study-tag-input' sx={{ mt: 1 }} error={ tagError.error }>{ tagError.label }</InputLabel>
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
          disabled={isEdit}
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
                disabled={isEdit}
              >
                <AddCircleIcon />
              </IconButton>
            </InputAdornment>
          }
        />
        <InputLabel id='study-goal' htmlFor='study-goal-input' sx={{ mt: 1 }}>学習目標</InputLabel>
        <TextField
          id='study-goal-input'
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
