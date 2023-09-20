import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

type StudyTimeboxProps = {
  text: string,
  heder?: boolean
};

type StudyTimeType = {
  day: {
    time: number;
    minute: number;
  },
  week: {
    time: number;
    minute: number;
  },
  month: {
    time: number;
    minute: number;
  }
}

type Props = {
  props: StudyTimeType
}

const StudyTimebox: FC<StudyTimeboxProps> = ({ text, heder }) => {
  let boxColor = '#FFFFFF';
  let textBold = 'normal';
  let textColor = '#000000';
  let height = '100%';
  let fontSize = '1.15rem'

  if (heder) {
    boxColor = '#556cd6';
    textBold = 'bold';
    textColor = 'white';
    height = '60%';
    fontSize = '0.83rem'
  }

  return (
    <Box 
      sx={{ 
        border: '1px solid grey', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: height,
        backgroundColor: boxColor
      }}>
      <Typography 
        align='center'
        sx={{
          color: textColor,
          fontWeight: textBold,
          fontSize: fontSize
        }}
        component='p'
      >
        { text }
      </Typography>
    </Box>
  )
}

export const StudyReport: FC<Props> = ({ props }) => {
  return (
    <Box>
      <Box>
        <Grid container spacing={0}>
          <Grid xs={4}>
            <StudyTimebox text='今日の学習時間' heder/>
            <StudyTimebox text={`${props.day.time}時間${props.day.minute}分`} />
          </Grid>
          <Grid xs={4}>
            <StudyTimebox text='今週の学習時間' heder/>
            <StudyTimebox text={`${props.week.time}時間${props.week.minute}分`} />
          </Grid>
          <Grid xs={4}>
            <StudyTimebox text='今月の学習時間' heder/>
            <StudyTimebox text={`${props.month.time}時間${props.month.minute}分`} />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ flexGrow: 1, mt: 6 , border: '1px solid grey'}}>
        <Typography>Chartを設置する</Typography>
      </Box>

      <Grid container spacing={0}>
        <Grid xs={6}>
          <Box sx={{ mt: 1 , border: '1px solid grey'}}>
            <Typography>トータルの学習時間</Typography>
          </Box>
        </Grid>
        <Grid xs={6}>
          <Box sx={{ mt: 1 , border: '1px solid grey'}}>
            <Typography>トータルの学習時間</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}