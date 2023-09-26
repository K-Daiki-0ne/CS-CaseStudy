/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import { StudyChart } from '../components';

type MockDataType = {
  label: string;
  data: number[];
  backgroundColor: string
}

const mockData: MockDataType[] = [
  { label: 'test', data: [0, 0, 0, 0, 0, 0, 0], backgroundColor: '' }
];

jest.mock('react-chartjs-2', () => ({
  Bar: () => null,
}))

describe('StudyChart component', () => {
  it('StudyChart componentのレンダリングテスト', () => {
    render(<StudyChart props={mockData} />)
  });
})