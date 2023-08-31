import { NextPage } from 'next';
import { ReactNode, useState } from 'react';
import { Layuot } from '../../components/Layout';
import { Typography, Box, Tabs, Tab } from '@mui/material';
import { StudyGrid } from '../../components/StudyGrid/StudyGrid'
import { StudyReport } from '../../components/StudyReport/StudyReport'

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
        <Typography
          component="h5"
          variant="h5"
          align='center'
          sx={{
            fontWeight: 'bold'
          }}
        >
          ユーザー名
        </Typography>
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