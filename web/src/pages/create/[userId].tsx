import { useState, useEffect, ChangeEvent } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilValue } from 'recoil';
import { Layuot } from '../../components/Layout';
import { Header } from '../../components/Header/Header';
import { Box, Typography, Input, InputLabel, Select, MenuItem, TextField , Fab, IconButton } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { SelectChangeEvent } from '@mui/material/Select';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useMutation } from '@apollo/client';
import { CREATE_STUDY } from '../../graphql/graphql';
import { CreateStudyMutation } from '../../generated/graphql';
import { userInfoState } from '../../store/selectors';

const Create: NextPage = () => {
  const [date, setDate] = useState<Dayjs | null>(null);
  const [time, setTime] = useState<string>('');
  const [studyTag, setStudyTag] = useState<string>('');
  const [study, setStudy] = useState<string>('');
  const [dateError, setDateError] = useState({ error: false, label: '' });
  const [timeError, setTimeError] = useState({ error: false, label: '' });

  const user = useRecoilValue(userInfoState);
  const router = useRouter();

  const [create] = useMutation<CreateStudyMutation>(CREATE_STUDY);

  useEffect(() => {
    const today = dayjs()
    setDate(today)
  },[]);

  const handleTagChange = (event: SelectChangeEvent) => {
    event.preventDefault();
    setStudyTag(event.target.value);
  }

  const createStudy = async (e: any): Promise<void> => {
    e.preventDefault()

    setDateError({ ...dateError, error: false, label: '' });
    setTimeError({ ...timeError, error: false, label: '' });

    if (date == null) {
      setDateError({ error: true, label: '学習日を入力してください' });
      return;
    }

    try {
      await create({
        variables: {
          userId: user.userId,
          studyYear: date?.year(),
          studyDate: (date?.year() * 10000) + ((date?.month() + 1) * 100) + date?.date(),
          studyTime: Number(time.replace(':', '')),
          studyTagId: Number(studyTag),
          studyContent: study
        }
      });

      router.push(`/main/${user.userId}`)
    } catch(e) {
      console.log('error')
      console.error(e);
    }
    
    return;
  }

  return (
    <Layuot>
      <Header title='CaseStudy' page='create' />
      <Box component='form' onSubmit={createStudy}>
        <Box sx={{ mt: 10 }}>
          <IconButton onClick={() => router.push(`/main/${user.userId}`)}>
            <ArrowBackIosIcon />
          </IconButton>
          <Typography sx={{ textAlign: 'center' }}>学習内容を記録</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <InputLabel sx={{ mt:2 }} shrink htmlFor="study-day-input" size='normal'>
              学習日
            </InputLabel>
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
            value={time}
            onChange={(value: ChangeEvent<HTMLInputElement>) => setTime(value.target.value)}
            type='time'
            id='study-day-input'
            fullWidth
          />
          <InputLabel sx={{ mt:2 }} shrink htmlFor="update-study-day-input" size='normal'>
            学習タグ
          </InputLabel>
          <Select
            labelId="update-study-day-input"
            id="study-day-input"
            value={studyTag}
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
            value={study}
            onChange={(value) => setStudy(value.target.value)}
            multiline
          />
        </Box>
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Fab variant="extended" color="primary" type='submit' onSubmit={createStudy}>
            <SaveIcon sx={{ mr: 1 }} />
            記録する
          </Fab>
        </Box>
      </Box>
    </Layuot>
  )
};

export default Create;