/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { StudyGrid } from '../components';
import { RecoilRoot } from 'recoil';
import { initializeApollo } from '../libs/apolloClient';
import { ApolloProvider } from '@apollo/client';
import mockRouter from 'next-router-mock';


const mockStudyGridProps = [
  {
    id: 1,
    userId: 'test',
    Tagid: 1,
    Study: 'タグ名',
    Date: '2023年4月1日',
    Time: '1時間20分',
    Content: 'テスト'
  }
]

const apolloClient = initializeApollo();
jest.mock('next/router', () => jest.requireActual('next-router-mock'))


describe('StudyGrid Component', () => {
  it('StudyGrid compoenntのレンダリングテスト', () => {
    mockRouter.push("/main");

    render(
      <ApolloProvider client={apolloClient}>
        <RecoilRoot>
          <StudyGrid props={mockStudyGridProps} />
        </RecoilRoot>
      </ApolloProvider>
    )
  })

  it('StudyGrid compoenntの表示内容テスト', () => {
    mockRouter.push("/main");

    render(
      <ApolloProvider client={apolloClient}>
        <RecoilRoot>
          <StudyGrid props={mockStudyGridProps} />
        </RecoilRoot>
      </ApolloProvider>
    )

    // ヘッダーのボタンが表示されていること
    screen.getByText('削除')
    screen.getByText('編集')
  })
})