/**
 * @jest-environment jsdom
 */
import { render, screen, waitFor } from '@testing-library/react';
import { StudyEditButton } from '../components';
import { ApolloProvider } from '@apollo/client';
import { initializeApollo } from '../libs/apolloClient';
import userEvent from '@testing-library/user-event';
import { RecoilRoot } from 'recoil';
import mockRouter from 'next-router-mock';

const apolloClient = initializeApollo();
const mockStudyEditProps = {
  studyId: 1,
  userId: 'test',
  studyDate: '2023年4月1日', 
  studyTime: '1時間40分', 
  studyTagId: 1,
  content: 'test'
}

jest.mock('next/router', () => jest.requireActual('next-router-mock'))

describe('StudyDeleteButton component', () => {
  it('StudyEditButton componentのレンダリングテスト', () => {
    
    mockRouter.push("/main");
    render(
      <ApolloProvider client={apolloClient}>
        <RecoilRoot>
          <StudyEditButton props={{
            studyId: mockStudyEditProps.studyId,
            userId: mockStudyEditProps.userId,
            studyDate: mockStudyEditProps.studyDate,
            studyTime: mockStudyEditProps.studyTime,
            studyTagId: mockStudyEditProps.studyTagId,
            content: mockStudyEditProps.content
          }} />
        </RecoilRoot>
      </ApolloProvider>
    )
  })

  it('StudyEditButton componentのボタンクリック', async () => {
    mockRouter.push("/main");

    render(
      <ApolloProvider client={apolloClient}>
        <RecoilRoot>
          <StudyEditButton props={{
            studyId: mockStudyEditProps.studyId,
            userId: mockStudyEditProps.userId,
            studyDate: mockStudyEditProps.studyDate,
            studyTime: mockStudyEditProps.studyTime,
            studyTagId: mockStudyEditProps.studyTagId,
            content: mockStudyEditProps.content
          }} />
        </RecoilRoot>
      </ApolloProvider>
    )

    await waitFor(async () => {
      userEvent.click(screen.getByRole('button'));
    })
  })
})