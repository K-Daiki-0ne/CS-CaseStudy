
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
}

export const formatTime = (time: number): string => {
  let formatTime: string = '';

  if (String(time).length > 3) {
    formatTime = String(time).substring(0, 2) + '時間' + String(time).substring(2,4) + '分'
  } else {
    formatTime = String(time).substring(0, 1) + '時間' + String(time).substring(1,3) + '分'
  }

  return formatTime;
}