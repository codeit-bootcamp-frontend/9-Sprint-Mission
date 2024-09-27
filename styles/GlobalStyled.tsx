import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    :root{
        --white: #ffffff;
        --gray900: #111827;
        --gray800: #1f2937;
        --gray700: #374151;
        --gray600: #4b5563;
        --gray500: #6b7280;
        --gray400: #9ca3af;
        --gray200: #e5e7eb;
        --gray100: #f3f4f6;
        --gray50: #f9fafb;
        --blue: #3692ff;
        --blue-hover: #1967d6;
        --blue-focus: #1251aa;
        --red-error: #f74747;
        --bg-skyblue: #cfe5ff;
        --skybleu: #e6f2ff;
        --bg-footer: #111827;
    }

    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    }

    body {
        font-family: "Pretendard", sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
            monospace;
    }

    a {
        text-decoration-line: none;
    }
`;

export default GlobalStyle;
