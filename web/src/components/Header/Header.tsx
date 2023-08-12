import { FC, useState } from 'react';
import { 
  Toolbar,
  Button,
  Typography,
  AppBar,
  Drawer,
  IconButton 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

type HeaderProps = {
  title: string
}

export const Header: FC<HeaderProps> = (props) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <AppBar component='nav' >
      <Toolbar >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={() => setOpen(true)}
          sx={{ ...(open && { display: 'none' }) }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          sx={{
            width: 180,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 180,
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <IconButton onClick={() => setOpen(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </Drawer>
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
        <Button 
          variant="text" 
          color='inherit'
          sx={{
            width: 180,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 180,
            },
          }}
        >
          Sign up
        </Button>
      </Toolbar>
    </AppBar>
  )
}