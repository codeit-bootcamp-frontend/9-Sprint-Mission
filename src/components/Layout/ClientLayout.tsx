// components/Layout/ClientLayout.tsx
import { Provider } from "jotai";
import Header from "./Header";

function ClientLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <div className={"Pretendard bg-gray-50 text-gray-900"}>
      <Header />
      {children}
    </div>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      <ClientLayoutContent>{children}</ClientLayoutContent>
    </Provider>
  );
}
