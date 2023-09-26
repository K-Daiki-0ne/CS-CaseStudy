/**
 * @jest-environment jsdom
 */
import { render, screen, waitFor } from '@testing-library/react';
import { StudyDeleteButton } from '../components';
import { ApolloProvider } from '@apollo/client';
import { initializeApollo } from '../libs/apolloClient';
import userEvent from '@testing-library/user-event';

const apolloClient = initializeApollo();

describe('StudyDeleteButton component', () => {
  it('StudyDeleteButton componentのレンダリングテスト', () => {
    render(
      <ApolloProvider client={apolloClient}>
        <StudyDeleteButton studyId={1} />
      </ApolloProvider>
    )
  })

  it('StudyDeleteButton componentのボタンクリック', async () => {
    render(
      <ApolloProvider client={apolloClient}>
        <StudyDeleteButton studyId={1} />
      </ApolloProvider>
    )

    await waitFor(async () => {
      userEvent.click(screen.getByRole('button'));
    })
  })
})