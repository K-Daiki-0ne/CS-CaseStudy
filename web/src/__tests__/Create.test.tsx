/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import Create from '../pages/create/[userId]';
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

describe('Create page', () => {
  it('学習投稿画面のレンダリングテスト', () => {
    mockRouter.push('/register-user/1');
    render(
      <ApolloProvider client={apolloClient}>
        <RecoilRoot>
          <Create  />
        </RecoilRoot>
      </ApolloProvider>
    )
  })
})