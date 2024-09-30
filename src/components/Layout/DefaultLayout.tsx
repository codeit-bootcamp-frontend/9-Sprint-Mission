//Jotai 라이브러리에서 상태 관리를 위해 제공하는 컴포넌트입니다. 이를 사용하면 하위 컴포넌트에서 Jotai의 상태를 사용할 수 있다.
/**
 * .css file에서 font-face attribute로 cdn 통해 폰트를 다운로드 받지 않고 굳이 이렇게 구현해야 하는 이유가 무엇일까?

Next.js 튜토리얼 비디오에 따르면 이에 대해 다음과 같이 답변해줍니다.

cdn으로부터 다운로드 받게 되는 경우에는 클라이언트에서 custom 폰트를 다운로드 받기 전까지는 운영체제에서 사용 가능한 fallback font(Arial 등)를 사용하게 게 됩니다. custom 폰트 로드 전/로드 후에 폰트 사이즈 크기 차이로 인해 cumulative layout shift가 발생하여 사용자 경험을 크게 떨어뜨리게 됩니다.

Next.js의 next/font를 사용하는 경우에는 font를 빌드 타임 때 한번만 다운로드 받고, fallback font가 사용되는 동안 css size-adjust 프로퍼티를 적용시켜서 글자 크기를 동일하게하여 layout shift가 발생하는 것을 막아줍니다.
 */
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
