/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { UserProfile } from '../components';
import { ApolloProvider } from '@apollo/client';
import { initializeApollo } from '../libs/apolloClient';
import { RecoilRoot } from 'recoil';

const mockUserProfileProps = {
  userId: 'test',
  tags: [
    { key: 1, label: 'test', show: true }
  ]
}

const apolloClient = initializeApollo()

describe('UserProfile component', () => {
  it('UserProfile componentのレンダリングテスト', () => {
    render(
      <ApolloProvider client={apolloClient}>
        <RecoilRoot>
          <UserProfile userId={mockUserProfileProps.userId} tags={mockUserProfileProps.tags} />
        </RecoilRoot>
      </ApolloProvider>
    )
  });

  it('UserProfile componentの表示内容テスト', () => {
    render(
      <ApolloProvider client={apolloClient}>
        <RecoilRoot>
          <UserProfile userId={mockUserProfileProps.userId} tags={mockUserProfileProps.tags} />
        </RecoilRoot>
      </ApolloProvider>
    )

    screen.getByLabelText('ユーザー名')
    screen.getByLabelText('職業')
    screen.getByLabelText('学習タグ')
    screen.getByLabelText('学習目標')
  });

})
