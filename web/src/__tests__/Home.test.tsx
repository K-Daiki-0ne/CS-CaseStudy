/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import Home from '../pages';
import { ApolloProvider } from '@apollo/client';
import { initializeApollo } from '../libs/apolloClient';
import { RecoilRoot } from 'recoil';
import mockRouter from 'next-router-mock';

const apolloClient = initializeApollo();

jest.mock('next/router', () => jest.requireActual('next-router-mock'))

describe('Home page', () => {
  it('ホーム画面のレンダリングテスト', () => {
    mockRouter.push('/change-password/1');
    render(
      <ApolloProvider client={apolloClient}>
        <RecoilRoot>
          <Home  />
        </RecoilRoot>
      </ApolloProvider>
    )
  })
})