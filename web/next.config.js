/** @type {import('next').NextConfig} */
const withInterceptStdout = require('next-intercept-stdout');

module.exports = withInterceptStdout(
  {
    reactStrictMode: true, 
  },

  // atomのkeyによるエラーだが、エラーではないためログに表示しない
  (text) => (text.includes('Duplicate atom key') ? '' : text)
)