import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

type WeekStartEndType = {
  startWeekDay: number;
  endWeekDay: number;
}

/**
 * @param {number} [date] 学習日
 * @returns {string} [formatDate] YYYY年MM月DD日に修正する
 */
export const formatDate = (date: number): string => {
  let formatDate: string = '';
  // 年を取得
  formatDate = String(date).substring(0, 4) + '年';
  // 月の先頭が0の場合はゼロサプレスを実施
  if (String(date).substring(4, 5) == '0') {
    formatDate = formatDate + String(date).substring(5, 6) + '月'
  } else {
    formatDate = formatDate + String(date).substring(4, 6) + '月'
  };

  formatDate = formatDate + String(date).substring(6, 8) + '日';

  return formatDate;
};

export const searchWeekStartEnd = (date: number): WeekStartEndType => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault("Asia/Tokyo");

  const day: string = dayjs(String(date)).format('d');

  let startWeekDay = date;
  let endWeekDay = date;

  // 月曜を開始日とし、日曜日を終了日として設定する
  switch(day) {
    case '0':   // Sunday
      startWeekDay = date - 6;
      endWeekDay = date;
      break;
    case '1':    // Monday
      startWeekDay = date;
      endWeekDay = date + 6;
      break;
    case '2':    // Tuesday
      startWeekDay = date - 1;
      endWeekDay = date + 5;
      break;
    case '3':   // Wednesday
      startWeekDay = date - 2;
      endWeekDay = date + 4;
      break;
    case '4':   // Thursday
      startWeekDay = date - 3;
      endWeekDay = date + 3;
      break;
    case '5':   // Friday
      startWeekDay = date - 4;
      endWeekDay = date + 2;
      break;
    case '6':   // Saturday
      startWeekDay = date - 5;
      endWeekDay = date + 1;
      break;          
  }

  return {
    startWeekDay,
    endWeekDay
  }
}