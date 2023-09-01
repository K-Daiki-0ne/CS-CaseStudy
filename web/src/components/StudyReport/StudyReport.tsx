import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

type StudyTimeboxProps = {
  text: string,
  heder?: boolean
}

const StudyTimebox: FC<StudyTimeboxProps> = ({ text, heder }) => {
  let boxColor = '#FFFFFF';
  let textBold = 'normal';
  let textColor = '#000000';

  if (heder) {
    boxColor = '#556cd6';
    textBold = 'bold';
    textColor = 'white'
  }

  return (
    <Box 
      sx={{ 
        border: '1px solid grey', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70%',
        backgroundColor: boxColor
      }}>
      <Typography 
        align='center'
        sx={{
          color: textColor,
          fontWeight: textBold,
          fontSize: '0.83rem'
        }}
        component='p'
      >
        { text }
      </Typography>
    </Box>
  )
}

export const StudyReport = () => {
  return (
    <Box>
      <Box>
        <Grid container spacing={0}>
          <Grid xs={4}>
            <StudyTimebox text='今日の学習時間' heder/>
            <StudyTimebox text='8時間' />
          </Grid>
          <Grid xs={4}>
            <StudyTimebox text='今週の学習時間' heder/>
            <StudyTimebox text='56時間' />
          </Grid>
          <Grid xs={4}>
            <StudyTimebox text='今月の学習時間' heder/>
            <StudyTimebox text='230時間' />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ flexGrow: 1, mt: 4 , border: '1px solid grey'}}>
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