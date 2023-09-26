/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import Register from '../pages/register';
import { ApolloProvider } from '@apollo/client';
import { initializeApollo } from '../libs/apolloClient';
import { RecoilRoot } from 'recoil';
import mockRouter from 'next-router-mock';

const apolloClient = initializeApollo();

jest.mock('next/router', () => jest.requireActual('next-router-mock'))

describe('Register page', () => {
  it('ユーザー登録画面のレンダリングテスト', () => {
    mockRouter.push('/register');
    render(
      <ApolloProvider client={apolloClient}>
        <RecoilRoot>
          <Register  />
        </RecoilRoot>
      </ApolloProvider>
    )
  })
})