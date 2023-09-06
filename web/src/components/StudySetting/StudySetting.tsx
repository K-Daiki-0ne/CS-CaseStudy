import { useState, MouseEvent, ChangeEvent } from 'react';
import { 
  Chip, 
  Box, 
  FormControl, 
  InputLabel, 
  OutlinedInput, 
  InputAdornment, 
  IconButton,
  TextField,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';

import AddCircleIcon from '@mui/icons-material/AddCircle';

type StudyTag = {
  key: number;
  label: string;
}

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export const StudySetting = () => {
  const [studyTag, setStudyTag] = useState<StudyTag[]>([
    { key: 0, label: 'angular' },
    { key: 1, label: 'jQuery' },
    { key: 2, label: 'Polymer' },
    { key: 3, label: 'React' },
    { key: 4, label: 'Vue.js' },
  ]);
  const [tagName, setTagName] = useState<string>('');

  const tagDelete = (deleteChip: StudyTag) => () => {
    setStudyTag((tags) => tags.filter((tag) => tag.key !== deleteChip.key))
  }

  const tagAdd = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTagName(e.target.value);
  }

  const handleClickAddTag = () => {
    const currentFinishTag: StudyTag = studyTag[studyTag.length - 1];
    studyTag.push({ key: currentFinishTag.key + 1, label: tagName });
  }

  return (
    <div>
      <Paper
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          listStyle: 'none',
          p: 0,
          m: 0,
          }}
        component="ul"
      >
        { studyTag.map((data: StudyTag) => {
          return (
            <ListItem key={data.key}>
              <Chip
                label={data.label}
                onDelete={tagDelete(data)}
              />
            </ListItem>
          );
        })}
      </Paper>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
        <FormControl variant='outlined'>
          <InputLabel htmlFor='study-tag'>学習タグ</InputLabel>
          <OutlinedInput 
            id='study-tag'
            label='study-tag'
            type='text'
            value={tagName}
            onChange={tagAdd}
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
        </FormControl>
        <FormControl fullWidth sx={{ mt: 5 }}>
          <TextField
            id='study-goal'
            label='学習目標'
            multiline
            rows={4}
            fullWidth
            variant='outlined'
          />
        </FormControl>
      </Box>
    </div>

  )
}
