import { NextPage } from 'next';
import { ReactNode, useState } from 'react';
import { Layuot } from '../../components/Layout';
import { Typography, Box, Tabs, Tab, Fab } from '@mui/material';
import { StudyGrid } from '../../components/StudyGrid/StudyGrid';
import { StudyReport } from '../../components/StudyReport/StudyReport';
import CreateIcon from '@mui/icons-material/Create';

type TabPanelProps = {
  children: ReactNode
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          { children }
        </Box>
      )}
    </div>
  );
}

const Main: NextPage = () => {
  const [tabValue, setTabValue] = useState<number>(1);

  const tabChanged = (event: React.SyntheticEvent, newTabValue: number) => {
    setTabValue(newTabValue);
  }

  return (
    <Layuot>
      <Box
        sx={{
          mt: 3
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          <Typography
            component="h5"
            variant="h5"
            sx={{
              fontWeight: 'bold',
              ml: '30%'
            }}
          >
            ユーザー名
          </Typography>
          <Fab 
            aria-label='create' 
            size='medium' 
            color='primary'
            sx={{
              ml: '25%'
            }}
          >
            <CreateIcon />
          </Fab>
        </Box>
        <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
          <Tabs value={tabValue} onChange={tabChanged} centered>
            <Tab label='学習レポート' />
            <Tab label='学習一覧' />
            <Tab label='プロフィール' />
          </Tabs>
        </Box>
        <TabPanel value={tabValue} index={0}>
          <StudyReport />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <StudyGrid />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <Typography>Tab 3</Typography>
        </TabPanel>
      </Box>
    </Layuot>
  )
}

export default Main;