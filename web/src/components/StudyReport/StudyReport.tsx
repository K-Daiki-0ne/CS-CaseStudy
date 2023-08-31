import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

export const StudyReport = () => {
  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 3, sm: 3, md: 3 }}>
          <Grid xs={4}>
            <Typography>今日の学習時間</Typography>
          </Grid>
          <Grid xs={4}>
            <Typography>今週の学習時間</Typography>
          </Grid>
          <Grid xs={4}>
            <Typography>今月の学習時間</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography>Chartを設置する</Typography>
      </Box>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
        <Grid xs={6}>
          <Typography>トータルの学習時間</Typography>
        </Grid>
        <Grid xs={6}>
          <Typography>今週の目標設定時間</Typography>
        </Grid>
      </Grid>
    </Box>
  )
}