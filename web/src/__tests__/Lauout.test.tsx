/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import { Layout } from '../components';

describe('Layout compoennt', () => {
  it('Layout componentのレンダリングテスト', () => {
    render(<Layout><div></div></Layout>)
  })
})