import { FC } from 'react';
import { Toolbar, Button, Typography, AppBar } from '@mui/material';

type HeaderProps = {
  title: string
}

export const Header: FC<HeaderProps> = (props) => {
  return (
    <AppBar component='nav' >
      <Toolbar >
        {/* <Button size="small">Subscribe</Button> */}
        <Typography
          component="h2"
          variant="h4"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {props.title}
        </Typography>
        <Button variant="text" color='inherit'>
          Sign up
        </Button>
      </Toolbar>
    </AppBar>
  )
}