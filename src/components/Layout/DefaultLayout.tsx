import localFont from 'next/font/local';
import { Provider } from 'jotai';

const pretendard = localFont({
  src: '../../fonts/pretendard/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

function DefaultLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <div className={pretendard.className + '  text-gray-900'}>{children}</div>
  );
}

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider>
      <DefaultLayoutContent>{children}</DefaultLayoutContent>
    </Provider>
  );
}
