/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { Header } from '../components';
import mockRouter from 'next-router-mock';

jest.mock('next/router', () => jest.requireActual('next-router-mock'))

describe('Header component', () => {
  it('Header componentのレンダリング', () => {
    mockRouter.push("/");
    render(<Header title='CaseStudy' page='test'  />)    
  });

  it('Header compoenntのタイトルテキスト表示', () => {
    mockRouter.push("/");
    render(<Header title='CaseStudy' page='test'  />)    
    screen.getByText('CaseStudy');
  });

  it('Hader componentのログインボタンを表示', () => {
    mockRouter.push("/");
    render(<Header title='CaseStudy' page='home' />)
    screen.getByText('Sign up');
  })
})