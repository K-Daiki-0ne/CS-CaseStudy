import { useState, MouseEvent, FC, useEffect } from 'react';
import { 
  Box,
  TextField,
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
import { useRecoilState } from 'recoil';
import { userState } from '../../store/atoms';
import { RegisterMutation, CreateStudyTagMutation  } from '../../generated/graphql';
import { REGISTER_USER, CREATE_STUDY_TAG } from '../../graphql/graphql';
import { professionList } from '../../utils/professinList';

type StudyTag = {
  key: number;
  label: string;
  show: boolean;
};

type Props = {
  userId: string,
  tags: StudyTag[]
}

export const UserProfile: FC<Props> = ({ userId, tags }) => {
  const [updateUser, setUpdateUser] = useState({ username: '', professionId: '0', tagName: '', goal: '' });
  const [tagError, setTagError] = useState({ error: false, label: '学習タグ' });
  const [studyTag, setStudyTag] = useState<StudyTag[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(true);

  const [user, setUser] = useRecoilState(userState);
  // const user = useRecoilValue(userState);

  const [update] = useMutation<RegisterMutation>(REGISTER_USER);
  const [createStudyTag] = useMutation<CreateStudyTagMutation>(CREATE_STUDY_TAG);

  useEffect(() => {
    setUpdateUser({
      ...updateUser,
      username: user.userName,
      professionId: user.professionId as string,
      goal: user.goal as string
    });

    setStudyTag(tags);
  }, [])

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
            professionId: updateUser.professionId,
            goal: updateUser.goal
          }
        });

        setUser({
          userId: userId,
          userName: updateUser.username,
          professionId: updateUser.professionId,
          goal: updateUser.goal
        });

        console.log('create-study-tag start')
        console.log('studyTag:', studyTag)

        await studyTag.map((tags: StudyTag) => {
          createStudyTag({
            variables: {
              userId: userId,
              key: String(tags.key),
              label: tags.label
            }
          })
        })

        setIsEdit(true);  
      } catch (e) {
        console.error(e)
      }
    }
  }

  const handleClickTagDelete = (deleteTag: StudyTag) => () => {
    const updateStudyTag: StudyTag[] = studyTag.map((tags: StudyTag) => 
      tags.key === deleteTag.key
        ? {
          ...tags,
          show: false
        }
        : {
          ...tags
        }
    );

    setStudyTag(updateStudyTag);
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

    if (tagError.error == false) {
      setStudyTag([ ...studyTag, { key: additionalKey + 1, label: updateUser.tagName, show: true } ])
    };
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
          {
            professionList.map((data: { id: string, label: string }) => (
              <MenuItem value={data.id} key={data.id}>{ data.label }</MenuItem>
            ))
          }
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
            if (data.show) {
              return (
                <ListItem key={data.key}>
                  <Chip
                    label={data.label}
                    disabled={isEdit}
                    onDelete={handleClickTagDelete(data)}
                  />
                </ListItem>
              );  
            }
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
          value={updateUser.goal}
          onChange={(event) => setUpdateUser({ ...updateUser, goal: event.target.value })}
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
