import { NextPage } from 'next';
import { Layuot } from '../components/Layout';
import { Typography, Box, Link } from '@mui/material';
import WarningAmberSharpIcon from '@mui/icons-material/WarningAmberSharp';

type Props = {
  statusCode: number;
};

const Error: NextPage<Props> = ({ statusCode }) => {
  return (
    <Layuot>
      <Box
        sx={{
          marginTop: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <WarningAmberSharpIcon
          color='warning'
          sx={{
            width: '20%',
            height: '20%'
          }}
        />
        <Typography
          variant="h4" 
          gutterBottom
          align='center'
          sx={{
            mt: 5
          }}
        >
          このページにはアクセスできません。
        </Typography>
        <Typography
          variant="h6" 
          gutterBottom
          align='center'
        >
          リンクに問題があるか、ページが削除された可能性があります。
        </Typography>

        <Link href='/' variant="button" underline='none'>
          ホームへ戻る
        </Link>
      </Box>
    </Layuot>
  )
};

export default Error;