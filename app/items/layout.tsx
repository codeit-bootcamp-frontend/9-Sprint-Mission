import NavBar from "@/components/navBar/NavBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "중고마켓",
  openGraph: {
    title: "중고마켓"
  }
}

const ItemsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <NavBar>
      <div className="p-6 my-24 flex flex-col space-y-10 justify-center lg:w-[1200px] lg:m-auto lg:my-24 lg:p-0">
        {children}
      </div>
    </NavBar>
  );
}

export default ItemsLayout;