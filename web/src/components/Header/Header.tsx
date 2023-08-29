import { FC, useState, useEffect } from 'react';
import { 
  Toolbar,
  Button,
  Typography,
  AppBar,
  Drawer,
  IconButton,
  Link
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useRouter } from 'next/router';

type HeaderProps = {
  title: string,
  page: string
}

export const Header: FC<HeaderProps> = (props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isView, setIsView] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    // Home画面の場合のみ、特定の機能を使用可能とする
    if (props.page === 'home') {
      setIsView(true);
    }
  }, []);

  return (
    <AppBar component='nav' >
      <Toolbar >
        {
          isView ? (
            <div>
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
            </div>
          )
          : (
            <div></div>
          )
        }
        <Typography
          component="h2"
          variant="h4"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          <Link href='/' variant='h4' underline='none' color='inherit'>
            {props.title}          
          </Link>
        </Typography>
        {
          isView ? (
            <div>
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
                onClick={() => router.push('/login')}
              >
                Sign up
              </Button>              
            </div>            
          ) : (
            <div></div>
          )
        }
      </Toolbar>
    </AppBar>
  )
}