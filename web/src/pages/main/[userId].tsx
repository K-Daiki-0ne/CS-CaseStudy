import { ReactNode, useState, useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSearchParams } from "next/navigation";
import { useLazyQuery } from '@apollo/client';
import { Typography, Box, Tabs, Tab, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useRecoilValue } from 'recoil';
import { initializeApollo } from '../../libs/apolloClient';
import { MultiReadStudyQuery } from '../../generated/graphql';
import { MULTI_READ_STUDY } from '../../graphql/graphql'
import { IS_USER } from '../../graphql/graphql';
import { IsUserQuery } from '../../generated/graphql';
import { Layuot } from '../../components/Layout';
import { StudyGrid } from '../../components/StudyGrid/StudyGrid';
import { StudyReport } from '../../components/StudyReport/StudyReport';
import { UserProfile } from '../../components/UserProfile/UserProfile';
import { Header } from '../../components/Header/Header'
import { userInfoState } from '../../store/selectors';

type TabPanelProps = {
  children: ReactNode
  index: number;
  value: number;
};

type StudiesType = {
  id: number;
  userId: string;
  Tagid: number;
  Study: string;
  Date: string;
  Time: string;
  Content: string
}

type Props = { studies: StudiesType[] }

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

const Main: NextPage<Props> = ({ studies }) => {
  const [tabValue, setTabValue] = useState<number>(0);
  const user = useRecoilValue(userInfoState);
  const router = useRouter();

  const [isUser] = useLazyQuery<IsUserQuery>(IS_USER, {
    variables: {
      userId: user.userId
    }
  });

  useEffect(() => {
    // ユーザーIDが存在しない場合は当ページを表示しない（不正アクセス対策）
    const getUser = async () => {
      const { data } = await isUser();
      if (!data?.isUser) {
        router.push('/');
      }
    }
    getUser();
  }, []);

  const tabChanged = (event: React.SyntheticEvent, newTabValue: number) => {
    setTabValue(newTabValue);
  }

  return (
    <Layuot>
      <Header title='CaseStudy' page='create' />
      <Box sx={{ mt: 10 }}>
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
            onClick={() => router.push(`/create/${user.userId}`)}
          >
            <AddIcon />
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
          <StudyGrid props={studies} />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <UserProfile userId={user.userId} />
        </TabPanel>
      </Box>
    </Layuot>
  )
}

// SSRで学習内容を取得する
export async function getServerSideProps(params: any) {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query<MultiReadStudyQuery>({
    query: MULTI_READ_STUDY,
    variables: {
      userId: params.query.userId
    }
  });

  if (data.multiReadStudy.studies == undefined || data.multiReadStudy.studies == null) {
    return {
      props: []
    }
  }

  const studiesArray: StudiesType[] = [];
  data.multiReadStudy.studies.map((data) => {
    const value: StudiesType = {
      id: data.studyId,
      userId: data.userId,
      Tagid: data.tagId,
      Study: data.Study,
      Date: data.Date,
      Time: data.Time,
      Content: data.Content
    };
    studiesArray.push(value);
  });

  return {
    props: { studies: studiesArray }
  }

}

export default Main;