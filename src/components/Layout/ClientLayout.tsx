// components/Layout/ClientLayout.tsx
import { Provider, useAtom } from "jotai";
import { userAtom } from "@/store/authAtoms";
import { User } from "@/types/auth";
import Header from "./Header";

function ClientLayoutContent({ children }: { children: React.ReactNode }) {
  const [user] = useAtom(userAtom);

  return (
    <div className={"Pretendard bg-gray-50 text-gray-900"}>
      <Header user={user as User | null} />
      {children}
    </div>
  );
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider>
      <ClientLayoutContent>{children}</ClientLayoutContent>
    </Provider>
  );
}
