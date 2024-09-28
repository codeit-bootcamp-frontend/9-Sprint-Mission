import { ReactNode } from "react";
import Header from "./Header";

interface props {
  children?: ReactNode;
}

export default function Layout({ children }: props) {
  return (
    <>
      <Header />
      <div className='flex flex-col items-center'>
        <div>{children}</div>
      </div>
    </>
  );
}
