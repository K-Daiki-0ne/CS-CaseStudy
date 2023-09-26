/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import RegisterUser from '../pages/register-user/[id]';
import { ApolloProvider } from '@apollo/client';
import { initializeApollo } from '../libs/apolloClient';
import { RecoilRoot } from 'recoil';
import mockRouter, { useRouter } from 'next-router-mock';

const apolloClient = initializeApollo();

jest.mock('next/router', () => jest.requireActual('next-router-mock'))
jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(() => ({
    get: jest.fn(),
  })),
}));

describe('RegisterUser page', () => {
  it('ユーザー登録画面のレンダリングテスト', () => {
    mockRouter.push('/register-user/1');
    render(
      <ApolloProvider client={apolloClient}>
        <RecoilRoot>
          <RegisterUser isUser={true} />
        </RecoilRoot>
      </ApolloProvider>
    )
  })
})