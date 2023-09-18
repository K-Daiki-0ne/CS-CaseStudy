import { useState, FC, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  IconButton,
  Modal,
  Typography,
  InputLabel,
  Input,
  Select,
  MenuItem,
  TextField,
  Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { SelectChangeEvent } from '@mui/material/Select';
import SaveIcon from '@mui/icons-material/Save';
import dayjs, { Dayjs } from 'dayjs';
import { useMutation } from '@apollo/client';
import { UPDATE_STUDY } from '../../graphql/graphql';
import { UpdateStudyMutation } from '../../generated/graphql';

type StudyEditProps = {
  props: {
    studyId: number;
    userId: string;
    studyDate: string;
    studyTime: string;
    studyTagId: number;    
  }
}

export const StudyEditButton: FC<StudyEditProps> = ({ props }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Dayjs | null>(null);
  const [updateStudy, setUpdateStudy] = useState({ time: '', tagId: '', content: '' });
  const [dateError, setDateError] = useState({ error: false, label: '' });

  const [update] = useMutation<UpdateStudyMutation>(UPDATE_STUDY);

  const handleTagChange = (e: SelectChangeEvent) => {
    setUpdateStudy({ ...updateStudy, tagId: e.target.value });
  };

  const handleSaveSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 学習時間は必須項目であるが、未入力の場合はエラーとなるため、
    // 当イベントではチェックを実施しない
    setDateError({ error: false, label: '' });
    if (date == null) {
      setDateError({ error: true, label: '学習日を入力してください' });
      return;
    }

    try {
      await update({
        variables: {
          studyId: props.studyId,
          userId: props.userId,
          studyYear: date?.year(),
          studyDate: (date?.year() * 10000) + ((date?.month() + 1) * 100) + date?.date(),
          studyTime: Number(updateStudy.time.replace(':', '')),
          studyTagId: Number(updateStudy.tagId),
          studyContent: updateStudy.content
        }
      })

      setOpen(false);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Box component='div'>
      <IconButton aria-label="edit" size="large" onClick={() => setOpen(true)} sx={{ textAlign: 'center' }}>
        <EditIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='edit-dialog-title'
      >
        <Box component='div' sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          bgcolor: 'background.paper', 
          border: '1px solid #000', 
          boxShadow: 12,
          p: 4 ,
          width: '80%'
        }}>
          <Typography 
            id='edit-dialog-title' 
            variant='h6' 
            component='h2' 
            sx={{ fontWeight: 'bold' }
          }>
            編集
          </Typography>
          <Typography sx={{ mt: 1 }}>学習内容を編集します</Typography>
          <Box component='form' onSubmit={handleSaveSubmit}>
            <InputLabel sx={{ mt:2 }} shrink htmlFor="update-study-day-input" size='normal'>
              学習日
            </InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker 
                value={date}
                onChange={(value) => setDate(value)}
                sx={{ width: '100%' }}
                views={['year', 'month', 'day']}
                slotProps={{ textField: { error: dateError.error, label: dateError.label } }}
              />
            </LocalizationProvider>
            <InputLabel sx={{ mt:2 }} shrink htmlFor="study-day-input" size='normal'>
              学習時間
            </InputLabel>
            <Input
              required
              value={updateStudy.time}
              onChange={(value: ChangeEvent<HTMLInputElement>) => setUpdateStudy({ ...updateStudy, time: value.target.value })}
              type='time'
              id='study-day-input'
              fullWidth
            />
            <InputLabel sx={{ mt:2 }} shrink htmlFor="update-study-day-input" size='normal'>
              学習タグ
            </InputLabel>
            <Select
              labelId="study-day-input"
              id="study-day-input"
              value={updateStudy.tagId}
              onChange={handleTagChange}
              sx={{ width: '100%' }}
            >
              <MenuItem value="">
                <em>-</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            <InputLabel sx={{ mt:2 }} shrink htmlFor="update-study-day-input" size='normal'>
              学習内容
            </InputLabel>
            <TextField
              id='update-study-day-input'
              fullWidth
              rows={4}
              value={updateStudy.content}
              onChange={(value) => setUpdateStudy({ ...updateStudy, content: value.target.value })}
              multiline
            />
            <Box component='div' sx={{ mt:2, textAlign: 'right' }}>
              <Button
                variant='outlined'
                onClick={() => setOpen(false)}
              >
                CANCEL
              </Button>
              <Button
                type='submit'
                variant='contained'
                endIcon={<SaveIcon />}
                sx={{ ml: 2 }}
              >
                保存
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}
