/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import Login from '../pages/login';
import { ApolloProvider } from '@apollo/client';
import { initializeApollo } from '../libs/apolloClient';
import { RecoilRoot } from 'recoil';
import mockRouter from 'next-router-mock';

const apolloClient = initializeApollo();

jest.mock('next/router', () => jest.requireActual('next-router-mock'))

describe('Login page', () => {
  it('ログイン画面のレンダリングテスト', () => {
    mockRouter.push('/login');
    render(
      <ApolloProvider client={apolloClient}>
        <RecoilRoot>
          <Login  />
        </RecoilRoot>
      </ApolloProvider>
    )
  })
})