import { FC } from 'react';
import { Box } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type WeekChartType = {
  label: string;
  data: number[];
  backgroundColor: string;
}

type Props ={
  props: WeekChartType[]
}

export const StudyChart: FC<Props> = ({ props }) => {

  const labels = ["月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日", "日曜日"];

  const data = {
    labels,
    datasets: props
  }
  const options = {
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: '週間の学習時間',
      },
    },
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: true
      }
    },
  };

  return (
    <Box sx={{ flexGrow: 1, border: '1px solid grey'}}>
      <Bar
        data={data}
        options={options} 
        height={250}
      />
    </Box>
  )
}
