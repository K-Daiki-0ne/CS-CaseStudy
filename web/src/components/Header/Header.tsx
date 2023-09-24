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
        <Typography
          component="h2"
          variant="h4"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1, ml: 10 }}
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
                  width: '100%',
                  flexShrink: 0,
                  '& .MuiDrawer-paper': {
                    width: '100%',
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