/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import ForgotPassword from '../pages/forgot-passwrod';
import { ApolloProvider } from '@apollo/client';
import { initializeApollo } from '../libs/apolloClient';
import { RecoilRoot } from 'recoil';
import mockRouter from 'next-router-mock';

const apolloClient = initializeApollo();

jest.mock('next/router', () => jest.requireActual('next-router-mock'))

describe('ChangePassword page', () => {
  it('パスワード再発行画面のレンダリングテスト', () => {
    mockRouter.push('/forgot-password');
    render(
      <ApolloProvider client={apolloClient}>
        <RecoilRoot>
          <ForgotPassword  />
        </RecoilRoot>
      </ApolloProvider>
    )
  })
})