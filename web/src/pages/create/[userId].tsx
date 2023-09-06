import { useState, useEffect, ChangeEvent } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSearchParams } from "next/navigation";
import dayjs, { Dayjs } from 'dayjs';
import { Layuot } from '../../components/Layout';
import { Box, Typography, Input, InputLabel, Select, MenuItem, TextField , Fab, IconButton } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { SelectChangeEvent } from '@mui/material/Select';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const Create: NextPage = () => {
  const [date, setDate] = useState<Dayjs | null>(null);
  const [time, setTime] = useState<string>('');
  const [studyTag, setStudyTag] = useState<string>('');
  const [study, setStudy] = useState<string>('');

  const router = useRouter();
  const userId = useSearchParams().get('userId');

  useEffect(() => {
    const today = dayjs()
    setDate(today)
  },[]);

  const handleTagChange = (event: SelectChangeEvent) => {
    event.preventDefault();
    setStudyTag(event.target.value);
  }

  return (
    <Layuot>
      <Box sx={{ mt: 3 }}>
        <IconButton onClick={() => router.push(`/main/${userId}`)}>
          <ArrowBackIosIcon />
        </IconButton>
        <Typography sx={{ textAlign: 'center' }}>学習内容を記録</Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <InputLabel sx={{ mt:3 }} shrink htmlFor="study-day-input" size='normal'>
            学習日
          </InputLabel>
          <DateTimePicker 
            value={date}
            onChange={(value) => setDate(value)}
            sx={{ width: '100%' }}
            ampm={false}
            views={['year', 'month', 'day', 'hours', 'minutes']}
          />
        </LocalizationProvider>
        <InputLabel sx={{ mt:3 }} shrink htmlFor="study-day-input" size='normal'>
          学習時間
        </InputLabel>
        <Input
          required
          value={time}
          onChange={(value: ChangeEvent<HTMLInputElement>) => setTime(value.target.value)}
          type='time'
          fullWidth
        />
        <InputLabel sx={{ mt:3 }} shrink htmlFor="study-day-input" size='normal'>
          学習タグ
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
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
        <InputLabel sx={{ mt:3 }} shrink htmlFor="study-day-input" size='normal'>
          学習内容
        </InputLabel>
        <TextField 
          required
          fullWidth
          rows={6}
          value={study}
          onChange={(value) => setStudy(value.target.value)}
          multiline
        />
      </Box>
      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Fab variant="extended" color="primary" >
          <SaveIcon sx={{ mr: 1 }} />
          記録する
        </Fab>
      </Box>
    </Layuot>
  )
};

export default Create;