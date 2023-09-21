import { ReactNode, useState, useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSearchParams } from "next/navigation";
import { useLazyQuery } from '@apollo/client';
import { Typography, Box, Tabs, Tab, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import dayjs from "dayjs";
import { useRecoilValue, useRecoilState } from 'recoil';
import { initializeApollo } from '../../libs/apolloClient';
import { MULTI_READ_STUDY, READ_USER_FOR_USERID } from '../../graphql/graphql'
import { MultiReadStudyQuery, ReadUserForUserIdQuery } from '../../generated/graphql';
import { 
  Layuot,
  StudyGrid,
  StudyReport,
  UserProfile,
  Header
} from '../../components';
import { userState } from '../../store/atoms';
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

type StudyTimeType = {
  day: {
    time: number;
    minute: number;
  }
  week: {
    time: number;
    minute: number;
  }
  month: {
    time: number;
    minute: number
  }
}

type Props = { studies: StudiesType[], time: StudyTimeType }

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

const Main: NextPage<Props> = ({ studies, time }) => {
  const [tabValue, setTabValue] = useState<number>(0);
  const [,setUser] = useRecoilState(userState);
  const router = useRouter();
  const userId = useSearchParams().get('userId');

  const [user] = useLazyQuery<ReadUserForUserIdQuery>(READ_USER_FOR_USERID, {
    variables: {
      userId: userId
    }
  });

  useEffect(() => {
    // ユーザーIDが存在しない場合は当ページを表示しない（不正アクセス対策）
    // ページがロードされたことを考慮して、ユーザー情報を再取得する
    const getUser = async () => {
      const { data } = await user();
      if (data?.readUserForUserId.errors) {
        router.push('/');
      }
      setUser({
        userId: data?.readUserForUserId.user?.userId as string,
        userName: data?.readUserForUserId.user?.userName as string,
        professionId: data?.readUserForUserId.user?.professionId != null ? data?.readUserForUserId.user?.professionId : '0',
        goal: data?.readUserForUserId.user?.goal != null ? data?.readUserForUserId.user?.goal : ''
      })
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
            onClick={() => router.push(`/create/${userId as string}`)}
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
          <StudyReport props={time} />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <StudyGrid props={studies} />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <UserProfile userId={userId as string} />
        </TabPanel>
      </Box>
    </Layuot>
  )
}

// SSRで学習内容を取得する
export async function getServerSideProps(params: any) {
  const apolloClient = initializeApollo();

  const studiesArray: StudiesType[] = [];
  let studyTime: StudyTimeType = {
    day: { 
      time: 0, 
      minute: 0 
    },
    week: {
      time: 0,
      minute: 0
    },
    month: {
      time: 0,
      minute: 0
    }
  };

  try {
    const today: number = (dayjs().year() * 10000) + ((dayjs().month() + 1) * 100) + dayjs().date();
    const { data } = await apolloClient.query<MultiReadStudyQuery>({
      query: MULTI_READ_STUDY,
      variables: {
        userId: params.query.userId,
        date: today
      }
    });
  
    if (data.multiReadStudy.studies == undefined || data.multiReadStudy.studies == null) {
      return {
        props: [],
        time: studyTime
      }
    }

    // apolloを使用したAPIではデータに不要な項目が追加されるため、
    // 使用するための一覧で表示できるようデータ内容を修正する
    data.multiReadStudy.studies.map((value: any) => {
      const studyValue: StudiesType = {
        id: value.studyId,
        userId: value.userId,
        Tagid: value.tagId,
        Study: value.Study,
        Date: value.Date,
        Time: value.Time,
        Content: value.Content
      };
      studiesArray.push(studyValue);
    });

    studyTime.day = data.multiReadStudy.day;
    studyTime.week = data.multiReadStudy.week;
    studyTime.month = data.multiReadStudy.month;

  } catch (e) {
    console.error(e);
  }


  return {
    props: { studies: studiesArray, time: studyTime }
  }

}

export default Main;