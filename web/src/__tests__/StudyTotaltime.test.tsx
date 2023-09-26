/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import { StudyTotaltime } from '../components';

const mockStudyTotaltimeProps = {
  labels: ['test'],
  chart: [
    {
      data: [0],
      backgroundColor: ['red'],
      borderColor: ['red'],
      borderWidth: 1
    }
  ]
}

jest.mock('react-chartjs-2', () => ({
  Doughnut: () => null,
}))

describe('StudyChart component', () => {
  it('StudyChart componentのレンダリングテスト', () => {
    render(
      <StudyTotaltime labels={mockStudyTotaltimeProps.labels} chart={mockStudyTotaltimeProps.chart} />
    )
  });
})