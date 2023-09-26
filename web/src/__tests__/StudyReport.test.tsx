/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { StudyReport } from '../components';

const mockStudyReportType = {
  day: {
    time: 1,
    minute: 40
  },
  week: {
    time: 10,
    minute: 20
  },
  month: {
    time: 20,
    minute: 40
  }
}

describe('StudyReport component', () => {
  it('StudyReport compoenntのレンダリングテスト', () => {
    render(<StudyReport props={mockStudyReportType} />)
  });

  it('StudyReport compoenntのレンダリングテスト', () => {
    render(<StudyReport props={mockStudyReportType} />)
    screen.getByText('今日の学習時間');
    screen.getByText('今週の学習時間');
    screen.getByText('今月の学習時間');

    screen.getByText('1時間40分');
    screen.getByText('10時間20分');
    screen.getByText('20時間40分');

  });

})