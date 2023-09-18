
/**
 * @param {number} [number] 学習日
 * @returns {string} [formatDate] YYYY年MM月DD日に修正する
 */
export const formatDate = (date: number): string => {
  let formatDate: string = '';
  
  // 年を取得
  formatDate = String(date).substring(0, 4) + '年';

  // 月の先頭が0の場合はゼロサプレスを実施
  if (String(date).substring(4, 1) == '0') {
    formatDate = formatDate + String(date).substring(5, 1) + '月'
  } else {
    formatDate = formatDate + String(date).substring(4, 2) + '月'
  };

  formatDate = formatDate + String(date).substring(6, 2) + '日';

  return formatDate;
};

export const formatTime = (time: number): string => {

  return ''
}