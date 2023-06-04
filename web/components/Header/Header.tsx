import { FC } from 'react';
import { Toolbar, Button, Typography } from '@mui/material';

type HeaderProps = {
  title: string
}

export const Header: FC<HeaderProps> = (props) => {
  return (
    <>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }} >
        <Button size="small">Subscribe</Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {props.title}
        </Typography>
        <Button variant="outlined" size="small">
          Sign up
        </Button>
      </Toolbar>
    </>
  )
}