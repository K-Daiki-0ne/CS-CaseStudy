import { FC } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Box } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

type MonthChartProps = {
  data: number[];
  backgroundColor: string[];
  borderColor: string[];
  borderWidth: number;
}

type Props = {
  labels: string[];
  chart: MonthChartProps[]
}

export const StudyTotaltime: FC<Props> = ({ labels, chart }) => {
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '今月の学習時間',
      },
    },
  }

  const data = {
    labels: labels,
    datasets: chart
  }
  
  return (
    <Box sx={{ mb: 2 }}>
      <Doughnut data={data} options={options} width={225} height={225} />
    </Box>
  )
}
