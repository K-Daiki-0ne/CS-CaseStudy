import { useState, MouseEvent, FormEvent } from 'react';
import { NextPage } from 'next';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import {
  Box, 
  Typography, 
  Alert, 
  InputLabel, 
  OutlinedInput, 
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
  TextField,
  Paper,
  ListItem,
  Chip,
  Button
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useMutation } from '@apollo/client';
import { useRecoilState } from 'recoil';
import { IsUserQuery, RegisterMutation, CreateStudyTagMutation } from '../../generated/graphql';
import { IS_USER, REGISTER_USER, CREATE_STUDY_TAG } from '../../graphql/graphql';
import { initializeApollo } from '../../libs/apolloClient';
import {
  Layout,
  Header
} from '../../components'
import { professionList } from '../../utils/professinList';
import { userState } from '../../store/atoms';

type StudyTag = {
  key: number;
  label: string;
};

type Props = {
  isUser: boolean
}

const RegisterUser: NextPage<Props> = ({ isUser }) => {
  const [registerUser, setRegisterUser] = useState({ username: '', password: '', confirmPassword: '', professionId: '', goal: '' });
  const [passwordError, setPasswordError] = useState({ error: false, label: '確認用パスワード' })
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [tagName, setTagName] = useState('');
  const [tagError, setTagError] = useState({ error: false, label: '学習タグ' });
  const [studyTag, setStudyTag] = useState<StudyTag[]>([]);

  const [,setUser] = useRecoilState(userState);
  const userId = useSearchParams().get('id');
  const router = useRouter();

  const [register] = useMutation<RegisterMutation>(REGISTER_USER);
  const [createStudyTag] = useMutation<CreateStudyTagMutation>(CREATE_STUDY_TAG)

  const handleClickTagDelete = (deleteTag: StudyTag) => () => {
    setStudyTag((tags) => tags.filter((tag) => tag.key !== deleteTag.key))
  }

  const handleClickAddTag = () => {
    setTagError({ error: false, label: '学習タグ' });
    if (tagName == '') {
      setTagError({ error: true, label: 'タグ名が入力されていません' })
      return;
    }

    let additionalKey: number = 0;
    if (studyTag.length != 0) {
      const currentFinishTag: StudyTag = studyTag[studyTag.length - 1];
      additionalKey = currentFinishTag.key;  
    }
    setStudyTag([ ...studyTag, { key: additionalKey + 1, label: tagName } ])
  }

  const handleSubmitRegisterUser = async (e:FormEvent<HTMLFormElement> ) => {
    e.preventDefault();

    setPasswordError({ error: false, label: '確認用パスワード' })

    if (registerUser.password != registerUser.confirmPassword) {
      setPasswordError({ error: true, label: 'パスワードが一致しません' })
      return;
    };

    const regex = /^[a-zA-Z0-9.?\/-]/;
    if (regex.test(registerUser.confirmPassword)) {
      setPasswordError({ error: true, label: 'パスワードが規約に一致しておりません。' })
      return;
    }

    const { data } = await register({
      variables: {
        userId: userId,
        userName: registerUser.username,
        password: registerUser.password,
        professionId: registerUser.professionId,
        goal: registerUser.goal
      }
    });

    if (data?.register.errors) {
      return;
    };

    setUser({
      userId: userId as string,
      userName: registerUser.username,
      professionId: registerUser.professionId,
      goal: registerUser.goal
    })

    await studyTag.map((tags: StudyTag) => {
      createStudyTag({
        variables: {
          userId: userId,
          key: String(tags.key),
          label: tags.label
        }
      })
    });

    router.push(`/main/${data?.register.user?.userId}`);
  }

  return (
    <Layout>
      <Header title='CaseStudy' page='register-user' />
      <Box component='form' onSubmit={handleSubmitRegisterUser}>
        <Box
          sx={{
            marginTop: 10,
            width: '100%',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', mt: 1, mb: 1, textAlign: 'center' }}>
            ユーザー情報登録
          </Typography>
          {
            isUser ? (
              <Alert severity="error" sx={{ width: '100%', aliginItems: 'center' }}>既にユーザー情報が登録されています</Alert>
            ) : (
              <Typography>パスワードは半角英字,数字,記号を組み合わせた8文字以上でご入力してください。</Typography>
            )
          }
          <InputLabel htmlFor='username' sx={{ mt: 2, mr: '50%' }}>ユーザーネーム</InputLabel>
          <OutlinedInput
            id="username"
            required
            value={registerUser.username}
            onChange={(event) => setRegisterUser({ ...registerUser, username: event.target.value })}
            sx={{ width: '100%' }}
          />
          <InputLabel htmlFor='password' sx={{ mt: 2, mr: '50%' }}>新規パスワード</InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={registerUser.password}
            onChange={(event) => setRegisterUser({ ...registerUser, password: event.target.value })}
            required
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((show) => !show)}
                  onMouseDown={(event: MouseEvent<HTMLButtonElement>) => event.preventDefault()}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            sx={{ width: '100%' }}
          />
          <InputLabel htmlFor="confirm-password" sx={{ mt: 2 }} error={passwordError.error}>{passwordError.label}</InputLabel>
          <OutlinedInput
            id="confirm-password"
            type={showConfirmPassword ? 'text' : 'password'}
            value={registerUser.confirmPassword}
            error={passwordError.error}
            fullWidth
            required
            onChange={(event) => setRegisterUser({ ...registerUser, confirmPassword: event.target.value })}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowConfirmPassword((show) => !show)}
                  onMouseDown={(event: MouseEvent<HTMLButtonElement>) => event.preventDefault()}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <InputLabel id="profession-select" sx={{ mt: 2 }} >職業</InputLabel>
          <Select
            labelId='profession-select'
            id='profession-select'
            value={registerUser.professionId}
            fullWidth
            onChange={(event: SelectChangeEvent) => setRegisterUser({ ...registerUser, professionId: event.target.value })}
          >
            {
              professionList.map((data: { id: string, label: string }) => (
                <MenuItem value={data.id} key={data.id}>{ data.label }</MenuItem>
              ))
            }
          </Select>
          <InputLabel id="goal" sx={{ mt: 2 }} >学習目標</InputLabel>
          <TextField
            id='goal'
            multiline
            rows={4}
            value={registerUser.goal}
            onChange={(event) => setRegisterUser({ ...registerUser, goal: event.target.value })}
            fullWidth
            variant='outlined'
          />
          <InputLabel id ='study-tag' htmlFor='study-tag-input' sx={{ mt: 1 }} error={ tagError.error }>{ tagError.label }</InputLabel>
          <Paper
            sx={{
              display: 'flex',
              flexWrap: 'nowrap',
              listStyle: 'none',
              p: 0,
              m: 0,
              pl: 0,
              pr: 1
            }}
            component="ul"
          >
            { studyTag.map((data: StudyTag) => {
              return (
                <ListItem key={data.key}>
                  <Chip
                    label={data.label}
                    onDelete={handleClickTagDelete(data)}
                  />
                </ListItem>
              );
            })}
          </Paper>
          <OutlinedInput 
            id='study-tag-input'
            error={tagError.error}
            type='text'
            value={tagName}
            onChange={(value) => setTagName(value.target.value)}
            sx={{ mt: 1 }}
            fullWidth
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickAddTag}
                  onMouseDown={(event: MouseEvent<HTMLButtonElement>) => event.preventDefault()}
                  edge="end"
                >
                  <AddCircleIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </Box>
        <Button sx={{ mt: 2, width: '25%', ml: '35%', mb: 5 }} type='submit' variant="contained" size='large'>
          登録
        </Button>
      </Box>
    </Layout>
  )
};

export async function getServerSideProps(params: any) {
  // Dynamic routingを使用しているため、SSGではなく、SSRで不正検査を実施する。
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query<IsUserQuery>({
    query: IS_USER,
    variables: {
      userId: params.query.id
    }
  })

  let isUser: boolean;
  if (!data.isUser) {
    isUser = false;
  } else {
    isUser = true;
  };

  return {
    props: { isUser }
  }
}

export default RegisterUser;