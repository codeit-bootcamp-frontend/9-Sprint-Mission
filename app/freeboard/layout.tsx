import NavBar from "@/components/navBar/NavBar";

const FreeBoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <NavBar>
      {children}
    </NavBar>
  );
}

export default FreeBoardLayout;