import { FC } from 'react';
import { Typography } from '@mui/material';

type Props = {
  time: number;
  count: number;
}

export const TotalTime: FC<Props> = (props) => {
  return (
    <div>
      <Typography component="p" variant="h4">
        { props.time }
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        { props.count }
      </Typography>
    </div>
  )
}