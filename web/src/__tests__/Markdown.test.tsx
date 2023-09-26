/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { Markdown } from '../components';
import { homePage } from '../markdown/homePage';

describe('Markdown component', () => {
  it('Markdown componentのレンダリングテスト', () => {
    render(<Markdown>{ homePage }</Markdown>);
  })

  it('Markdown componentのテキスト表示', () => {
    render(<Markdown>{ homePage }</Markdown>);
    screen.getByText('CaseStudyについて');
  });
})