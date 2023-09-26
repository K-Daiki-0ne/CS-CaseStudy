
/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import Main from '../pages/main/[userId]';
import { ApolloProvider } from '@apollo/client';
import { initializeApollo } from '../libs/apolloClient';
import { RecoilRoot } from 'recoil';
import mockRouter from 'next-router-mock';

const apolloClient = initializeApollo();

jest.mock('next/router', () => jest.requireActual('next-router-mock'))
jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(() => ({
    get: jest.fn(),
  })),
}));

jest.mock('react-chartjs-2', () => ({
  Bar: () => null,
  Doughnut: () => null,
}))

// studies, time, tags, weekChart, labels, monthChart
const mockMainProps = {
  studies: [
    {
      id: 1,
      userId: 'test',
      Tagid: 1,
      Study: 'タグ名',
      Date: '2023年4月1日',
      Time: '1時間20分',
      Content: 'テスト'
    }
  ],
  time: {
    day: {
      time: 1,
      minute: 40
    },
    week: {
      time: 10,
      minute: 20
    },
    month: {
      time: 20,
      minute: 40
    }  
  },
  tags: [
    { id: 1, key: 1, label: 'test', show: true }
  ],
  weekChart: [
    { label: 'test', data: [0, 0, 0, 0, 0, 0, 0], backgroundColor: '' }
  ],
  labels: ['test'],
  monthChart: [
    {
      data: [0],
      backgroundColor: ['red'],
      borderColor: ['red'],
      borderWidth: 1
    }
  ]
}

describe('Main page', () => {
  it('メイン画面のレンダリングテスト', () => {
    mockRouter.push('/main/1');
    render(
      <ApolloProvider client={apolloClient}>
        <RecoilRoot>
          <Main
            studies={mockMainProps.studies}
            time={mockMainProps.time}
            tags={mockMainProps.tags}
            weekChart={mockMainProps.weekChart}
            labels={mockMainProps.labels}
            monthChart={mockMainProps.monthChart}
          />
        </RecoilRoot>
      </ApolloProvider>
    )
  })
})