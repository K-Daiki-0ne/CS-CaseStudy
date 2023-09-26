/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import ChangePassword from '../pages/change-password/[id]';
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

describe('ChangePassword page', () => {
  it('パスワード再発行画面のレンダリングテスト', () => {
    mockRouter.push('/change-password/1');
    render(
      <ApolloProvider client={apolloClient}>
        <RecoilRoot>
          <ChangePassword  />
        </RecoilRoot>
      </ApolloProvider>
    )
  })
})