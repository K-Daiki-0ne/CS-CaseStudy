/** @type {import('next').NextConfig} */
const intercept = require('next-intercept-stdout');

module.exports = withInterceptStdout(
  {
    reactStrictMode: true, 
  },

  // atomのkeyによるエラーだが、エラーではないためログに表示しない
  (text) => (text.includes('Duplicate atom key') ? '' : text)
)

// safely ignore recoil warning messages in dev (triggered by HMR)
function interceptStdout(text) {
  if (text.includes("Duplicate atom key")) {
    return ""
  }
  return text
}

if (process.env.NODE_ENV === "development") {
  intercept(interceptStdout)
}