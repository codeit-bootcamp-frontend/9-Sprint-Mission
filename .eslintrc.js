module.exports = {
  env: {
    browser: true, // 브라우저 환경에서 실행할지 여부
    es6: true, // ES6 문법을 사용할지 여부
    node: true,
  },
  extends: [
    "eslint:recommended", // 기본적인 규칙 적용
    "plugin:react/recommended", // React 관련 규칙 적용
  ],
  parserOptions: {
    ecmaVersion: 2018, // 사용할 ECMAScript 버전
    sourceType: "module", // 모듈 형태로 작성한 코드를 사용할지 여부
    ecmaFeatures: {
      jsx: true, // JSX 사용 여부
    },
  },
  plugins: [
    "react", // React 관련 플러그인
  ],
  rules: {
    "no-console": "warn", // 콘솔 사용 금지
    "no-unused-vars": "warn", // 사용하지 않는 변수는 경고
    "react/prop-types": "warn", // 프로퍼티 타입 정의하지 않은 경우 경고
    "react/react-in-jsx-scope": "off",
  },
};
