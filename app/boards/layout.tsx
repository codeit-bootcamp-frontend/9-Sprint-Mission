import NavBar from "@/components/navBar/NavBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "자유게시판",
  openGraph: {
    title: "자유게시판"
  }
}

const BoardsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <NavBar>
      <div className="p-6 my-24 flex flex-col space-y-6 justify-center lg:w-[1200px] lg:m-auto lg:my-24 lg:p-0">
        {children}
      </div>
    </NavBar>
  );
}

export default BoardsLayout;