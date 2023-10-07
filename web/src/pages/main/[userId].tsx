import { ReactNode, useState, useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSearchParams } from "next/navigation";
import { useLazyQuery } from '@apollo/client';
import { Typography, Box, Tabs, Tab, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import dayjs from "dayjs";
import { useRecoilState } from 'recoil';
import { initializeApollo } from '../../libs/apolloClient';
import { MULTI_READ_STUDY, READ_USER_FOR_USERID, READ_TAGS } from '../../graphql/graphql'
import { MultiReadStudyQuery, ReadUserForUserIdQuery, ReadTagsQuery } from '../../generated/graphql';
import { 
  Layout,
  StudyGrid,
  StudyReport,
  UserProfile,
  Header,
  StudyChart,
  StudyTotaltime
} from '../../components';
import { userState, studyTagState } from '../../store/atoms';
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

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

type StudyTagType = {
  id: number;
  key: number;
  label: string;
  show: boolean;
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

type WeekChartType = {
  label: string;
  data: number[];
  backgroundColor: string;
}

type MonthChartType = {
  data: number[];
  backgroundColor: string[];
  borderColor: string[];
  borderWidth: number;
}

type Props = { 
  studies: StudiesType[], 
  time: StudyTimeType, 
  tags: StudyTagType[],
  weekChart: WeekChartType[],
  labels: string[],
  monthChart: MonthChartType[]
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

const Main: NextPage<Props> = ({ studies, time, tags, weekChart, labels, monthChart }) => {
  const [tabValue, setTabValue] = useState<number>(0);
  const [user, setUser] = useRecoilState(userState);
  const [,setTags] = useRecoilState(studyTagState);
  const router = useRouter();
  const userId = useSearchParams().get('userId');

  const [getUser] = useLazyQuery<ReadUserForUserIdQuery>(READ_USER_FOR_USERID, {
    variables: {
      userId: userId
    }
  });

  useEffect(() => {
    // ユーザーIDが存在しない場合は当ページを表示しない（不正アクセス対策）
    // ページがロードされたことを考慮して、ユーザー情報を再取得する
    const getUserInfo = async () => {
      const { data } = await getUser();
      if (data?.readUserForUserId.errors) {
        router.push('/');
      }
      setUser({
        userId: data?.readUserForUserId.user?.userId as string,
        userName: data?.readUserForUserId.user?.userName as string,
        professionId: data?.readUserForUserId.user?.professionId != null ? data?.readUserForUserId.user?.professionId : '0',
        goal: data?.readUserForUserId.user?.goal != null ? data?.readUserForUserId.user?.goal : ''
      })
    };

    setTags(tags);
    getUserInfo();
  }, []);

  const handleTagChange = (event: React.SyntheticEvent, newTabValue: number) => {
    setTabValue(newTabValue);
  }

  return (
    <Layout>
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
            { user.userName }
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
          <Tabs value={tabValue} onChange={handleTagChange} centered>
            <Tab label='学習レポート' />
            <Tab label='学習一覧' />
            <Tab label='プロフィール' />
          </Tabs>
        </Box>
        <TabPanel value={tabValue} index={0}>
          <Box component='div'>
            <StudyReport props={time} />
          </Box>
          <Box component='div' sx={{ mt: 5 }}>
            <StudyChart props={weekChart} />
          </Box>
          <Box component='div' sx={{ mt: 1, border: '1px solid grey' }}>
            <StudyTotaltime labels={labels} chart={monthChart} />
          </Box>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <StudyGrid props={studies} />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <UserProfile userId={userId as string} tags={tags} />
        </TabPanel>
      </Box>
    </Layout>
  )
}

// SSRで学習内容を取得する
export async function getServerSideProps(params: any) {
  const apolloClient = initializeApollo();
  let studiesArray: StudiesType[] = [];
  let studyTagsArray: StudyTagType[] = [];
  let weekChart: WeekChartType[] = [];
  let monthLabel: string[] = [];
  let monthChart: MonthChartType[] = [];
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

  // timezoneを日本固定にする
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault("America/Toronto");
 
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
        props: { 
          studies: studiesArray, 
          time: studyTime,
          tags: studyTagsArray,
          weekChart: weekChart,
          labels: monthLabel,
          monthChart: monthChart
        }
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

    data.multiReadStudy.weekChart.map((week: any) => {
      const weekChartValue: WeekChartType = {
        label: week.label,
        data: week.data,
        backgroundColor: week.backgroundColor
      }
      weekChart.push(weekChartValue);
    });

    monthLabel = data.multiReadStudy.labels    

    data.multiReadStudy.monthChart.map((month: any) => {
      const monthValue: MonthChartType = {
        data: month.data,
        backgroundColor: month.backgroundColor,
        borderColor: month.borderColor,
        borderWidth: 1
      }
      monthChart.push(monthValue);
    });


  } catch (e) {
    console.error(e);
  };

  try {
    const { data } = await apolloClient.query<ReadTagsQuery>({
      query: READ_TAGS,
      variables: {
        user: params.query.userId,
      }
    });

    if (data.readTags == undefined || data.readTags == null || data.readTags.length == 0) {
      return {
        props: { 
          studies: studiesArray, 
          time: studyTime,
          tags: studyTagsArray,
          weekChart: weekChart,
          labels: monthLabel,
          monthChart: monthChart
        }
      }
    };

    data.readTags.map((studyTags: any) => {
      // __typenameを排除するためにデータを編集する
      let tagsValue = {
        id: studyTags.id,
        key: Number(studyTags.studyTagKey),
        label: studyTags.studyTagLabel,
        show: studyTags.show
      };
      studyTagsArray.push(tagsValue);
    });

    if (data.readTags.length == 0) {
      studyTagsArray.push({ id: 0, key: 0, label: '', show: false });
    }

  } catch (e) {
    console.error(e);
  }

  return {
    props: { 
      studies: studiesArray, 
      time: studyTime,
      tags: studyTagsArray,
      weekChart: weekChart,
      labels: monthLabel,
      monthChart: monthChart
    }
  }

}

export default Main;